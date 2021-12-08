const listOfExercises = require('../../fixtures/listOfExercises.json')
describe('check homepage loads with the following titles and links', () => {
    it(`should be able to navigate to homepage with title 'Welcome to the-internet'`, () => {
        cy.visit('/')
         .get('#content h1').contains('Welcome to the-internet')
    })
    it(`should have all these links and their corresponding paths according to cypress/fixtures/listOfExercises.json`,() =>{
        cy.fixture('listOfExercises').then((loeFixtures) => {
            loeFixtures.forEach(fixture => {
                cy.log(fixture)
                cy.get(`#content ul li a[href="${fixture.link}"]`).should(`has.text`,fixture.label)
            })
        })
    })
})