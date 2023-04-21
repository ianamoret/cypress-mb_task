const cookieBanner = 'cmm-cookie-banner'
const acceptAllButton = '[data-test="handle-accept-all-button"]'
const navigationHeader = 'owc-header'
const acceptAllButtonText = 'Agree to all'
const ourModelsButtonText = ' Our models '

export class startPage {
    // Closes cookie banner on the first visit
    closeCookieBanner() {
        cy.get(cookieBanner).shadow()
        .find(acceptAllButton)
        .contains(acceptAllButtonText)
        .click()
    }
    // Navigates to 'Our models' section
    navigateToOurModels(){
        cy.get(navigationHeader).shadow()
        .contains(ourModelsButtonText)
        .click()
    }
}

export const onStartPage = new startPage