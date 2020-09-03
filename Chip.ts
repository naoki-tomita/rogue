export class ChipFactory {
  private constructor(readonly image: HTMLImageElement, readonly basisSidePixcels: number) {}
  private static async createImage(url: string) {
    return new Promise<HTMLImageElement>(ok => {
      const image = new Image();
      image.src = url;
      image.addEventListener("load", () => (console.log("load"), ok(image)));
    });
  }

  static async create(url: string, basisSidePixcels: number) {
    const image = await ChipFactory.createImage(url);
    const instance = new ChipFactory(image, basisSidePixcels);
    return instance;
  }

  getChip(x: number, y: number, width: number, height: number) {
    return new Chip(this.image, x, y, width, height);
  }
}

export class Chip {
  constructor(
    readonly image: HTMLImageElement,
    readonly x: number,
    readonly y: number,
    readonly width: number,
    readonly height: number,
  ) {}
}

export class ChipSet {
  constructor(readonly sets: Chip[][]) {}
}

export class AutoTile extends ChipSet {}

declare global {
  interface CanvasRenderingContext2D {
    drawChip(chip: Chip, x: number, y: number, basisSidePixel: number): void;
  }
}

CanvasRenderingContext2D.prototype.drawChip = function(chip, x, y, basisSidePixel) {
  this.drawImage(
    chip.image,
    chip.x, chip.y,
    chip.width, chip.height,
    Math.floor(x * basisSidePixel), Math.floor(y * basisSidePixel),
    chip.width, chip.height
  );
}
