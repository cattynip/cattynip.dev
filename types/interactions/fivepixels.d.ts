import type { RGBColour } from "types/canvas/colour";

export interface FivePixelsOptions {
  styleOptions: FivePixelsStyleOptions;
}

export interface FivePixelsStyleOptions {
  xPadding: number;
  yMargin: number;
  gaps: number;
  foreground: RGBColour;
  background: RGBColour;
  awesome: RGBColour[];
}

export interface HelperOptions {
  shortcut: string;
  description: string;
  status: boolean;
}

export type FivePixelsHelperStatus<T> = {
  [K in T]: HelperOptions;
};
