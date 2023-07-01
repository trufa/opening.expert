import { ClickMove } from "../../types";

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
      const moves: ClickMove[] = [
        ["e2", "e4"],
        ["d7", "d5"],
        ["e4", "d5"],
        ["c7", "c6"],
        ["d5", "c6"],
        ["e7", "e6"],
        ["c6", "b7"],
        ["e6", "e5"],
        ["b7", "a8"],
      ];
      moves.map((m) => cy.move(m));
      cy.data(`promotion-piece-${p}`).click();
      cy.fenShould(fen);
    });
  }

  it("Should fail 2", () => {
    expect("a").to.eq("b");
  });
});
