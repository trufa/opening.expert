import { Button } from "@chakra-ui/react";
import useStudyStore from "~/state/study";

const Controls = () => {
  const {
    currentMoveIndex,
    setCurrentMoveIndex,
    computed: { moveLength },
  } = useStudyStore();
  const backDisabled = currentMoveIndex === 0;
  const forwardDisabled = currentMoveIndex === moveLength() - 1;
  return (
    <>
      <Button
        isDisabled={backDisabled}
        data-cy={"control-start"}
        onClick={() => setCurrentMoveIndex(0)}
      >
        {"|<"}
      </Button>
      <Button
        isDisabled={backDisabled}
        data-cy={"control-back"}
        onClick={() => setCurrentMoveIndex(currentMoveIndex - 1)}
      >
        {"<"}
      </Button>
      <Button
        isDisabled={forwardDisabled}
        data-cy={"control-forward"}
        onClick={() => setCurrentMoveIndex(currentMoveIndex + 1)}
      >
        {">"}
      </Button>
      <Button
        isDisabled={forwardDisabled}
        data-cy={"control-end"}
        onClick={() => setCurrentMoveIndex(moveLength() - 1)}
      >
        {">|"}
      </Button>
    </>
  );
};

export default Controls;
