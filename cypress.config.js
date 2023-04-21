const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1920,
  viewportWidth: 1280,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.mercedes-benz.co.uk'
    
  },
});
