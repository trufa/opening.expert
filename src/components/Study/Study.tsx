import { Box } from "@chakra-ui/react";
import Moves from "~/components/Moves/Moves";
import Board from "~/components/Board/Board";

const Study = () => {
  return (
    <Box>
      <Board />
      <Moves />
    </Box>
  );
};

export default Study;
