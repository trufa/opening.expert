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
      testBoardStore(): Chainable<void>;
      testStudyStore(): Chainable<void>;
      assertValueCopiedToClipboard(value: string): void;
      login(): void;
    }
  }
}

const TEST_BOARD_SIZE_PX = 800;

Cypress.Commands.add("testBoardStore", () => {
  return cy.window().its("useBoardStore").invoke("getState");
});

Cypress.Commands.add("testStudyStore", () => {
  return cy.window().its("useStudyStore").invoke("getState");
});

Cypress.Commands.add("move", (clickMove) => {
  clickMove.map((square) => {
    cy.testBoardStore()
      .invoke("getOrientation")
      .then((orientation) => {
        cy.get("cg-board").click(
          ...getOffsetBySquare(TEST_BOARD_SIZE_PX, square, orientation)
        );
      });
  });
});

Cypress.Commands.add("fenShould", (fen) => {
  cy.testStudyStore().invoke("currentFen").should("eq", fen);
});

Cypress.Commands.add("data", (dataCyId) => {
  return cy.get(`[data-cy="${dataCyId}"]`);
});

Cypress.Commands.add("playGame", (gameBySquares) => {
  gameBySquares.map((clickMove) => {
    cy.move(clickMove);
  });
});

Cypress.Commands.add("assertValueCopiedToClipboard", (value) => {
  cy.window().then((win) => {
    cy.wrap(win.navigator.clipboard.readText()).should("eq", value);
  });
});

Cypress.Commands.add("login", () => {
  cy.session(
    "login",
    () => {
      console.log(
        "logging in!",
        Cypress.env("TEST_USER_EMAIL"),
        Cypress.env("TEST_USER_PASSWORD")
      );
      cy.visit(`${Cypress.env("NEXT_PUBLIC_SITE_URL")}`);
      cy.data("sign-in-out").click();
      cy.get("button").contains("Sign in with Auth0").click();
      cy.origin("https://opening-expert.us.auth0.com", () => {
        cy.get("#username").type(Cypress.env("TEST_USER_EMAIL"));
        cy.get("#password")
          .type(Cypress.env("TEST_USER_PASSWORD"))
          .type("{enter}");
      });
    },
    {
      validate: () => {
        cy.getCookie("next-auth.session-token").should("exist");
      },
    }
  );
});
