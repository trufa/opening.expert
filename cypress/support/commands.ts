/// <reference types="cypress" />

import { getOffsetBySquare } from "../utils/utils";
import { ClickMove } from "../types";
import { FEN } from "chessground/types";
import { GameBySquares } from "../utils/gamesBySquares";

declare global {
  namespace Cypress {
    interface Chainable {
      move(clickMove: ClickMove): Chainable<void>;
      fenShould(fen: FEN): void;
      data(dataCyId: string): Chainable<JQuery<HTMLElement>>;
      playGame(gameBySquares: GameBySquares): void;
    }
  }
}

Cypress.Commands.add("move", (clickMove) => {
  const boardSizePx = 800;
  clickMove.map((square) => {
    cy.get("cg-board").click(...getOffsetBySquare(800, square));
  });
});

Cypress.Commands.add("fenShould", (fen) => {
  cy.window()
    .its("useStudyStore")
    .invoke("getState")
    .its("computed")
    .invoke("currentFen")
    .should("eq", fen);
});

Cypress.Commands.add("data", (dataCyId) => {
  return cy.get(`[data-cy="${dataCyId}"]`);
});

Cypress.Commands.add("playGame", (gameBySquares) => {
  gameBySquares.map((clickMove) => {
    cy.move(clickMove);
  });
});
