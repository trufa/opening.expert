import { Square } from "chess.js";

export type GameBySquares = [Square, Square][];

export const operaGame: GameBySquares = [
  ["e2", "e4"],
  ["e7", "e5"],
  ["g1", "f3"],
  ["d7", "d6"],
  ["d2", "d4"],
  ["c8", "g4"],
  ["d4", "e5"],
  ["g4", "f3"],
  ["d1", "f3"],
  ["d6", "e5"],
  ["f1", "c4"],
  ["g8", "f6"],
  ["f3", "b3"],
  ["d8", "e7"],
  ["b1", "c3"],
  ["c7", "c6"],
  ["c1", "g5"],
  ["b7", "b5"],
  ["c3", "b5"],
  ["c6", "b5"],
  ["c4", "b5"],
  ["b8", "d7"],
  ["e1", "c1"],
  ["a8", "d8"],
  ["d1", "d7"],
  ["d8", "d7"],
  ["h1", "d1"],
  ["e7", "e6"],
  ["b5", "d7"],
  ["f6", "d7"],
  ["b3", "b8"],
  ["d7", "b8"],
  ["d1", "d8"],
];

const shortPathToPromotion: GameBySquares = [
  ["e2", "e4"],
  ["d7", "d5"],
  ["e4", "d5"],
  ["c7", "c6"],
  ["d5", "c6"],
  ["e7", "e6"],
  ["c6", "b7"],
  ["e6", "e5"],
  ["b7", "a8"],
];

const shortExample: GameBySquares = [
  ["e2", "e4"],
  ["e7", "e5"],
  ["g1", "f3"],
  ["b8", "c6"],
  ["f1", "b5"],
  ["a7", "a6"],
];

const shortExampleWithEmptySecondPly: GameBySquares = [
  ["e2", "e4"],
  ["e7", "e5"],
  ["g1", "f3"],
  ["b8", "c6"],
  ["f1", "c4"],
];

type GameNames =
  | "operaGame"
  | "shortPathToPromotion"
  | "shortExample"
  | "shortExampleWithEmptySecondPly";

const gamesBySquares: Record<GameNames, GameBySquares> = {
  operaGame,
  shortPathToPromotion,
  shortExample,
  shortExampleWithEmptySecondPly,
};

export default gamesBySquares;
