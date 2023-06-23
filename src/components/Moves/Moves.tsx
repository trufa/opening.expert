import { Box, Button, Heading } from "@chakra-ui/react";
import useStudyStore from "~/state/study";

const Moves = () => {
  const {
    chess,
    currentMoveIndex,
    setCurrentMoveIndex,
    computed: { moveLength },
  } = useStudyStore();
  const history = chess.history({ verbose: true });
  return (
    <Box>
      <Heading>Study</Heading>
      {history.map((m, i) => {
        if (i % 2) return;
        const pairIndex = i / 2 + 1;
        const ply1 = history[i];
        const ply2 = history[i + 1];
        return (
          <Box key={`move-${pairIndex}`} display={"flex"}>
            <Box>{pairIndex}</Box>
            <Box onClick={() => setCurrentMoveIndex(i + 1)} ml={2}>
              {ply1?.san}
            </Box>
            <Box onClick={() => setCurrentMoveIndex(i + 2)} ml={2}>
              {ply2?.san ?? "..."}
            </Box>
          </Box>
        );
      })}
      <Button onClick={() => setCurrentMoveIndex(0)}>{"|<"}</Button>
      <Button onClick={() => setCurrentMoveIndex(currentMoveIndex - 1)}>
        {"<"}
      </Button>
      <Button onClick={() => setCurrentMoveIndex(currentMoveIndex + 1)}>
        {">"}
      </Button>
      <Button onClick={() => setCurrentMoveIndex(moveLength() - 1)}>
        {">|"}
      </Button>
    </Box>
  );
};

export default Moves;
