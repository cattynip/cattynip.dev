import FivePixels from "./interactions/fivepixels";

console.log("If you want to inspect my code, go to the GitHub repository.");
console.log("My GitHub: https://github.com/fivepixels");
console.log("Source Code: https://github.com/fivepixels/fivepixels.dev");

window.onload = () => {
  const fivepixels = new FivePixels({
    styleOptions: {
      xPadding: 30,
      yMargin: 120,
      gaps: 20,
      foreground: { r: 255, g: 255, b: 255 },
      background: { r: 25, g: 25, b: 25 },
      awesome: []
    }
  });

  fivepixels.addShape(1, "TRIANGLE", {
    baseAt: "BOTTOM",
    pillarAt: "RIGHT",
    height: "HIGH"
  });

  fivepixels.addShape(3, "SQUARE", {
    baseAt: "BOTTOM",
    pillarAt: "MIDDLE",
    height: "HIGH"
  });

  fivepixels.addShape(4, "CIRCLE", {
    baseAt: "BOTTOM",
    pillarAt: "LEFT",
    height: "HIGH"
  });

  fivepixels.addShape(5, "CIRCLE", {
    baseAt: "TOP",
    pillarAt: "LEFT",
    height: "HIGH"
  });

  fivepixels.addShape(6, "TRIANGLE", {
    baseAt: "TOP",
    pillarAt: "RIGHT",
    height: "HIGH"
  });

  fivepixels.animate();
};
