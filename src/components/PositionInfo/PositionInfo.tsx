import { Box } from "@chakra-ui/react";
import useStudyStore from "~/state/study";

const PositionInfo = () => {
  const { currentFen, pgn } = useStudyStore();
  return (
    <>
      <Box data-cy={"fen"}>{currentFen()}</Box>
      <Box data-cy={"pgn"}>{pgn()}</Box>
    </>
  );
};

export default PositionInfo;
