import { Button, Icon, Tooltip } from "@chakra-ui/react";
import { LuFlipVertical } from "react-icons/lu";
import useBoardStore from "~/state/board";

const Flip = () => {
  const { toggleOrientation } = useBoardStore();
  return (
    <Tooltip label={"Flip Board"}>
      <Button data-cy={"control-flip"} onClick={toggleOrientation}>
        <Icon as={LuFlipVertical} />
      </Button>
    </Tooltip>
  );
};

export default Flip;
