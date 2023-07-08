import gamesBySquares from "../../utils/gamesBySquares";

describe("Check basic moves in study", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("NEXT_PUBLIC_SITE_URL")}/study`);
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
    it(`White can promote to "${p}"`, () => {
      cy.playGame(gamesBySquares.shortPathToPromotion);
      cy.data(`piece-${p}-w`).should("be.visible");
      cy.data(`promotion-piece-${p}`).click();
      cy.fenShould(fen);
    });
  }

  for (const [p, fen] of Object.entries(promotionPieceFenMap)) {
    it(`White can promote to "${p}" when flipped`, () => {
      cy.data("control-flip").click();
      cy.playGame(gamesBySquares.shortPathToPromotion);
      cy.data(`piece-${p}-w`).should("be.visible");
      cy.data(`promotion-piece-${p}`).click();
      cy.fenShould(fen);
    });
  }

  const promotionPieceFenMapBlack = {
    q: "rnbqkbnr/ppp1pppp/8/8/1P6/P1N5/2PP3P/R1BQKBNq w Qkq - 0 6",
    r: "rnbqkbnr/ppp1pppp/8/8/1P6/P1N5/2PP3P/R1BQKBNr w Qkq - 0 6",
    n: "rnbqkbnr/ppp1pppp/8/8/1P6/P1N5/2PP3P/R1BQKBNn w Qkq - 0 6",
    b: "rnbqkbnr/ppp1pppp/8/8/1P6/P1N5/2PP3P/R1BQKBNb w Qkq - 0 6",
  };

  for (const [p, fen] of Object.entries(promotionPieceFenMapBlack)) {
    it(`Black can promote to "${p}"`, () => {
      cy.playGame(gamesBySquares.shortPathToPromotionBlack);
      cy.data(`piece-${p}-b`).should("be.visible");
      cy.data(`promotion-piece-${p}`).click();
      cy.fenShould(fen);
    });
  }

  for (const [p, fen] of Object.entries(promotionPieceFenMapBlack)) {
    it(`Black can promote to "${p}" when flipped`, () => {
      cy.data("control-flip").click();
      cy.playGame(gamesBySquares.shortPathToPromotionBlack);
      cy.data(`piece-${p}-b`).should("be.visible");
      cy.data(`promotion-piece-${p}`).click();
      cy.fenShould(fen);
    });
  }
});
