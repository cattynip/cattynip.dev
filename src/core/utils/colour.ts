import type { RGBColour } from "types/canvas/colour";

export function convertRGBToString(rgbColour: RGBColour): string {
  return `rgb(${rgbColour.r}, ${rgbColour.g}, ${rgbColour.b})`;
}

export function getRandomColour(): RGBColour {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return { r, g, b };
}
