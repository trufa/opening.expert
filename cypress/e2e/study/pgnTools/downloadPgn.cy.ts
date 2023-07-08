import gamesBySquares from "../../../utils/gamesBySquares";

describe("Check functioning of PGN download", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("NEXT_PUBLIC_SITE_URL"));
  });

  it("Download should be disabled when no moves are made", () => {
    cy.data("download-pgn").should("be.disabled");
  });

  it("Download should be enabled on first move", () => {
    cy.move(gamesBySquares.shortExample[0]!);
    cy.data("download-pgn").should("be.enabled");
  });

  it.only("Should copy PGN to clipboard", () => {
    cy.playGame(gamesBySquares.shortExample);
    cy.data("pgn-tools-menu").click();
    cy.data("download-pgn").click();
    const downloadsFolder = Cypress.config("downloadsFolder");
    cy.readFile(`${downloadsFolder}/study.pgn`, "binary").should((buffer) =>
      expect(buffer.toString()).to.eq("1. e4 e5 2. Nf3 Nc6 3. Bb5 a6")
    );
  });
});
