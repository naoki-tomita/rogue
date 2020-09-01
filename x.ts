export class ChipFactory {
  private constructor(private image: HTMLImageElement, private sidePixel: number, private width: number, private height: number) {
    this.image = new Image();
  }
  private static async createImage(url: string) {
    return new Promise<HTMLImageElement>(ok => {
      const image = new Image();
      image.src = url;
      image.addEventListener("load", () => (console.log("load"), ok(image)));
    });
  }

  static async create(url: string, sidePixel: number) {
    const image = await ChipFactory.createImage(url);
    const width = image.naturalWidth / sidePixel;
    const height = image.naturalHeight / sidePixel;
    const instance = new ChipFactory(image, sidePixel, width, height);
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
  constructor(readonly image: HTMLImageElement, readonly x: number, readonly y: number, readonly sidePixel: number) {}
}

export class ChipSet {
  constructor(readonly sets: Chip[]) {}
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
