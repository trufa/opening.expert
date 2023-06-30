describe("Check basic moves in chessboard", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("NEXT_PUBLIC_SITE_URL"));
  });

  it("Can move one piece", () => {
    cy.move(["e2", "e4"]);
    cy.getStudyFen().should(
      "eq",
      "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1"
    );
  });
});
