import { Color, Square } from "chess.js";

type GetPixelLocationBySquare = [number, number];

export const getOffsetBySquare = (
  boardSizePx: number,
  square: Square,
  orientation: Color
): GetPixelLocationBySquare => {
  const squareSize = boardSizePx / 8;
  const file = square.charAt(0);
  let fileMultiplier = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
  }[file];
  let rankMultiplier = 8 - parseInt(square.charAt(1), 10);
  if (orientation === "b") {
    fileMultiplier = 7 - fileMultiplier!;
    rankMultiplier! = 7 - rankMultiplier!;
  }
  const x = fileMultiplier! * squareSize + squareSize / 2;
  const y = rankMultiplier! * squareSize + squareSize / 2;
  return [x, y];
};
