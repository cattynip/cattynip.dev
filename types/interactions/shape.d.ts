import type Layout from "@core/interactions/layout";
import type { RGBColour } from "types/canvas/colour";
import type {
  Position,
  HorizontalDirection,
  VerticalDirection,
  Space
} from "types/canvas/space";

export type ShapeType = "TRIANGLE" | "SQUARE" | "CIRCLE";
export type ShapeHeight = "LOW" | "HIGH";
export type ShapeModes = "GRID" | "AWESOME" | "NUMBERING";

export interface ShapeOptions {
  shapeType: ShapeType;
  index: number;
  colour: RGBColour;
  awesomeColours: RGBColour[];
  layout: Space;
  constructingOptions: ShapeConstructingOptions;
}

export interface ShapeConstructingOptions {
  baseAt: VerticalDirection;
  pillarAt: HorizontalDirection | "MIDDLE";
  height: ShapeHeight;
}
