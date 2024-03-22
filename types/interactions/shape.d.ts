import type { RGBColour } from "types/canvas/colour";
import type {
  Position,
  HorizontalDirection,
  Layout,
  VerticalDirection
} from "types/canvas/space";

export type ShapeType = "TRIANGLE" | "SQUARE" | "CIRCLE";
export type ShapeHeight = "LOW" | "HIGH";

export interface ShapeOptions {
  shapeType: ShapeType;
  index: number;
  size: number;
  colour: RGBColour;
  location: Position;
  constructingOptions: ShapeConstructingOptions;
}

export interface ShapeConstructingOptions {
  baseAt: VerticalDirection;
  pillarAt: HorizontalDirection | "MIDDLE";
  height: ShapeHeight;
}
