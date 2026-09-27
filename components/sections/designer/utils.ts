export function genId() {
  return Math.random().toString(36).slice(2, 9);
}

export function getCleanFontName(fontName: string): string {
  const fontMap: Record<string, string> = {
    Impact: "Impact",
    "College Block": "Limelight",
    "American Captain": "Oswald",
    "Corporate Gothic": "Playfair Display",
    "Playlist Script": "Dancing Script",
  };
  return fontMap[fontName] || "Arial";
}

export function readImageFile(
  file: File,
  onLoad: (dataUrl: string, width: number, height: number) => void,
) {
  if (!file.type.startsWith("image/")) return;
  const reader = new FileReader();

  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      onLoad(reader.result as string, img.width, img.height);
    };
    img.src = reader.result as string;
  };

  reader.onerror = () =>
    alert("Failed to read image. Please try another file.");

  reader.readAsDataURL(file);
}
