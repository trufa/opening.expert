import { Square } from "chess.js";

interface GetPixelLocationBySquare {
  x: number;
  y: number;
}

export const getOffsetBySquare = (
  boardSizePx: number,
  square: Square
): GetPixelLocationBySquare => {
  const squareSize = boardSizePx / 8;
  const file = square.charAt(0);
  const fileMultiplier = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
  }[file];
  const rankMultiplier = 8 - parseInt(square.charAt(1), 10);
  const x = fileMultiplier! * squareSize + squareSize / 2;
  const y = rankMultiplier! * squareSize + squareSize / 2;
  return { x, y };
};
