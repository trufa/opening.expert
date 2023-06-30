import { create } from "zustand";
import { Chess, Move, PieceSymbol } from "chess.js";
import { v4 as uuidv4 } from "uuid";
import { Dests, FEN, Key } from "chessground/types";
import { devtools } from "zustand/middleware";
import useBoardStore from "./board";
import { PromotionPieces } from "~/types";

type Index = number;

interface MoveData {
  fen: FEN;
  dests: Dests;
}

interface StudyState {
  id: string;
  parent: string | null;
  chess: Chess;
  moveDataByIndex: Map<number, MoveData>;
  branches: Map<Index, StudyState[]>;
  currentMoveIndex: Index;
  setMoveDataByIndex: (index: Index, moveData: MoveData) => void;
  setCurrentMoveIndex: (index: Index) => void;
  move: (orig: Key, dest: Key) => void;
  computed: {
    moveLength: () => number;
  };
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

const promotionChess = new Chess();
const isPromotion = (fen: FEN, orig: Key, dest: Key): boolean => {
  promotionChess.load(fen);
  return promotionChess
    .move({ from: orig, to: dest, promotion: "q" })
    .flags.includes("p");
};

const useStudyStore = create<StudyState>()(
  devtools((set, get) => {
    const chess = new Chess();
    const fen = chess.fen();
    return {
      id: uuidv4(),
      parent: null,
      chess,
      moveDataByIndex: new Map().set(0, {
        fen: fen,
        dests: toDests(fen),
      }),
      branches: new Map(),
      currentMoveIndex: 0,
      computed: {
        moveLength: () => get().moveDataByIndex.size,
      },
      setCurrentMoveIndex: (index: number) => {
        if (index < 0) {
          index = 0;
        }
        const moveLength = get().computed.moveLength();
        if (index > moveLength - 1) {
          index = moveLength - 1;
        }
        set(() => ({ currentMoveIndex: index }));
      },
      setMoveDataByIndex: (index, moveData) => {
        set((state) => {
          state.moveDataByIndex.set(index, moveData);
          return state;
        });
      },
      move: (orig, dest) => {
        const todo = (promotion: PromotionPieces | null) => {
          const move = get().chess.move({
            from: orig,
            to: dest,
            ...(promotion && { promotion }),
          });
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
          useBoardStore.getState().toggle();
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
    };
  })
);

// @ts-ignore
if (typeof window !== "undefined" && window.Cypress) {
  // @ts-ignore
  window.useStudyStore = useStudyStore;
}

export default useStudyStore;
