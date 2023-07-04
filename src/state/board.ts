import { create } from "zustand";
import { PromotionPieces } from "~/types";
import { subscribeWithSelector } from "zustand/middleware";
import { Color } from "chess.js";
import { Api } from "chessground/api";

interface BoardState {
  chessground: Api | null;
  setChessground: (cg: Api) => void;
  showModal: boolean;
  toggleModal: () => void;
  setPromotionPiece: (piece: PromotionPieces | null) => void;
  promotionPiece: PromotionPieces | null;
  toggleOrientation: () => void;
}

const useBoardStore = create<BoardState>()(
  subscribeWithSelector((set, get) => {
    return {
      chessground: null,
      setChessground: (cg) => set({ chessground: cg }),
      showModal: false,
      promotionPiece: null,
      toggleModal: () => set((state) => ({ showModal: !state.showModal })),
      setPromotionPiece: (piece) => {
        set({ promotionPiece: piece });
        if (piece) {
          get().toggleModal();
        }
      },
      toggleOrientation: () => {
        get().chessground?.toggleOrientation();
      },
    };
  })
);

export default useBoardStore;
