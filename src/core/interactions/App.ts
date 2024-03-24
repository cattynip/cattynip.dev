import type Marquee from "./marquee";
import Mouse from "./mouse";
import type Shape from "./shape";

class App {
  private mouse: Mouse;
  private shapes: Shape[];
  private marquees: Marquee[];

  constructor() {
    this.mouse = Mouse;
    this.shapes = [];
    this.marquees = [];
  }
}

export default App;
