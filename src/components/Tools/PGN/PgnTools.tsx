import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { AiFillCaretDown } from "react-icons/ai";
import CopyPGN from "~/components/Tools/PGN/CopyPGN";
import DownloadPGN from "~/components/Tools/PGN/DownloadPGN";

const PgnTools = () => {
  return (
    <Menu>
      <MenuButton
        data-cy={"pgn-tools-menu"}
        as={Button}
        rightIcon={<AiFillCaretDown />}
      >
        PGN
      </MenuButton>
      <MenuList>
        <CopyPGN />
        <DownloadPGN />
      </MenuList>
    </Menu>
  );
};

export default PgnTools;
