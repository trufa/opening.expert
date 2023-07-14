import { defineConfig } from "cypress";

console.log("RUNNING CONFIG!", process.env.TEST_USER_EMAIL);

export default defineConfig({
  viewportHeight: 1000,
  env: {
    NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    TEST_USER_EMAIL: process.env.TEST_USER_EMAIL,
    TEST_USER_PASSWORD: process.env.TEST_USER_PASSWORD,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
