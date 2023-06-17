import React, { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Chessground as ChessgroundApi } from "chessground";
import { Api } from "chessground/api";
import useStudyStore from "~/state/study";

const Board = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { currentMoveIndex, moveDataByIndex, move } = useStudyStore();
  const [cg, setCg] = useState<Api>();
  useEffect(() => {
    cg?.set({
      fen: moveDataByIndex.get(currentMoveIndex)!.fen,
      movable: {
        dests: moveDataByIndex.get(currentMoveIndex)!.dests,
      },
    });
  }, [currentMoveIndex]);
  useEffect(() => {
    if (!ref.current) return;
    const chessgroundApi = ChessgroundApi(ref.current, {
      fen: moveDataByIndex.get(0)!.fen,
      animation: { enabled: true, duration: 150 },
      movable: {
        free: false,
        dests: moveDataByIndex.get(0)!.dests,
        showDests: true,
      },
      events: {
        move,
      },
    });
    if (cg) return;
    setCg(chessgroundApi);
  }, [ref]);
  return (
    <Box w={"800px"} h={"800px"}>
      <div
        ref={ref}
        style={{ height: "100%", width: "100%", display: "table" }}
      />
    </Box>
  );
};

export default Board;