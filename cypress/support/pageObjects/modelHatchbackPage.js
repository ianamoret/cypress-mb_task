const secondaryButton = '.wb-button--secondary'
const overview = 'owc-stage'
const secondaryButtonText = ' Build your car '

export class modelHatchbackPage{
    // Navigates to the car configurator via 'Build your car' button 
    navigateToCarConfigurator() {
        cy.get(overview).shadow()
        .find(secondaryButton)
        .contains(secondaryButtonText)
        .click()
    }
}

export const onModelHatchbackPage = new modelHatchbackPage