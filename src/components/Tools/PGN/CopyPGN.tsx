import useStudyStore from "~/state/study";
import { MenuItem } from "@chakra-ui/react";
import { useCopyToClipboard } from "usehooks-ts";
import { useEffect } from "react";

const CopyPGN = () => {
  const { pgn } = useStudyStore();
  const [value, copy] = useCopyToClipboard();
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
