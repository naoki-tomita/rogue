import { ChipFactory, Canvas } from "./Canvas";
import B from "./static/B.png";
import A1 from "./static/A1.png";
import A2 from "./static/A2.png";

async function main() {
  const context = (document.getElementById("app") as HTMLCanvasElement).getContext("2d")!;
  const MAPS = await Promise.all([
    ChipFactory.create(B, 32, 9, 16),
    ChipFactory.create(A1, 32, 16, 9),
    ChipFactory.create(A2, 32, 16, 9),
  ]);
  const canvas = new Canvas(context);
  MAPS.forEach(map => {
    const chips = map.getChips();
    chips.forEach((it, j) =>
      it.forEach((chip, i) => canvas.drawChip(chip, i, j))
    )
  });
}

main();
