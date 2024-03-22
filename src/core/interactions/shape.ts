import { convertRGBToString } from "@core/utils/colour";
import type { RGBColour } from "types/canvas/colour";
import type { Position } from "types/canvas/space";
import type {
  ShapeConstructingOptions,
  ShapeOptions,
  ShapeType
} from "types/interactions/shape";

class Shape {
  private shapeType: ShapeType;
  private index: number;
  private size: number;
  private colour: RGBColour;
  private originPos: Position;

  private constructingOptions: ShapeConstructingOptions;

  private pen: CanvasRenderingContext2D;

  constructor(pen: CanvasRenderingContext2D, shapeOptions: ShapeOptions) {
    this.shapeType = shapeOptions.shapeType;
    this.index = shapeOptions.index;
    this.size = shapeOptions.size;
    this.colour = shapeOptions.colour;
    this.originPos = {
      x: shapeOptions.location.x + this.size / 2,
      y: shapeOptions.location.y + this.size / 2
    };
    console.log(this.originPos);

    this.constructingOptions = shapeOptions.constructingOptions;

    this.pen = pen;
  }

  public setStyle() {
    this.pen.fillStyle = convertRGBToString(this.colour);
  }

  public draw() {
    this.drawGrid();
    // this.drawShape();
  }

  private drawShape() {
    const originX = this.originPos.x;
    const originY = this.originPos.y;

    this.pen.fillStyle = convertRGBToString(this.colour);

    this.pen.beginPath();

    this.pen.moveTo(originX - this.size / 2, originY - this.size / 2);
    this.pen.lineTo(originX + this.size, originY + this.size);

    this.pen.stroke();

    this.pen.closePath();
  }

  private drawGrid() {
    this.pen.strokeStyle = "rgb(255, 0, 0)";
    this.pen.fillStyle = "rgb(255, 0, 0)";

    this.pen.beginPath();
    this.pen.moveTo(
      this.originPos.x + this.size / 2,
      this.originPos.y + this.size / 2
    );
    this.pen.lineTo(
      this.originPos.x + this.size / 2,
      this.originPos.y - this.size / 2
    );
    this.pen.lineTo(
      this.originPos.x - this.size / 2,
      this.originPos.y - this.size / 2
    );
    this.pen.lineTo(
      this.originPos.x - this.size / 2,
      this.originPos.y + this.size / 2
    );
    this.pen.lineTo(
      this.originPos.x + this.size / 2,
      this.originPos.y + this.size / 2
    );
    this.pen.stroke();
    this.pen.closePath();

    this.pen.beginPath();
    this.pen.arc(this.originPos.x, this.originPos.y, 1, 0, 2 * Math.PI);
    this.pen.fill();
    this.pen.closePath();
  }
}

export default Shape;
