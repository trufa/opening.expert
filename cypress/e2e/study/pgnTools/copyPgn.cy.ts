import gamesBySquares from "../../../utils/gamesBySquares";

describe("Check functioning of PGN copying", () => {
  beforeEach(() => {
    cy.login();
    cy.visit(`${Cypress.env("NEXT_PUBLIC_SITE_URL")}/study`);
  });

  it("Copy should be disabled when no moves are made", () => {
    cy.data("copy-pgn").should("be.disabled");
  });

  it("Copy should be enabled on first move", () => {
    cy.move(gamesBySquares.shortExample[0]!);
    cy.data("copy-pgn").should("be.enabled");
  });

  it("Should copy PGN to clipboard", () => {
    cy.playGame(gamesBySquares.shortExample);
    cy.data("pgn-tools-menu").click();
    cy.data("copy-pgn").click();
    cy.assertValueCopiedToClipboard("1. e4 e5 2. Nf3 Nc6 3. Bb5 a6");
  });
});
