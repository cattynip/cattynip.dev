import type { RGBColour } from "types/canvas/colour";
import type { ShapeModes } from "types/interactions/shape";

export interface LayoutOptions {
  styleOptions: LayoutStyleOptions;
}

export interface LayoutStyleOptions {
  xPadding: number;
  yMargin: number;
  gaps: number;
  foreground: RGBColour;
  background: RGBColour;
  awesome: RGBColour[];
}

export type LayoutModes = ShapeModes | "PRINT" | "FULLSCREEN";

export interface ModeOptions {
  shortcut: string;
  description: string;
  status: boolean;
}

export type LayoutModesStatus<T> = {
  [K in T]: ModeOptions;
};
