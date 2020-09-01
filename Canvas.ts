export class ChipFactory {
  image: HTMLImageElement;
  private constructor(private sidePixel: number, private width: number, private height: number) {
    this.image = new Image();
  }
  private async init(url: string) {
    return new Promise(ok => {
      this.image.src = url;
      this.image.addEventListener("load", () => (console.log("load"), ok()));
    });
  }

  static async create(url: string, sidePixel: number, width: number, height: number) {
    const instance = new ChipFactory(sidePixel, width, height);
    await instance.init(url);
    return instance;
  }

  getChip(x: number, y: number) {
    return new Chip(this.image, x, y, this.sidePixel);
  }

  getChips(x?: number, y?: number, width?: number, height?: number) {
    return Array((height ?? this.height) - (y ?? 0)).fill(null).map((_, j) =>
      Array((width ?? this.width) - (x ?? 0)).fill(null).map((_, i) => this.getChip(i + (x ?? 0), j + (y ?? 0)))
    );
  }
}

export class Chip {
  get sx() { return this.x * this.sidePixel; }
  get sy() { return this.y * this.sidePixel; }
  constructor(public image: HTMLImageElement, public x: number, public y: number, public sidePixel: number) {}
}

export class Canvas {
  constructor(private context: CanvasRenderingContext2D) {}
  drawChip(chip: Chip, x: number, y: number) {
    this.context.drawImage(
      chip.image,
      chip.sx, chip.sy,
      chip.sidePixel, chip.sidePixel,
      Math.floor(x * chip.sidePixel), Math.floor(y * chip.sidePixel),
      chip.sidePixel, chip.sidePixel
    );
  }
}
