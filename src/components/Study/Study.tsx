import { Box } from "@chakra-ui/react";
import PgnViewer from "~/components/PgnViewer/PgnViewer";
import Board from "~/components/Board/Board";
import Fen from "~/components/Fen/Fen";

const Study = () => {
  return (
    <Box>
      <Board />
      <PgnViewer />
      <Fen />
    </Box>
  );
};

export default Study;
