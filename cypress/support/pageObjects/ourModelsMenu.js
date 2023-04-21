const ourModelsFlyout = 'vmos-flyout'
const hatchbackIcon = '[name="sportstourer"]'
const hatchbackModelSection = '[flyout-title="Hatchbacks"]'
const aClassModelText = ' A-Class Hatchback '

export class ourModelsMenu{
    // Navigates to A-Class Hatchback model cars
    navigateToAClassHatchbackModels() {
        cy.get(ourModelsFlyout).shadow().then( ourModelsFlyoutMenu => { 
            cy.wrap(ourModelsFlyoutMenu).find(hatchbackIcon).click()
            cy.wrap(ourModelsFlyoutMenu).find(hatchbackModelSection)
            .contains(aClassModelText)
            .click()
        })
    }
}

export const onOurModelsMenu = new ourModelsMenu