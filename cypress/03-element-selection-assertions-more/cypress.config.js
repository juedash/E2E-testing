import { defineConfig } from "cypress";

export default defineConfig({
  video: true,
  screenshotOnRunFailure: true,
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      on("task", {
        seedDatabase(fileName) {
          //Run yout NodeJS code
          //eg edit a file here
          return fileName;
        },
      });
    },
  },
});
