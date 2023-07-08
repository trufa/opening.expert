import { PieceSymbol } from "chess.js";

export type PromotionPieces = Exclude<PieceSymbol, "p" | "k">;

export type PGN = string;
