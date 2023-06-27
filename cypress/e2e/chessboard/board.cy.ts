import { getOffsetBySquare } from "../../utils/utils";

describe("Check basic moves in chessboard", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("NEXT_PUBLIC_SITE_URL"));
  });

  it("Can move one piece", () => {
    const offset = getOffsetBySquare(800, "e2");
    cy.get("cg-board")
      .should("be.visible")
      .trigger("mousedown", offset.x, offset.y, {
        force: true,
      });
    cy.get("svg.cg-shapes")
      .should("be.visible")
      .trigger("mousedown", offset.x, offset.y, {
        force: true,
      });
    cy.get("svg.cg-custom-svgs")
      .should("be.visible")
      .trigger("mousedown", offset.x, offset.y, {
        force: true,
      });
    cy.get("div.cg-wrap")
      .should("be.visible")
      .trigger("mousedown", offset.x, offset.y, {
        force: true,
      });
    cy.get("piece.white.pawn:nth(1)")
      .should("be.visible")
      .trigger("mousedown", { force: true });

    cy.get("cg-board").should("be.visible").click(offset.x, offset.y, {
      force: true,
    });
    cy.get("svg.cg-shapes").should("be.visible").click(offset.x, offset.y, {
      force: true,
    });
    cy.get("svg.cg-custom-svgs")
      .should("be.visible")
      .click(offset.x, offset.y, {
        force: true,
      });
    cy.get("div.cg-wrap").should("be.visible").click(offset.x, offset.y, {
      force: true,
    });
    cy.get("piece.white.pawn:nth(1)")
      .should("be.visible")
      .click({ force: true });
  });
});
