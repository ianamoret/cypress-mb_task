/// <reference types="cypress" />

Cypress.Commands.add('visitStartpage', () => {
    cy.visit('/')
})