// You are requested to automate the following test case “Validate A Class models price are between
// £15,000 and £60,000" as described below:
// • Open Mercedes-benz United Kingdom market
// • Under “Our Models” - Select “Model: Hatchbacks”;
// • Mouse over the “A Class” model available and proceed to “Build your car”
// • Filter by Fuel type “Diesel”
// • Take and save a screenshot of the results
// • Save the value “£” of the highest and lowest price results in a text file

const { onModelHatchbackPage } = require("../support/pageObjects/modelHatchbackPage")
const { onOurModelsMenu } = require("../support/pageObjects/ourModelsMenu")
const { onStartPage } = require("../support/pageObjects/startPage")
const { onCarConfiguratorPage } = require("../support/pageObjects/carConfiguratorPage")

describe ('A Class car models', () => {
    it('should have prices between £15,000 and £60,000', () => {
        cy.visitStartpage()
        onStartPage.closeCookieBanner()
        onStartPage.navigateToOurModels() 
        onOurModelsMenu.navigateToAClassHatchbackModels()
        onModelHatchbackPage.navigateToCarConfigurator()
        onCarConfiguratorPage.filterByFuelType("Diesel")
        onCarConfiguratorPage.takeScreenshotOfFilterResults()
        onCarConfiguratorPage.validateAndSavePrices()
        // Additional validations that filter results contain only Diesel type of fuel and only Hatchback model
        onCarConfiguratorPage.validateIcons("Diesel") 
        onCarConfiguratorPage.validateModel("Hatchback")
    })
})
