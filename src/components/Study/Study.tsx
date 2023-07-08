import { HStack } from "@chakra-ui/react";
import PgnViewer from "~/components/PgnViewer/PgnViewer";
import Board from "~/components/Board/Board";
import PositionInfo from "~/components/PositionInfo/PositionInfo";

const Study = () => {
  return (
    <>
      <HStack alignItems={"flex-start"}>
        <Board />
        <PgnViewer />
      </HStack>
      <PositionInfo />
    </>
  );
};

export default Study;
