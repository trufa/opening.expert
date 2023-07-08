import { Button, Icon } from "@chakra-ui/react";
import useStudyStore from "~/state/study";
import {
  PiArrowLeft,
  PiArrowRight,
  PiArrowLineLeft,
  PiArrowLineRight,
} from "react-icons/pi";
import { useEffect } from "react";

const Controls = () => {
  const { currentMoveIndex, setCurrentMoveIndex, moveLength } = useStudyStore();
  const backDisabled = currentMoveIndex === 0;
  const forwardDisabled = currentMoveIndex === moveLength() - 1;
  const onKeyDown = (e: Event) => {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const offset = e.key === "ArrowLeft" ? -1 : 1;
      setCurrentMoveIndex(currentMoveIndex + offset);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [currentMoveIndex]);
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
    </>
  );
};

export default Controls;
