describe('test intercepting todos endpoint', () => {
    beforeEach(() => {
        cy.visit(`https://jsonplaceholder.cypress.io`)
    })
    it('should be able to Get a list of todos', () => {
        cy.intercept(`/todos`,(req) => {
           req.continue((res) => {
               cy.log(res.body)
           })
        }).as('todos')

        // cy.visit('https://jsonplaceholder.cypress.io/todos')
        //   cy.wait('@todos').its('response.body').should('have.length', 200)
    })
})