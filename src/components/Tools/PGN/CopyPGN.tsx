import useStudyStore from "~/state/study";
import { MenuItem } from "@chakra-ui/react";
import { useCopyToClipboard } from "usehooks-ts";

const CopyPGN = () => {
  const { pgn } = useStudyStore();
  const [_, copy] = useCopyToClipboard();
  return (
    <MenuItem
      data-cy={"copy-pgn"}
      isDisabled={pgn() === ""}
      onClick={() => copy(pgn())}
    >
      Copy PGN
    </MenuItem>
  );
};

export default CopyPGN;
