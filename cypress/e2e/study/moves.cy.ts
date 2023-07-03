import gamesBySquares from "../../utils/gamesBySquares";

describe("Check that PgnViewer component works as expected", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("NEXT_PUBLIC_SITE_URL"));
  });

  it("Move ui should jump around", () => {
    cy.playGame(gamesBySquares.operaGame);
    cy.data("move-4").click();
    cy.fenShould(
      "rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3"
    );
    cy.data("move-7").click();
    cy.fenShould(
      "rn1qkbnr/ppp2ppp/3p4/4P3/4P1b1/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 4"
    );
    cy.data("move-23").click();
    cy.fenShould(
      "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R b kq - 2 12"
    );
    cy.data("move-30").click();
    cy.fenShould("4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16");
    cy.data("move-1").click();
    cy.fenShould("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1");
    cy.data("move-33").click();
    cy.fenShould("1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 b k - 1 17");
  });
});
