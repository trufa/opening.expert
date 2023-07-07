import { HStack } from "@chakra-ui/react";
import PgnViewer from "~/components/PgnViewer/PgnViewer";
import Board from "~/components/Board/Board";
import Fen from "~/components/Fen/Fen";

const Study = () => {
  return (
    <>
      <HStack alignItems={"flex-start"}>
        <Board />
        <PgnViewer />
      </HStack>
      <Fen />
    </>
  );
};

export default Study;
