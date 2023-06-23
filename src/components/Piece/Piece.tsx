import { Color, PieceSymbol } from "chess.js";
import { Box } from "@chakra-ui/react";
import getPieceSvg from "~/utils/piece-svg";

interface Props {
  piece: PieceSymbol;
  color: Color;
  sizePx?: number;
}

const Piece = ({ piece, color, sizePx = 70 }: Props) => {
  return (
    <Box
      w={`${sizePx}px`}
      h={`${sizePx}px`}
      backgroundImage={getPieceSvg(piece, color)}
      backgroundSize={"100% auto"}
    />
  );
};

export default Piece;
