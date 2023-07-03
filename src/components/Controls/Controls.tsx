import { Button } from "@chakra-ui/react";
import useStudyStore from "~/state/study";

const Controls = () => {
  const {
    currentMoveIndex,
    setCurrentMoveIndex,
    computed: { moveLength },
  } = useStudyStore();
  return (
    <>
      <Button data-cy={"control-start"} onClick={() => setCurrentMoveIndex(0)}>
        {"|<"}
      </Button>
      <Button
        data-ct={"control-back"}
        onClick={() => setCurrentMoveIndex(currentMoveIndex - 1)}
      >
        {"<"}
      </Button>
      <Button
        data-ct={"control-forward"}
        onClick={() => setCurrentMoveIndex(currentMoveIndex + 1)}
      >
        {">"}
      </Button>
      <Button
        data-ct={"control-end"}
        onClick={() => setCurrentMoveIndex(moveLength() - 1)}
      >
        {">|"}
      </Button>
    </>
  );
};

export default Controls;
