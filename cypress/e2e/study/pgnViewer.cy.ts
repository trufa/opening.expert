import gamesBySquares from "../../utils/gamesBySquares";

describe("Check that PgnViewer shows correct moves", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("NEXT_PUBLIC_SITE_URL")}/study`);
  });

  const expectedMoves = [
    "e4",
    "e5",
    "Nf3",
    "d6",
    "d4",
    "Bg4",
    "dxe5",
    "Bxf3",
    "Qxf3",
    "dxe5",
    "Bc4",
    "Nf6",
    "Qb3",
    "Qe7",
    "Nc3",
    "c6",
    "Bg5",
    "b5",
    "Nxb5",
    "cxb5",
    "Bxb5+",
    "Nbd7",
    "O-O-O",
    "Rd8",
    "Rxd7",
    "Rxd7",
    "Rd1",
    "Qe6",
    "Bxd7+",
    "Nxd7",
    "Qb8+",
    "Nxb8",
    "Rd8#",
  ];

  it(`Show correct move in pgnViewer"`, () => {
    gamesBySquares.operaGame.map((move, i) => {
      cy.move(move);
      cy.data(`move-${i + 1}`).should("have.text", expectedMoves[i]);
      if (i % 2 === 0) {
        cy.data(`move-${i + 2}`).should("have.text", "...");
      }
    });
  });
});
