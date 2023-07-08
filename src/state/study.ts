import { create } from "zustand";
import { Chess, Color } from "chess.js";
import { v4 as uuidv4 } from "uuid";
import { Dests, FEN, Key } from "chessground/types";
import { devtools } from "zustand/middleware";
import useBoardStore from "./board";
import { PGN, PromotionPieces } from "~/types";

type Index = number;

interface MoveData {
  fen: FEN;
  dests: Dests;
}

type MoveDataByIndex = Map<Index, MoveData>;

interface StudyState {
  id: string;
  parent: string | null;
  chess: Chess;
  moveDataByIndex: MoveDataByIndex;
  branches: Map<Index, StudyState[]>;
  currentMoveIndex: Index;
  setCurrentMoveIndex: (index: Index) => void;
  turn: () => Color;
  pgn: () => PGN;
  moveLength: () => number;
  currentFen: () => FEN;
  move: (orig: Key, dest: Key) => void;
  loadPGN: (pgn: PGN) => void;
}

const toDests = (fen: FEN): Dests => {
  const chess = new Chess(fen);
  const dests = new Map();
  chess
    .moves({
      verbose: true,
    })
    .forEach((m) => {
      dests.set(
        m.from,
        dests.get(m.from) ? dests.get(m.from).concat(m.to) : [m.to]
      );
    });
  return dests;
};

const promotionCalcChess = new Chess();
const isPromotion = (fen: FEN, orig: Key, dest: Key): boolean => {
  promotionCalcChess.load(fen);
  return promotionCalcChess
    .move({ from: orig, to: dest, promotion: "q" })
    .flags.includes("p");
};

const useStudyStore = create<StudyState>()(
  devtools((set, get) => {
    const chess = new Chess();
    const initialFen = chess.fen();
    return {
      id: uuidv4(),
      parent: null,
      chess,
      moveDataByIndex: new Map().set(0, {
        fen: initialFen,
        dests: toDests(initialFen),
      }),
      branches: new Map(),
      currentMoveIndex: 0,
      moveLength: () => get().moveDataByIndex.size,
      currentFen: () =>
        get().moveDataByIndex.get(get().currentMoveIndex)?.fen ?? initialFen,
      setCurrentMoveIndex: (index: number) => {
        if (index < 0) {
          index = 0;
        }
        const moveLength = get().moveLength();
        if (index > moveLength - 1) {
          index = moveLength - 1;
        }
        set(() => ({ currentMoveIndex: index }));
      },
      turn: () => get().chess.turn(),
      pgn: () => get().chess.pgn(),
      move: (orig, dest) => {
        const todo = (promotion: PromotionPieces | null) => {
          const move = get().chess.move({
            from: orig,
            to: dest,
            ...(promotion && { promotion }),
          });
          console.log(`["${move.from}", "${move.to}"]`);
          set((state) => {
            const nextIndex = state.currentMoveIndex + 1;
            return {
              currentMoveIndex: nextIndex,
              moveDataByIndex: state.moveDataByIndex.set(nextIndex, {
                fen: move.after,
                dests: toDests(move.after),
              }),
            };
          });
        };
        if (isPromotion(get().chess.fen(), orig, dest)) {
          useBoardStore.getState().toggleModal();
          const unsub = useBoardStore.subscribe(
            (state) => state.promotionPiece,
            (promotion) => {
              if (promotion) {
                todo(promotion);
                unsub();
                useBoardStore.getState().setPromotionPiece(null);
              }
            }
          );
        } else {
          todo(null);
        }
      },
      loadPGN: (pgn) => {
        const chess = new Chess();
        chess.loadPgn(pgn);
        const moves = pgn.split(" ");
        const newMoveDataByIndex: MoveDataByIndex = new Map().set(0, {
          fen: initialFen,
          dests: toDests(initialFen),
        });
        chess.history({ verbose: true }).map((move, i) => {
          console.log("setting", i + 1, move.after);
          newMoveDataByIndex.set(i + 1, {
            fen: move.after,
            dests: toDests(move.after),
          });
        });
        set(() => ({
          chess,
          moveDataByIndex: newMoveDataByIndex,
          currentMoveIndex: 0,
        }));
      },
    };
  })
);

// @ts-ignore
if (typeof window !== "undefined" && window.Cypress) {
  // @ts-ignore
  window.useStudyStore = useStudyStore;
}

export default useStudyStore;
