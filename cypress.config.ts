import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
  },
  viewportHeight: 1000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
