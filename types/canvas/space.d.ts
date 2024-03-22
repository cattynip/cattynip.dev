export type HorizontalDirection = "LEFT" | "RIGHT";
export type VerticalDirection = "TOP" | "BOTTOM";
export type Direction = HorizontalDirection | VerticalDirection;
export type Point = "BEGINNING" | "MIDDLE" | "LAST";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Layout extends Size, Position {}
