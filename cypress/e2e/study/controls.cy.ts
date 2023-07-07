import gamesBySquares from "../../utils/gamesBySquares";

describe("Check that controls move around", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("NEXT_PUBLIC_SITE_URL"));
    cy.playGame(gamesBySquares.shortExample);
  });

  it("Jumps backwards and forwards when clicked", () => {
    cy.data("control-back").click();
    cy.fenShould(
      "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3"
    );
    cy.data("control-back").click();
    cy.fenShould(
      "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3"
    );
    cy.data("control-back").click();
    cy.fenShould(
      "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2"
    );
    cy.data("control-forward").click();
    cy.fenShould(
      "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3"
    );
    cy.data("control-forward").click();
    cy.fenShould(
      "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3"
    );
  });

  it("Jumps backwards and forwards when arrow", () => {
    cy.get("body").type("{leftarrow}");
    cy.fenShould(
      "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3"
    );
    cy.get("body").type("{leftarrow}");
    cy.fenShould(
      "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3"
    );
    cy.get("body").type("{leftarrow}");
    cy.fenShould(
      "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2"
    );
    cy.get("body").type("{rightarrow}");
    cy.fenShould(
      "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3"
    );
    cy.get("body").type("{rightarrow}");
    cy.fenShould(
      "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3"
    );
  });

  //TODO: Find a way to test key left and right hold down

  it("Jumps to start and end", () => {
    cy.data("control-start").click();
    cy.fenShould("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    cy.data("control-end").click();
    cy.fenShould(
      "r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4"
    );
  });

  it("Should be disabled when start and end", () => {
    cy.data("control-start").click();
    expect(cy.data("control-back").should("be.disabled"));
    expect(cy.data("control-start").should("be.disabled"));
    cy.data("control-end").click();
    expect(cy.data("control-forward").should("be.disabled"));
    expect(cy.data("control-end").should("be.disabled"));
  });

  it("Should be disabled when click last move", () => {
    cy.data("move-1").click();
    cy.data("move-6").click();
    expect(cy.data("control-forward").should("be.disabled"));
    expect(cy.data("control-end").should("be.disabled"));
  });

  it("Should flip board", () => {
    cy.testBoardStore().invoke("getOrientation").should("eq", "w");
    cy.data("control-flip").click();
    cy.testBoardStore().invoke("getOrientation").should("eq", "b");
    cy.data("control-flip").click();
    cy.testBoardStore().invoke("getOrientation").should("eq", "w");
  });
});
