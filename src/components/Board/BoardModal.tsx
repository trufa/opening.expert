import { Box, HStack } from "@chakra-ui/react";
import useBoardStore from "~/state/board";
import Piece from "~/components/Piece/Piece";
import { PromotionPieces } from "~/types";

const BoardModal = () => {
  const { showModal, setPromotionPiece } = useBoardStore();
  const promotionPieces: PromotionPieces[] = ["q", "r", "n", "b"];

  return (
    <Box
      width={"100%"}
      height={"100%"}
      position={"absolute"}
      zIndex={3}
      backgroundColor={"rgba(0,0,0,0.5)"}
      display={showModal ? "flex" : "none"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <HStack bg={"white"} rounded={10} display={"flex"} spacing={"20px"} p={4}>
        {promotionPieces.map((piece) => (
          <Box
            onClick={() => setPromotionPiece(piece)}
            data-cy={`promotion-piece-${piece}`}
            key={`promotion-piece-${piece}`}
            rounded={10}
            _hover={{
              boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.1)",
            }}
          >
            <Piece piece={piece} color={"w"} />
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

export default BoardModal;
