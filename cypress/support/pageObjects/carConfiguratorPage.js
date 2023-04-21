const overviewCarConfigurator = 'owcc-car-configurator'
const engineFuelTypeFilter = '[data-primary-filter-id="technicalInformation.engine.fuelType"]'
const filterOptions = 'ccwb-multi-select'
const label = '[class="label"]'
const checkbox = 'ccwb-checkbox'
const motorizationComparison = 'cc-motorization-comparison'
const motorization = 'cc-motorization'
const priceTag = '[class="cc-motorization-header__price--with-environmental-hint"]'
const fuel = '[name="fuel"]'
const fuelTag = 'ccwb-tag'
const vehicleName = '.cc-motorization-header__vehicle-name'
const fuelTypeButtonText = 'Fuel type'
const lowerPriceBand = 15000
const highestPriceBand = 60000

export class carConfiguratorPage{
    // Opens dropdown menu on filter by fuel and selects fuel type, then closes the dropdown
    filterByFuelType(fuelType) {
        cy.get(overviewCarConfigurator).shadow()
        .find(engineFuelTypeFilter).then( fuelTypeDropdown=> {
            cy.wrap(fuelTypeDropdown)
            .find(filterOptions).shadow()
            .find(label)
            .contains(fuelTypeButtonText)
            .click({force: true})
            
            cy.wrap(fuelTypeDropdown)
            .find(checkbox).shadow()
            .find(`[name=${fuelType}]`)
            .check({force: true})
            cy.wrap(fuelTypeDropdown).click({force: true})
        }) 
    }
    // Validates fuel type on the filter results to make sure filtering works as expected
    validateIcons(fuelType){
        cy.get(overviewCarConfigurator).shadow()
        .find(fuel).parent(fuelTag)
        .each( fuelTypeText => {
            cy.wrap(fuelTypeText).invoke('text')
            .should('contain',fuelType)
        }) 
    }
    // Validates car model on the filter results to make sure filtering works as expected
    validateModel(model){
        cy.get(overviewCarConfigurator).shadow()
        .find(vehicleName)
        .each( modelTypeText => {
            cy.wrap(modelTypeText).invoke('text')
            .should('contain', model)
        }) 
    }
    // Captures screenshot of the viewport
    takeScreenshotOfFilterResults(){
        cy.get(overviewCarConfigurator).shadow().find(motorization).then( container => {
            cy.wrap(container).scrollIntoView()
            cy.wait(1000) // We make sure that scroll has time to finish
            cy.screenshot({capture: 'viewport'}) 
        })
    }
    // Creates an array of prices from the filter results and records the lowest and highest prices in the text file
    // Then validates the prices are in the range of 15000 - 60000    
    validateAndSavePrices(){
        var arrayOfPrices = []
        var cheapestPrice
        var mostExpensivePrice
        cy.get(overviewCarConfigurator).shadow().find(motorizationComparison).then( container => {
            cy.wrap(container).find(priceTag).each( priceLabel => {
                cy.wrap(priceLabel).invoke('text').then( text => {
                    var itemPrice = text.replace(/[^0-9]/g, '')// We extract the numbers from the price text
                    var itemPriceInteger = parseInt(itemPrice) 
                    arrayOfPrices.push(itemPriceInteger)
                    arrayOfPrices.sort()
                    cheapestPrice = arrayOfPrices[0]
                    mostExpensivePrice = arrayOfPrices[arrayOfPrices.length - 1]
                })        
            }).then ( loopCompleted => { // We need to make sure our loop for extracting every price is complete before validating the prices and record them in the text file 
                var price = `The lowest price is £${cheapestPrice}. The highest price is £${mostExpensivePrice}.`
                cy.writeFile('./cypress/results/price.txt', price)
                expect(cheapestPrice).to.be.within(lowerPriceBand, highestPriceBand)
                expect(mostExpensivePrice).to.be.within(lowerPriceBand, highestPriceBand)
            })
        })
    }
}       
export const onCarConfiguratorPage = new carConfiguratorPage        

