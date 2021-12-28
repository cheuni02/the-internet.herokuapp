describe(`basic page checks`, () => {
    it(`should have these texts when visiting homepage`, () => {
        cy.visit(`/`)
        cy.get(`h1`).should('have.text','Test Results')
    })
})