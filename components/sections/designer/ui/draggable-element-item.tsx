"use client";

import { useRef, useState } from "react";
import { GripVertical, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DesignElement } from "../types";

export function DraggableElementItem({
  element,
  index,
  isSelected,
  isDragOver,
  onSelect,
  onDelete,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  onTouchDragOver,
  onTouchDrop,
}: {
  element: DesignElement;
  index: number;
  isSelected: boolean;
  isDragOver: boolean;
  onSelect: () => void;
  onDelete: (e: React.MouseEvent) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onTouchDragOver: (index: number) => void;
  onTouchDrop: (fromIndex: number, toIndex: number) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const touchDragRef = useRef<{ from: number; to: number } | null>(null);

  const finishTouchDrag = (commit: boolean) => {
    const drag = touchDragRef.current;
    if (drag) onTouchDrop(drag.from, commit ? drag.to : drag.from);
    touchDragRef.current = null;
    setIsDragging(false);
  };

  return (
    <li
      data-layer-index={index}
      className={cn(
        "flex cursor-move touch-none select-none items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
        isSelected
          ? "border border-blaze-500 bg-blaze-500/20"
          : "hover:bg-white/5",
        isDragging && "scale-95 opacity-30",
        isDragOver &&
          !isDragging &&
          "scale-105 border-2 border-dashed border-blue-500 bg-blue-500/10",
      )}
      onClick={onSelect}
      onTouchStart={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        touchDragRef.current = { from: index, to: index };
        setIsDragging(true);
      }}
      onTouchMove={(e) => {
        const drag = touchDragRef.current;
        if (!drag) return;

        const touch = e.touches[0];
        const target = document
          .elementFromPoint(touch.clientX, touch.clientY)
          ?.closest<HTMLElement>("[data-layer-index]");
        const targetIndex = Number(target?.dataset.layerIndex);
        if (!target || !Number.isInteger(targetIndex)) return;

        drag.to = targetIndex;
        onTouchDragOver(targetIndex);
      }}
      onTouchEnd={() => finishTouchDrag(true)}
      onTouchCancel={() => finishTouchDrag(false)}
      draggable
      onDragStart={(e) => {
        setIsDragging(true);
        onDragStart(e, index);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(e, index);
      }}
      onDragEnd={(e) => {
        setIsDragging(false);
        onDragEnd(e);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(e, index);
      }}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <GripVertical size={16} className="shrink-0 text-steel-400 " />
        <span className="truncate text-white">
          {element.type === "image"
            ? "🖼️ Image"
            : `📝 ${element.text?.slice(0, 12) || "Text"}`}
        </span>
        <span className="ml-auto mr-2 shrink-0 text-xs text-steel-400">
          #{index + 1}
        </span>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(e);
        }}
        className="shrink-0 text-steel-400 hover:text-blaze-500"
      >
        <Trash2 size={16} className="cursor-pointer" />
      </button>
    </li>
  );
}
