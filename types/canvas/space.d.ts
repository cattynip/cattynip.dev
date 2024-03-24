export type Direction = HorizontalDirection | VerticalDirection;
export type HorizontalDirection = "LEFT" | "RIGHT";
export type VerticalDirection = "TOP" | "BOTTOM";

export type Point = "BEGINNING" | "MIDDLE" | "LAST";
export type Axis = "x" | "y";

export type Position = {
  [K in Axis]: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Sides<T> = {
  [K in Direction]: T;
};

export interface Space extends Size, Position {}
