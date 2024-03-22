import Shape from "./shape";
import { getLayoutSpace, getShapeSpace } from "@core/utils/layout";
import { convertRGBToString } from "@core/utils/colour";
import type { Space, Size } from "types/canvas/space";
import type {
  LayoutModes,
  LayoutModesStatus,
  LayoutOptions,
  LayoutStyleOptions
} from "types/interactions/layout";
import type {
  ShapeConstructingOptions,
  ShapeModes,
  ShapeType
} from "types/interactions/shape";

class Layout {
  private canvas: HTMLCanvasElement;
  private pen: CanvasRenderingContext2D;

  private layout: Space;
  private windowSize: Size;

  private helperStatus: LayoutModesStatus<LayoutModes>;
  private styleOptions: LayoutStyleOptions;
  private shapes: Shape[];

  constructor(layoutOptions: LayoutOptions) {
    this.canvas = document.querySelector("#fivepixels") as HTMLCanvasElement;
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

    this.styleOptions = layoutOptions.styleOptions;
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
        awesomeColours: this.styleOptions.awesome,
        layout: getShapeSpace({
          shapeIndex,
          gaps: this.styleOptions.gaps,
          layoutSpace: this.layout
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

    this.layout = getLayoutSpace({
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

    if (pressedKey === this.helperStatus.AWESOME.shortcut) {
      this.helperStatus.AWESOME.status = !this.helperStatus.AWESOME.status;
      this.toggleShapeModes("AWESOME");

      return;
    }

    if (pressedKey === this.helperStatus.GRID.shortcut) {
      this.helperStatus.GRID.status = !this.helperStatus.GRID.status;
      this.toggleShapeModes("GRID");

      return;
    }

    if (pressedKey === this.helperStatus.NUMBERING.shortcut) {
      this.helperStatus.NUMBERING.status = !this.helperStatus.NUMBERING.status;
      this.toggleShapeModes("NUMBERING");

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

  private commandToShapes(callback: (currentShape: Shape) => void) {
    this.shapes.map(callback);
  }

  private toggleShapeModes(toggledMode: ShapeModes) {
    this.commandToShapes(currentShape => currentShape.toggleMode(toggledMode));
  }
}

export default Layout;
