import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 1000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
