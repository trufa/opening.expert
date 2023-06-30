/// <reference types="cypress" />

import { getOffsetBySquare } from "../utils/utils";
import { Square } from "chess.js";

declare global {
  namespace Cypress {
    interface Chainable {
      move(clickMove: ClickMove): Chainable<void>;
      getStudyFen(): Chainable<void>;
    }
  }
}

type ClickMove = [Square, Square];

Cypress.Commands.add("move", (clickMove) => {
  const boardSizePx = 800;
  clickMove.map((square) => {
    cy.get("cg-board").click(...getOffsetBySquare(800, square));
  });
});

Cypress.Commands.add("getStudyFen", () => {
  return cy
    .window()
    .its("useStudyStore")
    .invoke("getState")
    .its("chess")
    .invoke("fen");
});
