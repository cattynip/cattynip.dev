import type { RGBColour } from "types/canvas/colour";

export function convertRGBToString(rgbColour: RGBColour): string {
  return `rgb(${rgbColour.r}, ${rgbColour.g}, ${rgbColour.b})`;
}
