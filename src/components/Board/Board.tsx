import React, { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Chessground } from "chessground";
import useStudyStore from "~/state/study";
import BoardModal from "~/components/Board/BoardModal";
import useBoardStore from "~/state/board";

const Board = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { currentMoveIndex, moveDataByIndex, move } = useStudyStore();
  const { chessground, setChessground } = useBoardStore();
  useEffect(() => {
    console.log("useEffect fen", moveDataByIndex.get(currentMoveIndex)!.fen);
    chessground?.set({
      fen: moveDataByIndex.get(currentMoveIndex)!.fen,
      movable: {
        dests: moveDataByIndex.get(currentMoveIndex)!.dests,
      },
    });
  }, [currentMoveIndex]);
  useEffect(() => {
    if (!ref.current) return;
    const chessgroundApi = Chessground(ref.current, {
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
      trustAllEvents: true,
    });
    if (chessground) return;
    setChessground(chessgroundApi);
  }, [ref]);
  return (
    <Box
      minW={"800px"}
      w={"800px"}
      h={"800px"}
      position={"relative"}
      display={chessground ? "block" : "none"}
      data-cy={"board"}
    >
      <BoardModal />
      <Box
        ref={ref}
        style={{ height: "100%", width: "100%", display: "table" }}
      />
    </Box>
  );
};

export default Board;
