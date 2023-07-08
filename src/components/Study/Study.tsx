import { HStack } from "@chakra-ui/react";
import PgnViewer from "~/components/PgnViewer/PgnViewer";
import Board from "~/components/Board/Board";
import PositionInfo from "~/components/PositionInfo/PositionInfo";
import useStudyStore from "~/state/study";
import { useEffect } from "react";

const Study = () => {
  const { loadPGN } = useStudyStore();
  useEffect(() => {
    loadPGN("1. e4 h5 (1... a5) 2. f4");
  }, []);
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
