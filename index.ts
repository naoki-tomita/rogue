import { ChipFactory, Chip } from "./Chip";
import B from "./static/B.png";
import A1 from "./static/A1.png";
import A2 from "./static/A2.png";

async function main() {
  const [CHIP_B, CHIP_A1, CHIP_A2] = await Promise.all([
    ChipFactory.create(B, 32),
    ChipFactory.create(A1, 32),
    ChipFactory.create(A2, 32),
  ]);

  const canvas = document.getElementById("app") as HTMLCanvasElement;
  const context = canvas.getContext("2d")!;
  const app = new App(canvas, context, CHIP_B);
}

class App {
  constructor(
    readonly canvas: HTMLCanvasElement,
    readonly context: CanvasRenderingContext2D,
    readonly factory: ChipFactory
  ) {
    this.initEvents();
  }

  initEvents() {
    this.initDragEvents();
  }

  clickedPosition: { x: number, y: number } | null = null;
  currentPosition: { x: number, y: number } | null = null;
  initDragEvents() {
    this.canvas.addEventListener("mousedown", ({ x, y }) =>
      (this.clickedPosition = this.currentPosition = { x, y }));
    this.canvas.addEventListener("mouseup", () =>
      (this.clickedPosition = this.currentPosition = null));
    this.canvas.addEventListener("mousemove", ({ x, y }) =>
      this.clickedPosition != null && (this.currentPosition = { x, y }));
  }
  get dx() {
    return (this.clickedPosition && this.currentPosition) &&
      this.clickedPosition.x - this.currentPosition.x;
  }
  get dy() {
    return (this.clickedPosition && this.currentPosition) &&
      this.clickedPosition.y - this.currentPosition.y;
  }

}



main();
