import gamesBySquares from "../../utils/gamesBySquares";

describe("Check that controls move around", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("NEXT_PUBLIC_SITE_URL"));
    cy.playGame(gamesBySquares.operaGame);
  });

  it("Jumps forward", () => {
    cy.fenShould("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    cy.data("controls-forward").click();
    cy.fenShould("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1");
    cy.data("controls-forward").click();
    cy.fenShould(
      "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2"
    );
  });
});
