import './commands'
// we use this workaround for uncaught exceptions, 
// because Cypress was failing to navigate to the website due to redirections (302)
// Cypress itself provides this solution:
// https://docs.cypress.io/api/cypress-api/catalog-of-events#Uncaught-Exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
