import gamesBySquares from "../../utils/gamesBySquares";

describe("Check basic moves in study", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("NEXT_PUBLIC_SITE_URL"));
  });

  it("Can move one piece", () => {
    cy.move(["e2", "e4"]);
    cy.fenShould("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1");
  });

  const promotionPieceFenMap = {
    q: "Qnbqkbnr/p4ppp/8/4p3/8/8/PPPP1PPP/RNBQKBNR b KQk - 0 5",
    r: "Rnbqkbnr/p4ppp/8/4p3/8/8/PPPP1PPP/RNBQKBNR b KQk - 0 5",
    n: "Nnbqkbnr/p4ppp/8/4p3/8/8/PPPP1PPP/RNBQKBNR b KQk - 0 5",
    b: "Bnbqkbnr/p4ppp/8/4p3/8/8/PPPP1PPP/RNBQKBNR b KQk - 0 5",
  };

  for (const [p, fen] of Object.entries(promotionPieceFenMap)) {
    it(`Can promote to "${p}"`, () => {
      cy.playGame(gamesBySquares.shortPathToPromotion);
      cy.data(`promotion-piece-${p}`).click();
      cy.fenShould(fen);
    });
  }
});
