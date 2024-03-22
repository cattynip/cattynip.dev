import type {
  Direction,
  HorizontalDirection,
  Layout
} from "types/canvas/space";

interface GetFivePixelsLayoutReceive {
  width: number;
  height: number;
  xPadding: number;
  yMargin: number;
  gaps: number;
}

export function getFivePixelsLayout({
  width,
  height,
  xPadding,
  yMargin,
  gaps
}: GetFivePixelsLayoutReceive): Layout {
  const isVertialPlacement =
    ((height - yMargin * 2 - gaps * 2) / 3) * 2 + gaps < width;

  const shapeSize = isVertialPlacement
    ? (height - yMargin * 2 - gaps * 2) / 3
    : (width - xPadding * 2 - gaps) / 2;

  const layoutWidth = shapeSize * 2 + gaps;
  const layoutHeight = shapeSize * 3 + gaps * 2;

  return {
    x: isVertialPlacement ? width / 2 - layoutWidth / 2 : xPadding,
    y: isVertialPlacement ? yMargin : height / 2 - layoutHeight / 2,
    width: layoutWidth,
    height: layoutHeight
  };
}

interface GetShapeLayoutReceive {
  shapeIndex: number;
  gaps: number;
  fivePixelsLayout: Layout;
}

export function getShapeLayout({
  shapeIndex,
  gaps,
  fivePixelsLayout
}: GetShapeLayoutReceive): Layout {
  const shapeSize = (fivePixelsLayout.width - gaps) / 2;
  const column = shapeIndex % 2 === 1 ? 1 : 2;
  const row = Math.ceil(shapeIndex / 2);

  return {
    x: fivePixelsLayout.x + (column - 1) * (shapeSize + gaps),
    y: fivePixelsLayout.y + (row - 1) * (shapeSize + gaps),
    width: shapeSize,
    height: shapeSize
  };
}

export const DirectionAngle: { [K in Direction]: number } = {
  TOP: 0,
  LEFT: 1 / 2,
  BOTTOM: 2 / 2,
  RIGHT: 3 / 2
};

export const HorizontalDirectionX: {
  [K in HorizontalDirection | "MIDDLE"]: number;
} = {
  LEFT: 1,
  MIDDLE: 0,
  RIGHT: -1
};
