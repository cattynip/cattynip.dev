import Shape from "./shape";
import { getFivePixelsLayout, getShapeLayout } from "@core/utils/layout";
import { convertRGBToString } from "@core/utils/colour";
import type { Layout, Size } from "types/canvas/space";
import type {
  FivePixelsHelperStatus,
  FivePixelsOptions,
  FivePixelsStyleOptions
} from "types/interactions/fivepixels";
import type {
  ShapeConstructingOptions,
  ShapeType
} from "types/interactions/shape";

enum FivePixelsHelperShortcuts {
  AWESOME = "AWESOME",
  GRID = "GRID",
  NUMBERING = "NUMBERING",
  PRINT = "PRINT",
  FULLSCREEN = "FULLSCREEN"
}

class FivePixels {
  private canvas: HTMLCanvasElement;
  private pen: CanvasRenderingContext2D;

  private layout: Layout;
  private windowSize: Size;

  private helperStatus: FivePixelsHelperStatus<FivePixelsHelperShortcuts>;
  private styleOptions: FivePixelsStyleOptions;
  private shapes: Shape[];

  constructor(fivePixelsOptions: FivePixelsOptions) {
    this.canvas = document.querySelector("#fivepixels")!;
    this.pen = this.canvas.getContext("2d")!;
    this.layout = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this.windowSize = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    this.helperStatus = {
      AWESOME: {
        shortcut: "a",
        description: "something magicall would happen...",
        status: false
      },
      GRID: {
        shortcut: "g",
        description: "toggle GRID",
        status: false
      },
      NUMBERING: {
        shortcut: "n",
        description: "toggle NUMBERINGs",
        status: false
      },
      FULLSCREEN: {
        shortcut: "f",
        description: "toggle Fullscreen",
        status: false
      },
      PRINT: {
        shortcut: "p",
        description: "Print",
        status: false
      }
    };

    this.styleOptions = fivePixelsOptions.styleOptions;
    this.shapes = [];

    this.init();
  }

  private init() {
    this.attachEventListeners();
    this.adjustStyles();
    this.configureCanvas();
  }

  public addShape(
    shapeIndex: number,
    shapeType: ShapeType,
    constructingOptions: ShapeConstructingOptions
  ) {
    this.shapes.push(
      new Shape(this.pen, {
        shapeType,
        index: shapeIndex,
        colour: this.styleOptions.foreground,
        size: (this.layout.width - this.styleOptions.gaps) / 2,
        location: getShapeLayout({
          shapeIndex,
          gaps: this.styleOptions.gaps,
          fivePixelsLayout: this.layout
        }),
        constructingOptions
      })
    );
  }

  public animate() {
    this.pen.clearRect(0, 0, this.windowSize.width, this.windowSize.height);

    this.shapes[0].setStyle();

    this.shapes.map(currentShape => currentShape.draw());

    window.requestAnimationFrame(this.animate.bind(this));
  }

  private attachEventListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
    window.addEventListener("keydown", this.onKeyPressed.bind(this));
    window.addEventListener("click", this.onClick.bind(this));
  }

  private adjustStyles() {
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0px";
    this.onResize();
  }

  private configureCanvas() {
    this.canvas.style.background = convertRGBToString(
      this.styleOptions.background
    );

    this.pen.strokeStyle = convertRGBToString(this.styleOptions.foreground);
    this.pen.fillStyle = convertRGBToString(this.styleOptions.foreground);
  }

  private onResize() {
    this.windowSize = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    this.layout = getFivePixelsLayout({
      ...this.windowSize,
      ...this.styleOptions
    });

    this.canvas.style.width = `${this.windowSize.width}px`;
    this.canvas.style.height = `${this.windowSize.height}px`;
    this.canvas.width = this.windowSize.width * 4;
    this.canvas.height = this.windowSize.height * 4;

    this.pen.scale(4, 4);
  }

  private async onKeyPressed(event: KeyboardEvent) {
    const pressedKey = event.key;
    const isPressedKeyMatchedUp = Object.keys(FivePixelsHelperShortcuts).find(
      currentShortcut =>
        this.helperStatus[
          currentShortcut as keyof FivePixelsHelperStatus<FivePixelsHelperShortcuts>
        ].shortcut === pressedKey
    );

    if (!isPressedKeyMatchedUp) return;

    if (pressedKey === this.helperStatus.AWESOME.shortcut) {
      this.helperStatus.AWESOME.status = !this.helperStatus.AWESOME.status;
      return;
    }

    if (pressedKey === this.helperStatus.GRID.shortcut) {
      this.helperStatus.GRID.status = !this.helperStatus.GRID.status;
      return;
    }

    if (pressedKey === this.helperStatus.NUMBERING.shortcut) {
      this.helperStatus.NUMBERING.status = !this.helperStatus.NUMBERING.status;
      return;
    }

    if (pressedKey === this.helperStatus.FULLSCREEN.shortcut) {
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
          this.helperStatus.FULLSCREEN.status = true;
        } else if (document.exitFullscreen) {
          await document.exitFullscreen();
          this.helperStatus.FULLSCREEN.status = false;
        }
      } catch (error) {
        console.error("FULLSCREEN TOGGLING ERROR");
      }

      return;
    }

    if (pressedKey === this.helperStatus.PRINT.shortcut) {
      window.print();
      return;
    }
  }

  private onClick() {}
}

export default FivePixels;
