import { Box, Button, Heading } from "@chakra-ui/react";
import useStudyStore from "~/state/study";
import MoveUi from "~/components/MoveUi/MoveUi";
import Controls from "~/components/Controls/Controls";

const PgnViewer = () => {
  const { chess } = useStudyStore();
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
            <MoveUi index={i} ply1={ply1} ply2={ply2} />
          </Box>
        );
      })}
      <Controls />
    </Box>
  );
};

export default PgnViewer;
