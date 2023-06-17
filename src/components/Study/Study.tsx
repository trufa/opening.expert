import { Box } from "@chakra-ui/react";
import Moves from "~/components/Moves/Moves";
import Board from "~/components/Board/Board";
import Piece from "~/components/Piece/Piece";

const Study = () => {
  return (
    <Box>
      <Board />
      <Moves />
      <Piece piece={"b"} color={"b"} sizePx={100} />
    </Box>
  );
};

export default Study;
