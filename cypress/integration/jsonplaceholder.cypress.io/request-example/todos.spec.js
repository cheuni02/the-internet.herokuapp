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

    it(`Test POST request to append a new todo onto the 201st position`, () => {
      cy.request(`POST`,`https://jsonplaceholder.cypress.io/todos`,  {
        "id": 234,
        "title": "situation is bleak",
        "completed": false
      })
        .then((res => {
          expect(res.status).to.eq(201)
        }))
    })

    it(`Test POST request to append a new todo onto the 201st position, by readFile method`, () => {
      cy.readFile(`cypress/fixtures/createNewTodo.json`).then((bodyJson) => {
        cy.request(`POST`,`https://jsonplaceholder.cypress.io/todos`,  bodyJson)
          .then((res => {
            expect(res.status).to.eq(201)
        }))
      })
    })

    it(`Test POST request to append a new todo onto the 201st position, by readFile method and an alias`, () => {
      cy.readFile(`cypress/fixtures/createNewTodo.json`).as('payload') 
      cy.get('@payload').then((bodyJson) => {
        cy.request(`POST`,`https://jsonplaceholder.cypress.io/todos`,  bodyJson)
          .then((res => {
            expect(res.status).to.eq(201)
        }))
      })
    })

})