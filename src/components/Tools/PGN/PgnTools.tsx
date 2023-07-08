import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { AiFillCaretDown } from "react-icons/ai";
import CopyPGN from "~/components/Tools/PGN/CopyPGN";

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
        <MenuItem>Download PGN</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PgnTools;
