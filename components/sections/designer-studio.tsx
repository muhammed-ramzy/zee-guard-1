"use client";

import {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  useMemo,
} from "react";
import { RotateCcw, Download, Trash2, Type, ImagePlus } from "lucide-react";
import { FONT_FAMILIES } from "@/app/fonts";
import { cn } from "@/lib/utils";
import {
  CORE_TIERS,
  LOWER_JAW_OPTIONS,
  UPPER_JAW_OPTIONS,
  ADD_ONS,
} from "@/constants/pricing";
import {
  BASE_COLORS,
  GUARD_CENTER_X,
  GUARD_CENTER_Y,
  GUARD_PATH,
  MODELS,
  THICKNESSES,
} from "./designer/constants";
import type { DesignElement } from "./designer/types";
import { genId, getCleanFontName, readImageFile } from "./designer/utils";
import { CollapsibleSection } from "./designer/ui/collapsible-section";
import { DraggableElementItem } from "./designer/ui/draggable-element-item";

export function DesignerStudio() {
  // ---------- Global state ----------
  const [athleteName, setAthleteName] = useState("");
  const [model, setModel] = useState<string>("DesignFlex Shield");
  const [thickness, setThickness] = useState<string>("4mm");
  const [lowerModel, setLowerModel] = useState<string>(
    LOWER_JAW_OPTIONS[0].name,
  );
  const [lowerThickness, setLowerThickness] = useState<string>("3mm");
  const [includeLowerGuard, setIncludeLowerGuard] = useState(false);
  const [baseColor, setBaseColor] = useState(BASE_COLORS[1]);
  const [leftBaseColor, setLeftBaseColor] = useState(BASE_COLORS[1]);
  const [rightBaseColor, setRightBaseColor] = useState(BASE_COLORS[1]);
  const [lowerColor, setLowerColor] = useState(BASE_COLORS[1]);
  const [showLowerColorSelector, setShowLowerColorSelector] = useState(false);
  const [isBracesSelection, setIsBracesSelection] = useState(false);
  const [upperAddOnSelections, setUpperAddOnSelections] = useState({
    lowerFit: false,
  });
  const [lowerAddOnSelections, setLowerAddOnSelections] = useState({
    lowerFit: false,
  });
  const [singleAddOnSelections, setSingleAddOnSelections] = useState({
    lowerFit: false,
  });

  const findModelOption = (selectedModel: string) => {
    const normalized = selectedModel.trim();
    console.log("normalized ", normalized);

    if (!normalized) return null;

    const allOptions = isBracesSelection
      ? [...UPPER_JAW_OPTIONS, ...LOWER_JAW_OPTIONS]
      : [
          ...CORE_TIERS.flatMap((tier) => tier.options),
          ...UPPER_JAW_OPTIONS,
          ...LOWER_JAW_OPTIONS,
        ];

    return (
      allOptions.find(
        (option) => option.name.toLowerCase() === normalized.toLowerCase(),
      ) ?? null
    );
  };

  const getPriceForModel = (selectedModel: string) => {
    const match = findModelOption(selectedModel);
    console.log(match);

    return match?.price ?? 0;
  };

  const getRecommendedForModel = (selectedModel: string) => {
    const normalized = selectedModel.trim();
    if (!normalized) return "";

    const allOptions = [
      ...CORE_TIERS.flatMap((tier) => tier.options),
      ...UPPER_JAW_OPTIONS,
      ...LOWER_JAW_OPTIONS,
    ];

    const match = allOptions.find(
      (option) => option.name.toLowerCase() === normalized.toLowerCase(),
    );

    return match?.recommended ?? "";
  };

  const getThicknessForModel = (selectedModel: string) => {
    const match = findModelOption(selectedModel);
    if (match?.spec) {
      const thicknessMatch = match.spec.match(/(\d+)mm/i);
      if (thicknessMatch) {
        return `${thicknessMatch[1]}mm`;
      }
    }

    const modelName = selectedModel.toLowerCase();
    if (modelName.includes("3mm")) return "3mm";
    if (modelName.includes("4mm")) return "4mm";
    if (modelName.includes("5mm")) return "5mm";
    if (modelName.includes("6mm")) return "6mm";

    return "4mm";
  };

  const getModelFromSession = (tierName: string, thicknessValue: string) => {
    const trimmedTier = tierName.trim();
    const allOptions = [
      ...CORE_TIERS.flatMap((tier) => tier.options),
      ...UPPER_JAW_OPTIONS,
      ...LOWER_JAW_OPTIONS,
    ];

    if (trimmedTier) {
      const exactMatch = allOptions.find(
        (option) => option.name.toLowerCase() === trimmedTier.toLowerCase(),
      );
      if (exactMatch) return exactMatch.name;

      const exactModelMatch = MODELS.find(
        (model) => model.toLowerCase() === trimmedTier.toLowerCase(),
      );
      if (exactModelMatch) return exactModelMatch;

      const normalized = trimmedTier.toLowerCase();
      if (normalized.includes("fusion")) return "Fusion Strong";
      if (normalized.includes("elite")) return "Elite - Ultimate";
      if (normalized.includes("corefit")) return "CoreFit Shield";
      if (normalized.includes("designflex")) return "DesignFlex Shield";
    }

    const combined = `${tierName} ${thicknessValue}`.toLowerCase();
    if (combined.includes("fusion")) return "Fusion Strong";
    if (combined.includes("elite")) return "Elite - Ultimate";
    if (combined.includes("corefit")) return "CoreFit Shield";

    return "DesignFlex Shield";
  };

  const isBracesUpperModel = (value: string) =>
    ["Elite - Essential", "Elite - Advanced", "Elite - Ultimate"].includes(
      value.trim(),
    );

  const readSelectedAddOns = (storageKeyOrValue: string) => {
    try {
      const rawValue =
        storageKeyOrValue.startsWith("[") || storageKeyOrValue.startsWith("{")
          ? storageKeyOrValue
          : sessionStorage.getItem(storageKeyOrValue);

      if (!rawValue) return { lowerFit: false };

      const parsed = JSON.parse(rawValue) as Array<{ key?: string } | string>;
      const keys = parsed
        .map((item) => (typeof item === "string" ? item : item.key))
        .filter(Boolean) as string[];

      return {
        lowerFit: keys.includes("lowerFit"),
      };
    } catch {
      return { lowerFit: false };
    }
  };

  const totalPrice = useMemo(() => {
    const upperTierName = model || "";
    const lowerTierName = includeLowerGuard ? lowerModel : "";

    const activeLowerModel =
      lowerTierName || lowerModel || LOWER_JAW_OPTIONS[0].name;
    const hasLowerBraceSelection =
      includeLowerGuard ||
      (typeof window !== "undefined" &&
        Boolean((sessionStorage.getItem("Lower tier") || "").trim()));

    const basePrice = getPriceForModel(upperTierName || model);
    console.log(basePrice);

    const lowerPrice =
      (isBracesSelection ||
        isBracesUpperModel(model) ||
        isBracesUpperModel(upperTierName)) &&
      hasLowerBraceSelection &&
      activeLowerModel
        ? getPriceForModel(activeLowerModel)
        : 0;
    console.log(lowerPrice);

    const upperAddOnEntries = Object.entries(upperAddOnSelections).filter(
      ([key]) => !(hasLowerBraceSelection && key === "lowerFit"),
    );
    const lowerAddOnEntries = Object.entries(lowerAddOnSelections).filter(
      ([key]) => !(hasLowerBraceSelection && key === "lowerFit"),
    );

    const addOnTotal =
      (isBracesSelection
        ? upperAddOnEntries
        : Object.entries(singleAddOnSelections)
      ).reduce((total, [key, checked]) => {
        if (!checked) return total;
        const addOn = ADD_ONS[key as keyof typeof ADD_ONS];
        return total + (addOn?.price ?? 0);
      }, 0) +
      (isBracesSelection
        ? lowerAddOnEntries.reduce((total, [key, checked]) => {
            if (!checked) return total;
            const addOn = ADD_ONS[key as keyof typeof ADD_ONS];
            return total + (addOn?.price ?? 0);
          }, 0)
        : 0);

    return basePrice + lowerPrice + addOnTotal;
  }, [
    includeLowerGuard,
    isBracesSelection,
    lowerAddOnSelections,
    lowerModel,
    model,
    singleAddOnSelections,
    upperAddOnSelections,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isBraces = sessionStorage.getItem("isBraces") === "true";
    const selectedCategory = sessionStorage.getItem("selectedCategory") || "";
    const selectedCategoryAddOn =
      selectedCategory && sessionStorage.getItem(`${selectedCategory}AddOn`)
        ? (sessionStorage.getItem(`${selectedCategory}AddOn`) ?? "[]")
        : (sessionStorage.getItem("addOn") ?? "[]");
    const categoryTier =
      selectedCategory && sessionStorage.getItem(`${selectedCategory}Tier`)
        ? sessionStorage.getItem(`${selectedCategory}Tier`)
        : sessionStorage.getItem("tier") || "";
    const categoryThickness =
      selectedCategory && sessionStorage.getItem(`${selectedCategory}Thickness`)
        ? sessionStorage.getItem(`${selectedCategory}Thickness`)
        : sessionStorage.getItem("thickness") || "";

    const upperTier = sessionStorage.getItem("upper tier") ?? "";
    const upperThickness = sessionStorage.getItem("upperTierthickness") ?? "";
    const lowerTier = sessionStorage.getItem("Lower tier") ?? "";
    const lowerThickness = sessionStorage.getItem("lowerTierthickness") ?? "";

    setIsBracesSelection(isBraces);
    setIncludeLowerGuard(Boolean(lowerTier.trim()));

    const normalizedLowerTier = lowerTier.trim();
    const isColoredLowerSelection =
      isBraces &&
      normalizedLowerTier.toLowerCase().includes("corefit") &&
      normalizedLowerTier.toLowerCase().includes("colored");

    setShowLowerColorSelector(isColoredLowerSelection);
    if (isColoredLowerSelection) {
      const savedLowerColor = sessionStorage.getItem("lowerColor");
      if (savedLowerColor) {
        const matchedColor = BASE_COLORS.find(
          (color) => color.name.toLowerCase() === savedLowerColor.toLowerCase(),
        );
        if (matchedColor) {
          setLowerColor(matchedColor);
        }
      }
    }

    const resolvedUpperTierSource = [
      upperTier,
      categoryTier,
      sessionStorage.getItem("tier") || "",
    ].find((value) => Boolean(value && value.trim()));

    const actualUpperModel = resolvedUpperTierSource || "DesignFlex Shield";
    const selectedUpperModel = getModelFromSession(
      actualUpperModel,
      upperThickness || categoryThickness || lowerThickness || "4mm",
    );
    const selectedLowerModel = getModelFromSession(
      lowerTier || LOWER_JAW_OPTIONS[0].name,
      lowerThickness || "3mm",
    );

    setLowerModel(selectedLowerModel);
    setLowerThickness(getThicknessForModel(selectedLowerModel));

    let nextModel = selectedUpperModel;

    if (isBraces) {
      nextModel = upperTier || actualUpperModel;
    } else if (
      selectedCategory &&
      selectedCategory.toLowerCase() === "fusion"
    ) {
      nextModel = selectedUpperModel.includes("Fusion")
        ? selectedUpperModel
        : "Fusion Strong";
    } else if (
      selectedCategory &&
      selectedCategory.toLowerCase() === "corefit"
    ) {
      nextModel = selectedUpperModel.includes("CoreFit")
        ? selectedUpperModel
        : "CoreFit Shield";
    } else if (
      selectedCategory &&
      selectedCategory.toLowerCase() === "designflex"
    ) {
      nextModel = selectedUpperModel.includes("DesignFlex")
        ? selectedUpperModel
        : "DesignFlex Shield";
    }

    setModel(nextModel);
    setThickness(getThicknessForModel(nextModel));

    setUpperAddOnSelections(readSelectedAddOns("upperAddOn"));
    setLowerAddOnSelections(readSelectedAddOns("lowerAddOn"));
    setSingleAddOnSelections(readSelectedAddOns(selectedCategoryAddOn));

    if (isBraces) {
      if (upperTier) {
        console.info("Braces upper tier selected:", upperTier);
      }
      if (lowerTier) {
        console.info("Braces lower tier selected:", lowerTier);
      }
    }
  }, []);

  const handleUpperModelChange = (nextModel: string) => {
    setModel(nextModel);
    setThickness(getThicknessForModel(nextModel));
    sessionStorage.setItem("upper tier", nextModel);
    sessionStorage.setItem(
      "upperTierthickness",
      getThicknessForModel(nextModel),
    );

    if (isBracesUpperModel(nextModel)) {
      setIncludeLowerGuard(false);
      setLowerModel(LOWER_JAW_OPTIONS[0].name);
      setLowerThickness(getThicknessForModel(LOWER_JAW_OPTIONS[0].name));
      setUpperAddOnSelections((prev) => ({ ...prev, lowerFit: false }));
      sessionStorage.setItem("upperAddOn", JSON.stringify([]));
      sessionStorage.setItem("Lower tier", "");
      sessionStorage.setItem("lowerTierthickness", "");
      sessionStorage.setItem("lowerAddOn", "[]");
      setLowerAddOnSelections({ lowerFit: false });
    }
  };

  useEffect(() => {
    setIncludeLowerGuard(
      Boolean((sessionStorage.getItem("Lower tier") || "").trim()),
    );
  }, [model]);

  const handleLowerModelChange = (nextLowerModel: string) => {
    setLowerModel(nextLowerModel);
    const nextLowerThickness = getThicknessForModel(nextLowerModel);
    setLowerThickness(nextLowerThickness);
    setIncludeLowerGuard(true);
    sessionStorage.setItem("Lower tier", nextLowerModel);
    sessionStorage.setItem("lowerTierthickness", nextLowerThickness);
  };

  const handleIncludeLowerGuardToggle = (checked: boolean) => {
    setIncludeLowerGuard(checked);
    if (!checked) {
      setLowerModel(LOWER_JAW_OPTIONS[0].name);
      setLowerThickness(getThicknessForModel(LOWER_JAW_OPTIONS[0].name));
      setUpperAddOnSelections((prev) => ({ ...prev, lowerFit: false }));
      sessionStorage.setItem("upperAddOn", JSON.stringify([]));
      sessionStorage.setItem("Lower tier", "");
      sessionStorage.setItem("lowerTierthickness", "");
      sessionStorage.setItem("lowerAddOn", "[]");
      setLowerAddOnSelections({ lowerFit: false });
      return;
    }

    setUpperAddOnSelections((prev) => ({ ...prev, lowerFit: false }));
    setLowerAddOnSelections({ lowerFit: false });
    sessionStorage.setItem("upperAddOn", JSON.stringify([]));
    sessionStorage.setItem("lowerAddOn", "[]");

    const nextLowerModel = LOWER_JAW_OPTIONS[0].name;
    const nextLowerThickness = getThicknessForModel(nextLowerModel);
    setLowerModel(nextLowerModel);
    setLowerThickness(nextLowerThickness);
    sessionStorage.setItem("Lower tier", nextLowerModel);
    sessionStorage.setItem("lowerTierthickness", nextLowerThickness);
  };

  // ---------- Elements ----------
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ---------- Drag state ----------
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // ---------- Refs ----------
  const svgRef = useRef<SVGSVGElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<{
    id: string;
    mode:
      | "move"
      | "resize"
      | "rotate"
      | "resize-top"
      | "resize-bottom"
      | "resize-left"
      | "resize-right";
    handle?: "nw" | "ne" | "sw" | "se" | "n" | "s" | "e" | "w";
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    initialW: number;
    initialH: number;
    initialFontSize: number;
    initialRotation: number;
    initialMouseAngle: number;
  } | null>(null);

  // ---------- Pinch resize refs ----------
  const pinchRef = useRef<{
    active: boolean;
    initialDistance: number;
    selectedId: string | null;
    initialWidth: number;
    initialHeight: number;
    initialFontSize: number;
    elementType: "image" | "text" | null;
    aspectRatio: number;
    initialRotation: number;
    initialAngle: number;
    gestureMode: "resize" | "rotate" | null;
    centerX: number;
    centerY: number;
    totalAngleDelta: number;
  }>({
    active: false,
    initialDistance: 0,
    selectedId: null,
    initialWidth: 0,
    initialHeight: 0,
    initialFontSize: 0,
    elementType: null,
    aspectRatio: 1,
    initialRotation: 0,
    initialAngle: 0,
    gestureMode: null,
    centerX: 0,
    centerY: 0,
    totalAngleDelta: 0,
  });

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // ---------- Detect touch device ----------
  useEffect(() => {
    const checkTouch = () => {
      const legacyNavigator = navigator as Navigator & {
        msMaxTouchPoints?: number;
      };
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          (legacyNavigator.msMaxTouchPoints !== undefined &&
            legacyNavigator.msMaxTouchPoints > 0),
      );
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  // ---------- Keyboard: Delete selected ----------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        setElements((prev) => prev.filter((el) => el.id !== selectedId));
        setSelectedId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId]);

  // ---------- Coordinate helpers ----------
  const svgPoint = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    return pt.matrixTransform(svg.getScreenCTM()!.inverse());
  }, []);

  const getDistance = (touches: TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getAngle = (touches: TouchList) => {
    const dx = touches[1].clientX - touches[0].clientX;
    const dy = touches[1].clientY - touches[0].clientY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const getMidpoint = (touches: TouchList) => {
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2,
    };
  };

  // ---------- Pinch handlers ----------
  const handlePinchStart = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 2) {
        if (selectedId) {
          const el = elements.find((e) => e.id === selectedId);
          if (el) {
            e.preventDefault();

            const distance = getDistance(e.touches);
            const angle = getAngle(e.touches);
            const mid = getMidpoint(e.touches);
            const svgMid = svgPoint(mid.x, mid.y);
            const dims =
              el.type === "text"
                ? { w: el.fontSize || 22, h: el.fontSize || 22 }
                : { w: el.width || 100, h: el.height || 100 };

            pinchRef.current = {
              active: true,
              initialDistance: distance,
              selectedId: el.id,
              initialWidth: dims.w,
              initialHeight: dims.h,
              initialFontSize: el.fontSize || 22,
              elementType: el.type,
              aspectRatio: dims.w / dims.h,
              initialRotation: el.rotation || 0,
              initialAngle: angle,
              gestureMode: null,
              centerX: svgMid.x,
              centerY: svgMid.y,
              totalAngleDelta: 0,
            };
          }
        }
      }
    },
    [selectedId, elements, svgPoint],
  );

  const handlePinchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current.active) {
      e.preventDefault();

      const currentDistance = getDistance(e.touches);
      const currentAngle = getAngle(e.touches);
      const distanceScale = currentDistance / pinchRef.current.initialDistance;

      let angleDelta = currentAngle - pinchRef.current.initialAngle;
      if (angleDelta > 180) angleDelta -= 360;
      if (angleDelta < -180) angleDelta += 360;

      const {
        selectedId,
        initialWidth,
        initialHeight,
        initialFontSize,
        elementType,
        aspectRatio,
        initialRotation,
        gestureMode,
      } = pinchRef.current;

      if (!selectedId) return;

      let mode: "resize" | "rotate" | null = gestureMode;
      if (!mode) {
        const distanceChange = Math.abs(distanceScale - 1);
        const angleChange = Math.abs(angleDelta);
        if (angleChange > 3) {
          mode = "rotate";
        } else if (distanceChange > 0.03) {
          mode = "resize";
        }
        pinchRef.current.gestureMode = mode;
      }

      if (!mode) return;

      setElements((prev) =>
        prev.map((el) => {
          if (el.id !== selectedId) return el;

          if (mode === "resize") {
            const sensitivity = 1.5;
            const newScale = 1 + (distanceScale - 1) * sensitivity;

            if (elementType === "image") {
              const newWidth = Math.max(20, initialWidth * newScale);
              const newHeight = newWidth / aspectRatio;
              return { ...el, width: newWidth, height: newHeight };
            } else if (elementType === "text") {
              const newSize = Math.max(
                8,
                Math.min(200, initialFontSize * newScale),
              );
              return { ...el, fontSize: newSize };
            }
          } else if (mode === "rotate") {
            const rotationSensitivity = 0.8;
            let newRotation =
              initialRotation + angleDelta * rotationSensitivity;
            newRotation = ((newRotation % 360) + 360) % 360;
            if (newRotation > 180) newRotation -= 360;
            return { ...el, rotation: newRotation };
          }
          return el;
        }),
      );
    }
  }, []);

  const handlePinchEnd = useCallback((e: TouchEvent) => {
    if (pinchRef.current.active) {
      pinchRef.current.active = false;
      pinchRef.current.selectedId = null;
      pinchRef.current.gestureMode = null;
      pinchRef.current.totalAngleDelta = 0;
    }
  }, []);

  // ---------- Add pinch event listeners ----------
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    svg.addEventListener("touchstart", handlePinchStart, { passive: false });
    svg.addEventListener("touchmove", handlePinchMove, { passive: false });
    svg.addEventListener("touchend", handlePinchEnd, { passive: false });
    svg.addEventListener("touchcancel", handlePinchEnd, { passive: false });

    return () => {
      svg.removeEventListener("touchstart", handlePinchStart);
      svg.removeEventListener("touchmove", handlePinchMove);
      svg.removeEventListener("touchend", handlePinchEnd);
      svg.removeEventListener("touchcancel", handlePinchEnd);
    };
  }, [handlePinchStart, handlePinchMove, handlePinchEnd]);

  // ---------- Drag and Drop Handlers ----------
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // Set drag image to a transparent pixel to hide default ghost
    const img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) {
      setDragOverIndex(null);
      return;
    }
    setDragOverIndex(index);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    setElements((prev) => {
      const newElements = [...prev];
      const [draggedItem] = newElements.splice(draggedIndex, 1);
      newElements.splice(targetIndex, 0, draggedItem);
      return newElements;
    });

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // ---------- Add / Remove ----------
  const addText = () => {
    const el: DesignElement = {
      id: genId(),
      side: "full",
      type: "text",
      x: GUARD_CENTER_X,
      y: GUARD_CENTER_Y,
      rotation: 0,
      text: "TEXT",
      fontSize: 22,
      fontFamily: FONT_FAMILIES[0]?.name ?? "Impact",
      color: BASE_COLORS[0].hex,
    };
    setElements((prev) => [...prev, el]);
    setSelectedId(el.id);
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readImageFile(file, (dataUrl, nw, nh) => {
      const startW = Math.min(150, nw);
      const startH = startW * (nh / nw);
      const el: DesignElement = {
        id: genId(),
        side: "full",
        type: "image",
        x: GUARD_CENTER_X,
        y: GUARD_CENTER_Y,
        rotation: 0,
        src: dataUrl,
        width: startW,
        height: startH,
        naturalWidth: nw,
        naturalHeight: nh,
      };
      setElements((prev) => [...prev, el]);
      setSelectedId(el.id);
    });
    e.target.value = "";
  };

  const updateEl = (id: string, patch: Partial<DesignElement>) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...patch } : el)),
    );
  };

  const selectedEl = elements.find((e) => e.id === selectedId) ?? null;
  const selectedCategoryName =
    (typeof window !== "undefined" &&
      sessionStorage.getItem("selectedCategory")) ||
    "";
  const isFusionSelected =
    !isBracesSelection &&
    (selectedCategoryName.toLowerCase() === "fusion" ||
      model.toLowerCase().includes("fusion"));

  const handleAddOnCheckboxChange = (
    key: "lowerFit",
    checked: boolean,
    target: "upper" | "lower" | "single",
  ) => {
    if (target === "upper") {
      setUpperAddOnSelections((prev) => ({ ...prev, [key]: checked }));
      return;
    }

    if (target === "lower") {
      setLowerAddOnSelections((prev) => ({ ...prev, [key]: checked }));
      return;
    }

    setSingleAddOnSelections((prev) => ({ ...prev, [key]: checked }));
  };

  // ---------- Drag / Resize ----------
  const startDrag = (
    e: React.MouseEvent | React.TouchEvent,
    id: string,
    mode:
      | "move"
      | "resize"
      | "rotate"
      | "resize-top"
      | "resize-bottom"
      | "resize-left"
      | "resize-right",
    handle?: "nw" | "ne" | "sw" | "se" | "n" | "s" | "e" | "w",
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (pinchRef.current.active) return;

    const el = elements.find((x) => x.id === id);
    if (!el) return;

    const event = e.nativeEvent;
    let clientX, clientY;
    if ("touches" in event) {
      const touch = event.touches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      clientX = (event as MouseEvent).clientX;
      clientY = (event as MouseEvent).clientY;
    }

    const { x, y } = svgPoint(clientX, clientY);
    const initialMouseAngle = getRotationAngle(el.x, el.y, x, y);

    dragRef.current = {
      id,
      mode,
      handle,
      startX: x,
      startY: y,
      initialX: el.x,
      initialY: el.y,
      initialW: el.width ?? 100,
      initialH: el.height ?? 100,
      initialFontSize: el.fontSize ?? 22,
      initialRotation: el.rotation ?? 0,
      initialMouseAngle,
    };
    setSelectedId(id);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: false });
    window.addEventListener("touchcancel", onTouchEnd, { passive: false });
  };

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (pinchRef.current.active) return;
      e.preventDefault();
      if (!dragRef.current) return;
      const touch = e.touches[0];
      const { x, y } = svgPoint(touch.clientX, touch.clientY);
      applyDragMovement(x, y);
    },
    [svgPoint],
  );

  const applyDragMovement = useCallback((x: number, y: number) => {
    if (!dragRef.current) return;
    const d = dragRef.current;
    const dx = x - d.startX;
    const dy = y - d.startY;

    setElements((prev) =>
      prev.map((el) => {
        if (el.id !== d.id) return el;
        if (d.mode === "move") {
          return { ...el, x: d.initialX + dx, y: d.initialY + dy };
        }
        if (d.mode === "rotate") {
          const currentAngle = getRotationAngle(el.x, el.y, x, y);
          let deltaAngle = currentAngle - d.initialMouseAngle;
          if (deltaAngle > 180) deltaAngle -= 360;
          if (deltaAngle < -180) deltaAngle += 360;
          let newRotation = d.initialRotation + deltaAngle;
          newRotation = ((newRotation % 360) + 360) % 360;
          if (newRotation > 180) newRotation -= 360;
          return { ...el, rotation: newRotation };
        }
        if (d.mode === "resize" && el.type === "image") {
          const aspect = d.initialW / d.initialH;
          let growth = 0;
          switch (d.handle) {
            case "se":
              growth = (dx + dy) / 2;
              break;
            case "nw":
              growth = (-dx - dy) / 2;
              break;
            case "ne":
              growth = (dx - dy) / 2;
              break;
            case "sw":
              growth = (-dx + dy) / 2;
              break;
          }
          const nw = Math.max(20, d.initialW + growth);
          const nh = nw / aspect;
          return { ...el, width: nw, height: nh };
        }
        // Non-proportional resize for images
        if (el.type === "image") {
          let newWidth = d.initialW;
          let newHeight = d.initialH;

          switch (d.mode) {
            case "resize-right":
              newWidth = Math.max(20, d.initialW + dx);
              break;
            case "resize-left":
              newWidth = Math.max(20, d.initialW - dx);
              break;
            case "resize-bottom":
              newHeight = Math.max(20, d.initialH + dy);
              break;
            case "resize-top":
              newHeight = Math.max(20, d.initialH - dy);
              break;
          }
          return { ...el, width: newWidth, height: newHeight };
        }
        if (d.mode === "resize" && el.type === "text") {
          if (!d.handle) return el;
          const diag = {
            se: { x: 1, y: 1 },
            nw: { x: -1, y: -1 },
            ne: { x: 1, y: -1 },
            sw: { x: -1, y: 1 },
          }[d.handle as "se" | "nw" | "ne" | "sw"];
          if (!diag) return el;
          const delta = (dx * diag.x + dy * diag.y) / Math.SQRT2;
          const sensitivity = 0.3;
          const nf = Math.max(
            8,
            Math.min(200, d.initialFontSize + delta * sensitivity),
          );
          return { ...el, fontSize: nf };
        }
        return el;
      }),
    );
  }, []);

  const onMove = useCallback(
    (e: MouseEvent) => {
      if (!dragRef.current) return;
      const { x, y } = svgPoint(e.clientX, e.clientY);
      applyDragMovement(x, y);
    },
    [svgPoint],
  );

  const onUp = useCallback(() => {
    dragRef.current = null;
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("touchcancel", onTouchEnd);
  }, [onMove, onTouchMove]);

  const onTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (pinchRef.current.active) return;
      dragRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    },
    [onMove, onTouchMove],
  );

  // ---------- Text dimensions estimate ----------
  const textDims = (el: DesignElement) => {
    const fs = el.fontSize ?? 22;
    const txt = el.text ?? "";
    const w =
      txt.length *
      fs *
      (["Impact", "Oswald"].includes(getCleanFontName(el.fontFamily ?? ""))
        ? 0.65
        : 0.55);
    const h = fs * 1.25;
    return { w: Math.max(w, 40), h };
  };

  // ---------- Render helpers ----------
  const renderElement = (el: DesignElement) => {
    const isSelected = selectedId === el.id;
    const dims =
      el.type === "text"
        ? textDims(el)
        : { w: el.width ?? 100, h: el.height ?? 100 };
    const hw = dims.w / 2;
    const hh = dims.h / 2;

    return (
      <g
        key={el.id}
        transform={`translate(${el.x} ${el.y})`}
        data-element="true"
        data-element-id={el.id}
      >
        <g
          transform={`rotate(${el.rotation})`}
          onMouseDown={(e) => startDrag(e, el.id, "move")}
          onTouchStart={(e) => {
            if (e.touches.length === 1) {
              startDrag(e, el.id, "move");
            }
          }}
          style={{ cursor: "move" }}
        >
          {el.type === "image" && el.src && (
            <image
              href={el.src}
              x={-hw}
              y={-hh}
              width={dims.w}
              height={dims.h}
              preserveAspectRatio="none"
              pointerEvents="all"
            />
          )}
          {el.type === "text" && (
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily={el.fontFamily ?? FONT_FAMILIES[0]?.value}
              fontWeight="bold"
              fontSize={el.fontSize}
              fill={el.color}
              letterSpacing={2}
              pointerEvents="all"
            >
              {el.text}
            </text>
          )}

          {isSelected && (
            <g className="selection-box">
              <rect
                x={-hw - 6}
                y={-hh - 6}
                width={dims.w + 12}
                height={dims.h + 12}
                fill="none"
                stroke="#e2222b"
                strokeWidth={1.5}
                strokeDasharray="4 3"
                pointerEvents="none"
              />

              {!isTouchDevice && (
                <>
                  <RotationHandle
                    x={0}
                    y={-hh - 16}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      startDrag(e, el.id, "rotate");
                    }}
                  />

                  <line
                    x1={0}
                    y1={-hh - 10}
                    x2={0}
                    y2={-hh - 6}
                    stroke="#e2222b"
                    strokeWidth={1}
                    strokeDasharray="2 2"
                    pointerEvents="none"
                  />

                  {el.type === "image" && (
                    <>
                      {/* Corner handles - proportional resize */}
                      <Handle
                        x={-hw - 6}
                        y={-hh - 6}
                        cursor="nwse-resize"
                        color="#e2222b"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          startDrag(e, el.id, "resize", "nw");
                        }}
                      />
                      <Handle
                        x={hw + 6}
                        y={-hh - 6}
                        cursor="nesw-resize"
                        color="#e2222b"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          startDrag(e, el.id, "resize", "ne");
                        }}
                      />
                      <Handle
                        x={-hw - 6}
                        y={hh + 6}
                        cursor="nesw-resize"
                        color="#e2222b"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          startDrag(e, el.id, "resize", "sw");
                        }}
                      />
                      <Handle
                        x={hw + 6}
                        y={hh + 6}
                        cursor="nwse-resize"
                        color="#e2222b"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          startDrag(e, el.id, "resize", "se");
                        }}
                      />

                      {/* Middle handles - non-proportional resize */}
                      <Handle
                        x={0}
                        y={-hh - 6}
                        cursor="ns-resize"
                        color="#2563eb"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          startDrag(e, el.id, "resize-top");
                        }}
                      />
                      <Handle
                        x={0}
                        y={hh + 6}
                        cursor="ns-resize"
                        color="#2563eb"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          startDrag(e, el.id, "resize-bottom");
                        }}
                      />
                      <Handle
                        x={-hw - 6}
                        y={0}
                        cursor="ew-resize"
                        color="#2563eb"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          startDrag(e, el.id, "resize-left");
                        }}
                      />
                      <Handle
                        x={hw + 6}
                        y={0}
                        cursor="ew-resize"
                        color="#2563eb"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          startDrag(e, el.id, "resize-right");
                        }}
                      />

                      {/* Label for non-proportional handles */}
                      <text
                        x={0}
                        y={hh + 22}
                        textAnchor="middle"
                        fill="#2563eb"
                        fontSize="8"
                        fontWeight="bold"
                        opacity={0.7}
                        pointerEvents="none"
                      >
                        Blue = stretch (non-proportional)
                      </text>
                    </>
                  )}
                  {el.type === "text" && (
                    <>
                      <Handle
                        x={-hw - 6}
                        y={-hh - 6}
                        cursor="nwse-resize"
                        color="#e2222b"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          startDrag(e, el.id, "resize", "nw");
                        }}
                      />
                      <Handle
                        x={hw + 6}
                        y={hh + 6}
                        cursor="nwse-resize"
                        color="#e2222b"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          startDrag(e, el.id, "resize", "se");
                        }}
                      />
                    </>
                  )}
                </>
              )}

              {isTouchDevice && (
                <g pointerEvents="none">
                  <text
                    x={0}
                    y={hh + 25}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="10"
                    fontWeight="bold"
                    opacity={0.7}
                  >
                    Pinch to resize • Rotate with two fingers
                  </text>
                </g>
              )}
            </g>
          )}
        </g>
      </g>
    );
  };

  const Handle = ({
    x,
    y,
    cursor,
    onMouseDown,
    color = "#e2222b",
  }: {
    x: number;
    y: number;
    cursor: string;
    onMouseDown: (e: React.MouseEvent) => void;
    color?: string;
  }) => (
    <circle
      cx={x}
      cy={y}
      r={6}
      fill={color}
      stroke="white"
      strokeWidth={1.5}
      cursor={cursor}
      onMouseDown={onMouseDown}
    />
  );

  const RotationHandle = ({
    x,
    y,
    onMouseDown,
  }: {
    x: number;
    y: number;
    onMouseDown: (e: React.MouseEvent) => void;
  }) => (
    <circle
      cx={x}
      cy={y}
      r={7}
      fill="#fff"
      stroke="#e2222b"
      strokeWidth={1.5}
      cursor="grab"
      onMouseDown={onMouseDown}
    />
  );

  function getRotationAngle(
    centerX: number,
    centerY: number,
    mouseX: number,
    mouseY: number,
  ): number {
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  }

  const [showAthleteNameError, setShowAthleteNameError] = useState(false);

  const downloadPng = async () => {
    if (!athleteName.trim()) {
      setShowAthleteNameError(true);
      return;
    }

    setShowAthleteNameError(false);
    console.log("=== PNG DOWNLOAD START ===");

    const resolveFontName = (fontFamilyValue: string): string => {
      const varMatch = fontFamilyValue.match(/var\((--font-[^)]+)\)/);
      if (varMatch) {
        const varName = varMatch[1];
        const varMap: Record<string, string> = {
          "--font-inter": "Inter",
          "--font-impact": "Impact",
          "--font-limelight": "Limelight",
          "--font-oswald": "Oswald",
          "--font-playfair": "Playfair Display",
          "--font-dancing": "Dancing Script",
          "--font-lato": "Lato",
          "--font-copperplate": "Copperplate Gothic",
        };
        return varMap[varName] || "Arial";
      }
      const clean = fontFamilyValue.split(",")[0].replace(/["']/g, "").trim();
      return clean || "Arial";
    };

    // RESOLUTION CONTROL
    const resolutionMultiplier = 4; // 1 = standard, 2 = 2x, 3 = 3x, etc.

    // Make canvas taller - from 500 to 850 to accommodate element details
    const canvas = document.createElement("canvas");
    canvas.width = 1200 * resolutionMultiplier;
    canvas.height = 850 * resolutionMultiplier;
    const ctx = canvas.getContext("2d")!;

    // Background: Dark gradient for better contrast
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#2a2a32");
    gradient.addColorStop(0.25, "#1a1a22");
    gradient.addColorStop(1, "#0d0d12");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const scale = canvas.width / 550;
    const offsetX = 25 * resolutionMultiplier;
    const offsetY = 40 * resolutionMultiplier;

    const guardPath = new Path2D(GUARD_PATH);

    // Draw guard with subtle shadow
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 30 * resolutionMultiplier;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10 * resolutionMultiplier;

    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    ctx.beginPath();
    ctx.clip(guardPath);

    if (model === "Fusion") {
      ctx.fillStyle = leftBaseColor.hex;
      ctx.fillRect(0, 0, 262, 160);
      ctx.fillStyle = rightBaseColor.hex;
      ctx.fillRect(262, 0, 275, 160);
    } else {
      ctx.fillStyle = baseColor.hex;
      ctx.fillRect(0, 0, 550, 160);
    }

    // Render elements in order (last rendered = on top)
    for (const el of elements) {
      ctx.save();

      const x = el.x ?? 0;
      const y = el.y ?? 0;
      const rot = (el.rotation ?? 0) * (Math.PI / 180);
      ctx.translate(x, y);
      ctx.rotate(rot);

      if (el.type === "image" && el.src) {
        const img = new Image();
        img.src = el.src;
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Failed to load image"));
        });
        const w = el.width ?? 100;
        const h = el.height ?? 100;
        ctx.drawImage(img, -w / 2, -h / 2, w, h);
      } else if (el.type === "text" && el.text) {
        const fontSize = el.fontSize ?? 22;
        const fontFamily = el.fontFamily ?? "Arial";

        const cleanFont = resolveFontName(fontFamily);
        console.log(`Drawing text "${el.text}" with font: ${cleanFont}`);

        const fontWeight = "bold";
        const fontString = `${fontWeight} ${fontSize}px "${cleanFont}"`;

        await document.fonts.load(fontString);

        ctx.font = fontString;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = el.color ?? "#ffffff";

        ctx.measureText(el.text);
        await new Promise((resolve) => setTimeout(resolve, 50));

        const textVerticalOffset = -7;
        ctx.fillText(el.text, 0, textVerticalOffset);
      }

      ctx.restore();
    }

    ctx.restore();

    // ---------- INFO SECTION - Bottom Left with Two Columns ----------
    const infoX = 50 * resolutionMultiplier;
    const infoY = canvas.height - 240 * resolutionMultiplier; // Start from bottom, moving up

    // --- MAIN INFO PANEL (Left Column) ---
    // Draw semi-transparent background panel
    const panelWidth = 460 * resolutionMultiplier;
    const panelHeight = 190 * resolutionMultiplier;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 20 * resolutionMultiplier;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 5 * resolutionMultiplier;

    ctx.fillStyle = "rgba(20, 20, 28, 0.85)";
    ctx.beginPath();
    ctx.rect(
      infoX - 20 * resolutionMultiplier,
      infoY - 20 * resolutionMultiplier,
      panelWidth,
      panelHeight,
    );
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1 * resolutionMultiplier;
    ctx.beginPath();
    ctx.rect(
      infoX - 20 * resolutionMultiplier,
      infoY - 20 * resolutionMultiplier,
      panelWidth,
      panelHeight,
    );
    ctx.stroke();
    ctx.restore();

    // Main info text
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    // Title: Model and Thickness
    const titleFont = `700 ${24 * resolutionMultiplier}px Arial, sans-serif`;
    await document.fonts.load(titleFont);
    ctx.fillStyle = "#ffffff";
    ctx.font = titleFont;
    ctx.fillText(`${model} · ${thickness}`, infoX, infoY);

    // Athlete Name
    const nameFont = `600 ${18 * resolutionMultiplier}px Arial, sans-serif`;
    await document.fonts.load(nameFont);
    ctx.fillStyle = "#d0d0d8";
    ctx.font = nameFont;
    ctx.fillText(
      "Athlete Name: " + (athleteName || "Unknown"),
      infoX,
      infoY + 36 * resolutionMultiplier,
    );

    const addOnSummary = [
      upperAddOnSelections.lowerFit ? "Lower fit tray" : null,
      lowerAddOnSelections.lowerFit ? "Lower fit tray" : null,
      singleAddOnSelections.lowerFit ? "Lower fit tray" : null,
    ].filter(Boolean) as string[];

    const uniqueAddOns = [...new Set(addOnSummary)];
    const colorSummary = isFusionSelected
      ? `Left: ${leftBaseColor.name} · Right: ${rightBaseColor.name}`
      : `Color: ${baseColor.name}${showLowerColorSelector ? ` · Lower: ${lowerColor.name}` : ""}`;
    const summaryLines = [
      colorSummary,
      `${uniqueAddOns.length >= 1 ? "Add-ons:" + uniqueAddOns.join(" • ") : ""}`,
      `Setup: ${isBracesSelection ? "Upper + Lower" : "Single guard"}`,
      `Total: EGP ${totalPrice.toLocaleString()}`,
    ];

    const infoFont = `400 ${14 * resolutionMultiplier}px Arial, sans-serif`;
    await document.fonts.load(infoFont);
    ctx.fillStyle = "#a0a0aa";
    ctx.font = infoFont;

    summaryLines.forEach((line, index) => {
      ctx.fillText(
        line,
        infoX,
        infoY + (66 + index * 20) * resolutionMultiplier,
      );
    });

    // Decorative line
    ctx.strokeStyle = "rgba(226, 34, 43, 0.3)";
    ctx.lineWidth = 2 * resolutionMultiplier;
    ctx.beginPath();
    ctx.moveTo(infoX, infoY - 8 * resolutionMultiplier);
    ctx.lineTo(
      infoX + 60 * resolutionMultiplier,
      infoY - 8 * resolutionMultiplier,
    );
    ctx.stroke();

    // --- TEXT ELEMENTS INFO BOX (Right Column) ---
    const textElements = elements.filter((el) => el.type === "text");

    if (textElements.length > 0) {
      // Position the text info box to the right of the main panel
      const textBoxX = infoX + panelWidth + 30 * resolutionMultiplier;
      const textBoxY = infoY - 20 * resolutionMultiplier;
      const textBoxWidth = 300 * resolutionMultiplier;
      const textBoxHeight = panelHeight;

      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowBlur = 20 * resolutionMultiplier;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 5 * resolutionMultiplier;

      ctx.fillStyle = "rgba(20, 20, 28, 0.85)";
      ctx.beginPath();
      ctx.rect(textBoxX, textBoxY, textBoxWidth, textBoxHeight);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1 * resolutionMultiplier;
      ctx.beginPath();
      ctx.rect(textBoxX, textBoxY, textBoxWidth, textBoxHeight);
      ctx.stroke();
      ctx.restore();

      // Header
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillStyle = "#a0a0aa";
      ctx.font = `600 ${11 * resolutionMultiplier}px Arial, sans-serif`;
      ctx.fillText(
        "TEXT ELEMENTS",
        textBoxX + 12 * resolutionMultiplier,
        textBoxY + 12 * resolutionMultiplier,
      );

      // List text elements in compact way
      let currentY = textBoxY + 32 * resolutionMultiplier;
      const itemHeight = 28 * resolutionMultiplier;
      const maxItems = Math.min(textElements.length, 6); // Show max 6 items

      textElements.slice(0, maxItems).forEach((el, index) => {
        const cleanFont = resolveFontName(el.fontFamily || "Arial");
        // Round font size to 2 decimal places
        const fontSize = Math.round((el.fontSize || 22) * 100) / 100;
        const textPreview = el.text || "TEXT";

        // Background for each item (alternating)
        if (index % 2 === 0) {
          ctx.fillStyle = "rgba(255,255,255,0.03)";
          ctx.fillRect(textBoxX, currentY, textBoxWidth, itemHeight);
        }

        // Number badge
        ctx.fillStyle = "rgba(226, 34, 43, 0.15)";
        ctx.beginPath();
        ctx.rect(textBoxX, currentY, 22 * resolutionMultiplier, itemHeight);
        ctx.fill();

        ctx.fillStyle = "#e2222b";
        ctx.font = `700 ${10 * resolutionMultiplier}px Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          `${index + 1}`,
          textBoxX + 11 * resolutionMultiplier,
          currentY + itemHeight / 2,
        );

        // Text preview
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = "#ffffff";
        ctx.font = `600 ${12 * resolutionMultiplier}px Arial, sans-serif`;
        ctx.fillText(
          textPreview,
          textBoxX + 30 * resolutionMultiplier,
          currentY + 3 * resolutionMultiplier,
        );

        // Font name (small)
        ctx.fillStyle = "#888892";
        ctx.font = `400 ${9 * resolutionMultiplier}px Arial, sans-serif`;
        ctx.fillText(
          cleanFont,
          textBoxX + 30 * resolutionMultiplier,
          currentY + 16 * resolutionMultiplier,
        );

        // Font size badge (right side)
        ctx.fillStyle = "rgba(255,255,255,0.06)";
        ctx.beginPath();
        ctx.rect(
          textBoxX + textBoxWidth - 52 * resolutionMultiplier,
          currentY + 4 * resolutionMultiplier,
          44 * resolutionMultiplier,
          20 * resolutionMultiplier,
        );
        ctx.fill();

        ctx.fillStyle = "#d0d0d8";
        ctx.font = `700 ${11 * resolutionMultiplier}px Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          `${fontSize}px`,
          textBoxX + textBoxWidth - 30 * resolutionMultiplier,
          currentY + 14 * resolutionMultiplier,
        );

        // Color indicator dot
        ctx.save();
        ctx.shadowBlur = 0;
        const dotX = textBoxX + textBoxWidth - 60 * resolutionMultiplier;
        const dotY = currentY + 14 * resolutionMultiplier;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 5 * resolutionMultiplier, 0, Math.PI * 2);
        ctx.fillStyle = el.color || "#ffffff";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.lineWidth = 1 * resolutionMultiplier;
        ctx.stroke();
        ctx.restore();

        currentY += itemHeight;
      });

      // If there are more elements than shown
      if (textElements.length > maxItems) {
        ctx.fillStyle = "#666672";
        ctx.font = `400 ${10 * resolutionMultiplier}px Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(
          `+ ${textElements.length - maxItems} more`,
          textBoxX + textBoxWidth / 2,
          currentY + 4 * resolutionMultiplier,
        );
      }
    }

    // Download
    const link = document.createElement("a");
    link.download = `zeeguard-${(athleteName || "design").toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="grid grid-cols-1 gap-4 pt-10 lg:grid-cols-[1.1fr_1fr] lg:gap-6 lg:pt-20">
      {/* Preview */}
      <div className="flex h-[55vh] min-h-70 flex-col gap-1 rounded-xl border border-white/10 bg-ink-900 px-2 py-3 lg:h-200 lg:p-8">
        <div className="flex flex-col items- justify-between">
          <div className="flex flex-col items-start">
            <span className="font-display text-xl uppercase tracking-wide text-white lg:text-2xl">
              Studio
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide whitespace-nowrap text-gold-400">
              Live Preview — Tap &amp; drag and rotate elements
            </span>
          </div>
          <div className="text-xs text-steel-400">
            {isTouchDevice &&
              selectedEl &&
              "Pinch to resize • Rotate with two fingers"}
          </div>
        </div>

        <div className="relative flex flex-1 items-center justify-center overflow-hidden">
          <div className="relative flex h-full w-full max-w-3xl items-center justify-center">
            <svg
              ref={svgRef}
              viewBox="-15 0 550 160"
              width={550}
              height={160}
              className="h-full w-full touch-none select-none drop-shadow-[0_0_30px_rgba(226,34,43,0.25)]"
              onMouseDown={() => setSelectedId(null)}
            >
              <defs>
                <clipPath id="guard-clip">
                  <path d={GUARD_PATH} />
                </clipPath>
                <clipPath id="left-half">
                  <rect x="0" y="0" width="262" height="160" />
                </clipPath>
                <clipPath id="right-half">
                  <rect x="262" y="0" width="275" height="160" />
                </clipPath>
              </defs>

              {/* Guard body */}
              {isFusionSelected ? (
                <>
                  <path
                    d={GUARD_PATH}
                    fill={leftBaseColor.hex}
                    clipPath="url(#left-half)"
                    stroke="none"
                  />
                  <path
                    d={GUARD_PATH}
                    fill={rightBaseColor.hex}
                    clipPath="url(#right-half)"
                    stroke="none"
                  />
                  <path
                    d={GUARD_PATH}
                    fill="none"
                    stroke="rgba(0,0,0,0.35)"
                    strokeWidth={3}
                  />
                </>
              ) : (
                <path
                  d={GUARD_PATH}
                  fill={baseColor.hex}
                  stroke="rgba(0,0,0,0.35)"
                  strokeWidth={3}
                />
              )}

              {/* Elements rendered in order (last = top) */}
              {elements.map(renderElement)}

              {/* Edge highlight */}
              <path
                d={GUARD_PATH}
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth={1.5}
              />
            </svg>
          </div>
        </div>

        <p className="text-center text-xs text-stone whitespace-nowrap">
          {selectedEl
            ? `${selectedEl.type === "image" ? "Image" : "Text"} selected — ${isTouchDevice ? "drag to move, pinch to resize, rotate with two fingers" : "drag to move, use handles to resize and rotate"}`
            : "Tap an element to select it, or use the panel to add new ones"}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 lg:gap-6 custom-scrollbar">
        <div className="rounded-xl bg-ink-850 p-4 lg:p-6 flex  justify-between">
          <div className=" flex flex-col md:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                setAthleteName("");
                setModel("DesignFlex Shield");
                setThickness("4mm");
                setBaseColor(BASE_COLORS[1]);
                setLeftBaseColor(BASE_COLORS[1]);
                setRightBaseColor(BASE_COLORS[1]);
                setElements([]);
                setSelectedId(null);
              }}
              className="flex items-center justify-center gap-2 rounded-lg  hover:cursor-pointer  border border-white/20 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 min-h-[44px] 	active:bg-white/20 active:scale-95 transition-all duration-150"
            >
              <RotateCcw size={18} /> Reset
            </button>
            <button
              type="button"
              onClick={downloadPng}
              className="flex items-center hover:cursor-pointer justify-center gap-2 rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white hover:bg-green-600 min-h-[44px] active:bg-green-800 active:scale-95 transition-all duration-150"
            >
              <Download size={18} /> Download PNG
            </button>
          </div>
          <div className="  lg:flex-row gap-3">
            <div className="flex flex-col md:flex-row gap-3">
              <button
                type="button"
                onClick={addText}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg  hover:cursor-pointer  bg-blaze-500 px-4 py-3 text-sm font-semibold text-white hover:bg-blaze-600 min-h-[44px] sm:flex-none sm:justify-start 	active:bg-blaze-700 active:scale-95 transition-all duration-150"
              >
                <Type size={18} /> Add Text
              </button>
              <button
                type="button"
                onClick={triggerImageUpload}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg  hover:cursor-pointer  bg-blue-500 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-600 min-h-[44px] sm:flex-none sm:justify-start 	active:bg-blue-700 active:scale-95 transition-all duration-150"
              >
                <ImagePlus size={18} /> Add Image
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* 3. Elements - Collapsible with Drag and Drop */}
        {elements.length > 0 && (
          <CollapsibleSection title="Elements added" defaultOpen={true}>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-steel-400">
                  Elements ({elements.length}) — Hold & Drag to reorder
                </p>
              </div>
              <div className="max-h-40 overflow-y-auto pr-1">
                <ul className="space-y-1">
                  {elements.map((el, index) => (
                    <DraggableElementItem
                      key={el.id}
                      element={el}
                      index={index}
                      isSelected={selectedId === el.id}
                      isDragOver={dragOverIndex === index}
                      onSelect={() => setSelectedId(el.id)}
                      onDelete={(e) => {
                        e.stopPropagation();
                        setElements((prev) =>
                          prev.filter((item) => item.id !== el.id),
                        );
                        if (selectedId === el.id) setSelectedId(null);
                      }}
                      onDragStart={handleDragStart}
                      onDragOver={handleDragOver}
                      onDragEnd={handleDragEnd}
                      onDrop={handleDrop}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </CollapsibleSection>
        )}

        {/* Edit Selected - Collapsible (only show when element is selected) */}
        {selectedEl && (
          <CollapsibleSection title="Edit Selected" defaultOpen={true}>
            <div className="space-y-4">
              {selectedEl.type === "text" && (
                <>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-steel-400">
                      Text
                    </label>
                    <input
                      type="text"
                      value={selectedEl.text || ""}
                      onChange={(e) =>
                        updateEl(selectedEl.id, { text: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-white/15 bg-ink-900 px-4 py-3 text-base text-white min-h-[44px] lg:text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide text-steel-400">
                        Font Size
                      </label>
                      <div className="number-wrapper">
                        <input
                          type="number"
                          min="8"
                          max="120"
                          value={selectedEl.fontSize || 22}
                          onChange={(e) =>
                            updateEl(selectedEl.id, {
                              fontSize: Number(e.target.value),
                            })
                          }
                          className="mt-1 w-full rounded-lg border border-white/15 bg-ink-900 px-4 py-3 text-base text-white min-h-[44px] lg:text-sm no-spinners"
                        />
                        <div className="number-arrows">
                          <button
                            type="button"
                            className="number-arrow-btn"
                            onClick={() => {
                              const current = Number(selectedEl.rotation) || 0;
                              updateEl(selectedEl.id, {
                                rotation: current + 1,
                              });
                            }}
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            className="number-arrow-btn"
                            onClick={() => {
                              const current = Number(selectedEl.rotation) || 0;
                              updateEl(selectedEl.id, {
                                rotation: current - 1,
                              });
                            }}
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide text-steel-400">
                        Color
                      </label>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {BASE_COLORS.map((c) => (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() =>
                              updateEl(selectedEl.id, { color: c.hex })
                            }
                            className={cn(
                              "h-10 w-10 rounded-full border-2 transition-transform hover:scale-110 sm:h-8 sm:w-8",
                              selectedEl.color === c.hex
                                ? "border-blaze-500"
                                : "border-white/20",
                            )}
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-steel-400">
                      Font Family
                    </label>
                    <select
                      value={selectedEl.fontFamily || FONT_FAMILIES[0]?.value}
                      onChange={(e) =>
                        updateEl(selectedEl.id, { fontFamily: e.target.value })
                      }
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        backgroundSize: "20px",
                      }}
                      className="mt-1 w-full rounded-lg border border-white/15 bg-ink-900 px-4 py-3 text-base text-white min-h-[44px] lg:text-sm appearance-none  cursor-pointer"
                    >
                      {FONT_FAMILIES.map((f) => (
                        <option key={f.value} value={f.value}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-steel-400">
                    Rotation
                  </label>
                  <div className="number-wrapper">
                    <input
                      type="number"
                      value={selectedEl.rotation || 0}
                      onChange={(e) =>
                        updateEl(selectedEl.id, {
                          rotation: Number(e.target.value),
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-white/15 bg-ink-900 px-4 py-3 text-base text-white min-h-[44px] lg:text-sm no-spinners"
                    />
                    <div className="number-arrows">
                      <button
                        type="button"
                        className="number-arrow-btn"
                        onClick={() => {
                          const current = Number(selectedEl.rotation) || 0;
                          updateEl(selectedEl.id, { rotation: current + 1 });
                        }}
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        className="number-arrow-btn"
                        onClick={() => {
                          const current = Number(selectedEl.rotation) || 0;
                          updateEl(selectedEl.id, { rotation: current - 1 });
                        }}
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (selectedId) {
                    setElements((prev) =>
                      prev.filter((e) => e.id !== selectedId),
                    );
                    setSelectedId(null);
                  }
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500/20 px-4 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/30 min-h-[44px] sm:w-auto sm:justify-start"
              >
                <Trash2 size={16} /> Delete Element
              </button>
            </div>
          </CollapsibleSection>
        )}

        {/* 1. Specifications - Collapsible */}
        <CollapsibleSection
          title="Specifications"
          number={1}
          defaultOpen={true}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="athlete-name"
                className="text-xs font-semibold uppercase tracking-wide text-steel-400"
              >
                Athlete Name
              </label>
              <input
                id="athlete-name"
                type="text"
                placeholder="Enter name"
                value={athleteName}
                onChange={(e) => {
                  setAthleteName(e.target.value);
                  if (showAthleteNameError && e.target.value.trim()) {
                    setShowAthleteNameError(false);
                  }
                }}
                className="w-full rounded-lg border border-white/15 bg-ink-900 px-4 py-3 text-base text-white placeholder:text-steel-500 focus:border-blaze-500 min-h-11 lg:text-sm"
              />
              {showAthleteNameError && (
                <p className="mt-2 text-xs font-medium text-red-400">
                  Please type the athlete name before downloading the PNG.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="model"
                  className="text-xs font-semibold uppercase tracking-wide text-steel-400"
                >
                  Model
                </label>
                <select
                  id="model"
                  value={model}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                    backgroundSize: "20px",
                  }}
                  onChange={(e) => handleUpperModelChange(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-ink-900 px-4  py-3 text-base text-white focus:border-blaze-500 min-h-11 lg:text-sm appearance-none  cursor-pointer"
                >
                  {MODELS.map((m) => (
                    <option key={m} value={m}>
                      {m} — EGP {getPriceForModel(m).toLocaleString()}
                    </option>
                  ))}
                </select>
                {getRecommendedForModel(model) && (
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-400">
                    Recommended: {getRecommendedForModel(model)}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="thickness"
                  className="text-xs font-semibold uppercase tracking-wide text-steel-400"
                >
                  Thickness
                </label>
                <select
                  id="thickness"
                  value={thickness}
                  disabled
                  aria-disabled="true"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                    backgroundSize: "20px",
                    cursor: "not-allowed",
                    opacity: 0.8,
                  }}
                  className="w-full rounded-lg border border-white/15 bg-ink-900 px-4 py-3 text-base text-white focus:border-blaze-500 min-h-[44px] lg:text-sm appearance-none cursor-not-allowed"
                >
                  {THICKNESSES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {(isBracesSelection || isBracesUpperModel(model)) && (
              <div className="rounded-xl border border-white/10 bg-ink-900/50 p-3">
                <label className="flex items-center justify-between gap-3 text-sm text-stone">
                  <span className="font-semibold text-white">
                    Add lower mouthguard
                  </span>
                  <input
                    type="checkbox"
                    checked={includeLowerGuard}
                    onChange={(e) =>
                      handleIncludeLowerGuardToggle(e.target.checked)
                    }
                    className="h-4 w-4 accent-blaze-500"
                  />
                </label>

                {includeLowerGuard && (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="lower-model"
                        className="text-xs font-semibold uppercase tracking-wide text-steel-400"
                      >
                        Lower Model
                      </label>
                      <select
                        id="lower-model"
                        value={lowerModel}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                          backgroundSize: "20px",
                        }}
                        onChange={(e) => handleLowerModelChange(e.target.value)}
                        className="w-full rounded-lg border border-white/15 bg-ink-900 px-4 py-3 text-base text-white focus:border-blaze-500 min-h-11 lg:text-sm appearance-none cursor-pointer"
                      >
                        {LOWER_JAW_OPTIONS.map((m) => (
                          <option key={m.name} value={m.name}>
                            {m.name} — EGP {m.price.toLocaleString()}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="lower-thickness"
                        className="text-xs font-semibold uppercase tracking-wide text-steel-400"
                      >
                        Lower Thickness
                      </label>
                      <select
                        id="lower-thickness"
                        value={lowerThickness}
                        disabled
                        aria-disabled="true"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                          backgroundSize: "20px",
                          cursor: "not-allowed",
                          opacity: 0.8,
                        }}
                        className="w-full rounded-lg border border-white/15 bg-ink-900 px-4 py-3 text-base text-white focus:border-blaze-500 min-h-[44px] lg:text-sm appearance-none cursor-not-allowed"
                      >
                        {THICKNESSES.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-row items-stretch gap-4">
              <div className="flex-1 rounded-xl border border-white/10 bg-ink-900/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-steel-400">
                  {isBracesSelection
                    ? "Braces configuration"
                    : "Selected add-ons"}
                </p>

                {isBracesSelection ? (
                  <div className="mt-3 space-y-4">
                    {!includeLowerGuard && (
                      <div>
                        <p className="mb-2 text-sm font-semibold text-white">
                          Upper tier add-ons
                        </p>
                        <div className="space-y-2">
                          {(["lowerFit"] as const).map((key) => (
                            <label
                              key={`upper-${key}`}
                              className="flex items-center gap-3 text-sm text-stone"
                            >
                              <input
                                type="checkbox"
                                checked={upperAddOnSelections[key]}
                                onChange={(e) =>
                                  handleAddOnCheckboxChange(
                                    key,
                                    e.target.checked,
                                    "upper",
                                  )
                                }
                                className="h-4 w-4 accent-blaze-500"
                              />
                              <span className="flex flex-1 items-center justify-between gap-2">
                                <span>Lower fit tray</span>
                                <span className="text-xs font-semibold text-gold-400">
                                  +{(ADD_ONS[key] ?? { price: 0 }).price} EGP
                                </span>
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-3 space-y-2">
                    {(["lowerFit"] as const).map((key) => (
                      <label
                        key={key}
                        className="flex items-center gap-3 text-sm text-stone cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={singleAddOnSelections[key]}
                          onChange={(e) =>
                            handleAddOnCheckboxChange(
                              key,
                              e.target.checked,
                              "single",
                            )
                          }
                          className="h-4 w-4 accent-blaze-500 cursor-pointer"
                        />
                        <span className="flex flex-1 items-center justify-between gap-2">
                          <span>Lower fit tray</span>
                          <span className="text-xs font-semibold text-gold-400">
                            +{(ADD_ONS[key] ?? { price: 0 }).price} EGP
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-1 rounded-xl border border-blaze-500/30 bg-blaze-500/10 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-steel-400">
                  Total price
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  EGP {totalPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* 2. Base Color - Collapsible */}
        <CollapsibleSection title="Base Color" number={2} defaultOpen={true}>
          {isFusionSelected ? (
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-between">
              <div className="">
                <span className="text-xs font-semibold uppercase tracking-wide text-steel-400">
                  Left
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {BASE_COLORS.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setLeftBaseColor(c)}
                      className={cn(
                        "h-10 w-10 rounded-full border-2 transition-transform hover:scale-110 sm:h-8 sm:w-8",
                        leftBaseColor.name === c.name
                          ? "border-blaze-500"
                          : "border-white/20",
                      )}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
              <div className="">
                <span className="text-xs font-semibold uppercase tracking-wide text-steel-400">
                  Right
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {BASE_COLORS.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setRightBaseColor(c)}
                      className={cn(
                        "h-10 w-10 rounded-full border-2 transition-transform hover:scale-110 sm:h-8 sm:w-8",
                        rightBaseColor.name === c.name
                          ? "border-blaze-500"
                          : "border-white/20",
                      )}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 ">
              {BASE_COLORS.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setBaseColor(c)}
                  className={cn(
                    "h-10 w-10 rounded-full border-2 transition-transform hover:scale-110 sm:h-8 sm:w-8  cursor-pointer",
                    baseColor.name === c.name
                      ? "border-black ring-2 ring-white scale-105"
                      : "border-white/20",
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}

          {showLowerColorSelector && (
            <div className="mt-5 rounded-xl border border-white/10 bg-ink-900/60 p-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-steel-400">
                Lower Color
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {BASE_COLORS.map((c) => (
                  <button
                    key={`lower-${c.name}`}
                    type="button"
                    onClick={() => {
                      setLowerColor(c);
                      sessionStorage.setItem("lowerColor", c.name);
                    }}
                    className={cn(
                      "h-10 w-10 rounded-full border-2 transition-transform hover:scale-110 sm:h-8 sm:w-8 cursor-pointer",
                      lowerColor.name === c.name
                        ? "border-black ring-2 ring-white scale-105"
                        : "border-white/20",
                    )}
                    style={{ backgroundColor: c.hex }}
                    aria-label={`Select lower color ${c.name}`}
                  />
                ))}
              </div>
            </div>
          )}
        </CollapsibleSection>
      </div>
    </div>
  );
}
