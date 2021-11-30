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

    it(`Test GET request for todos #2 using 'its'`, () => {
        cy.request(`https://jsonplaceholder.cypress.io/todos/2`)
          .its(`body`)  
          .should('have.property','title')
    })

    it(`Test GET request for todos #2, using 'its', and validating the whole response json`, () => {
        cy.request(`https://jsonplaceholder.cypress.io/todos/2`)
          .its(`body`)  
          .should('include', {
            "userId": 1,
            "id": 2,
            "title": "quis ut nam facilis et officia qui",
            "completed": false
          })
    })

    it(`Test GET request for todos #2, using 'its', and validating the one part of the response json is included/ not included`, () => {
        cy.request(`https://jsonplaceholder.cypress.io/todos/2`)
          .its(`body`)  
          .should('include', {
            "title": "quis ut nam facilis et officia qui"
          })
          .and('not.include', { "userId": 2 })
    })
})