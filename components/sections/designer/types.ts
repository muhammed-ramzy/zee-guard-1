export type ElementSide = "full" | "left" | "right";

export interface DesignElement {
  id: string;
  side: ElementSide;
  type: "image" | "text";
  x: number;
  y: number;
  rotation: number;
  src?: string;
  width?: number;
  height?: number;
  naturalWidth?: number;
  naturalHeight?: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
}

export type DragMode =
  | "move"
  | "resize"
  | "rotate"
  | "resize-top"
  | "resize-bottom"
  | "resize-left"
  | "resize-right";

export type ResizeHandle =
  | "nw"
  | "ne"
  | "sw"
  | "se"
  | "n"
  | "s"
  | "e"
  | "w";
