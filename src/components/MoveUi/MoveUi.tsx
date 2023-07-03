import { Box } from "@chakra-ui/react";
import useStudyStore from "~/state/study";
import { Move } from "chess.js";

interface Props {
  index: number;
  ply1: Move | undefined;
  ply2: Move | undefined;
}

const MoveUi = ({ index, ply1, ply2 }: Props) => {
  const { setCurrentMoveIndex } = useStudyStore();
  const hasSecondPly = !!ply2;
  return (
    <>
      <Box
        data-cy={`move-${index + 1}`}
        onClick={() => setCurrentMoveIndex(index + 1)}
        ml={2}
        cursor={"pointer"}
      >
        {ply1?.san}
      </Box>
      <Box
        data-cy={`move-${index + 2}`}
        onClick={() => hasSecondPly && setCurrentMoveIndex(index + 2)}
        ml={2}
        cursor={hasSecondPly ? "pointer" : "default"}
      >
        {ply2?.san ?? "..."}
      </Box>
    </>
  );
};

export default MoveUi;
