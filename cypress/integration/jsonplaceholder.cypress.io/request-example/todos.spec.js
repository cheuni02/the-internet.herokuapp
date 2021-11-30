describe('testing http requests', () => {
    it(`Test GET request for all todos`, () => {
        cy.request(`https://jsonplaceholder.cypress.io/todos`)
          .then((res) => {
              expect(res.body).to.have.length(200)
          })
    })

    it(`Test GET request for todos # 200`, () => {
        cy.request(`https://jsonplaceholder.cypress.io/todos/200`)
          .then((res) => {
              expect(res.body).to.have.property("title", "ipsam aperiam voluptates qui")
          })
    })

})