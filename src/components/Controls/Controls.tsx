import { Button, Icon } from "@chakra-ui/react";
import useStudyStore from "~/state/study";
import {
  PiArrowLeft,
  PiArrowRight,
  PiArrowLineLeft,
  PiArrowLineRight,
} from "react-icons/pi";

import { LuFlipVertical } from "react-icons/lu";

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
        <Icon as={PiArrowLineLeft} />
      </Button>
      <Button
        isDisabled={backDisabled}
        data-cy={"control-back"}
        onClick={() => setCurrentMoveIndex(currentMoveIndex - 1)}
      >
        <Icon as={PiArrowLeft} />
      </Button>
      <Button
        isDisabled={forwardDisabled}
        data-cy={"control-forward"}
        onClick={() => setCurrentMoveIndex(currentMoveIndex + 1)}
      >
        <Icon as={PiArrowRight} />
      </Button>
      <Button
        isDisabled={forwardDisabled}
        data-cy={"control-end"}
        onClick={() => setCurrentMoveIndex(moveLength() - 1)}
      >
        <Icon as={PiArrowLineRight} />
      </Button>
      <Button>
        <Icon as={LuFlipVertical} />
      </Button>
    </>
  );
};

export default Controls;
