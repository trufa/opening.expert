import { Box } from "@chakra-ui/react";
import useStudyStore from "~/state/study";

const Fen = () => {
  const {
    computed: { currentFen },
  } = useStudyStore();
  return <Box data-cy={"fen"}>{currentFen()}</Box>;
};

export default Fen;
