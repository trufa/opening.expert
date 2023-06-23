import { create } from "zustand";
import { PromotionPieces } from "~/types";
import { subscribeWithSelector } from "zustand/middleware";

interface BoardState {
  show: boolean;
  toggle: () => void;
  setPromotionPiece: (piece: PromotionPieces | null) => void;
  promotionPiece: PromotionPieces | null;
}

const useBoardStore = create<BoardState>()(
  subscribeWithSelector((set, get) => {
    return {
      show: false,
      promotionPiece: null,
      toggle: () => set((state) => ({ show: !state.show })),
      setPromotionPiece: (piece) => {
        set({ promotionPiece: piece });
        if (piece) {
          get().toggle();
        }
      },
    };
  })
);

export default useBoardStore;
