import { create } from "zustand";
import { Chess, Move, PieceSymbol } from "chess.js";
import { v4 as uuidv4 } from "uuid";
import { Dests, FEN, Key } from "chessground/types";
import { devtools } from "zustand/middleware";

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
  move: (orig: Key, dest: Key) => Move;
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
        const todo = (promotion: Exclude<PieceSymbol, "p" | "k">) => {
          const move = get().chess.move({
            from: orig,
            to: dest,
            promotion: promotion,
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
          return move;
        };
        return todo("q");
      },
    };
  })
);

export default useStudyStore;
