const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
    specPattern: '**/*.cy.js',
    setupNodeEvents(on, config) {},
  },
})