import type { Direction, HorizontalDirection, Space } from "types/canvas/space";

interface GetLayoutSpaceReceive {
  width: number;
  height: number;
  xPadding: number;
  yMargin: number;
  gaps: number;
}

export function getLayoutSpace({
  width,
  height,
  xPadding,
  yMargin,
  gaps
}: GetLayoutSpaceReceive): Space {
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

interface GetShapeSpaceReceive {
  shapeIndex: number;
  gaps: number;
  layoutSpace: Space;
}

export function getShapeSpace({
  shapeIndex,
  gaps,
  layoutSpace: fivePixelsLayout
}: GetShapeSpaceReceive): Space {
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
