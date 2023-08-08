import gamesBySquares from "../../utils/gamesBySquares";

describe("Check that controls move around", () => {
  beforeEach(() => {
    cy.login();
    cy.visit(`${Cypress.env("NEXT_PUBLIC_SITE_URL")}/study`);
  });

  it("Shows correct fen when playing", () => {
    expect(
      cy
        .data("fen")
        .should(
          "have.text",
          "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        )
    );
    cy.move(gamesBySquares.shortExample[0]!);
    expect(
      cy
        .data("fen")
        .should(
          "have.text",
          "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1"
        )
    );
    cy.move(gamesBySquares.shortExample[1]!);
    expect(
      cy
        .data("fen")
        .should(
          "have.text",
          "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2"
        )
    );
    cy.move(gamesBySquares.shortExample[2]!);
    expect(
      cy
        .data("fen")
        .should(
          "have.text",
          "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2"
        )
    );

    cy.move(gamesBySquares.shortExample[3]!);
    expect(
      cy
        .data("fen")
        .should(
          "have.text",
          "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3"
        )
    );
    cy.data("control-back").click();
    expect(
      cy
        .data("fen")
        .should(
          "have.text",
          "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2"
        )
    );
    cy.data("control-start").click();
    expect(
      cy
        .data("fen")
        .should(
          "have.text",
          "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        )
    );
    cy.data("control-forward").click();
    expect(
      cy
        .data("fen")
        .should(
          "have.text",
          "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1"
        )
    );
    cy.data("control-end").click();
    expect(
      cy
        .data("fen")
        .should(
          "have.text",
          "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3"
        )
    );
  });
});
