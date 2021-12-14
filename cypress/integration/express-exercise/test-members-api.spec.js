describe(`check HTTP requests to /api/members`, () => {
    
    it(`can GET all members`, () => {
        cy.request({
            method: `GET`,
            url: `http://localhost:5000/api/members`,
            form: true
        }).then(
            (res) => {
                expect(res.status).to.eq(200)
            }
        )
    })

    it(`can GET a specific member`, () => {
        cy.request(`http://localhost:5000/api/members/2`)
          .then((res) => {
              expect(res.status).to.eq(200)
              cy.log(res.body)
              expect(res.body[0]).to.contain({"id":2,"name":"Donatello Bellucio","email":"donbellend@gmail.com","status":"active"})
          })
    })

    it(`can POST a new member and verify`, () => {
        cy.request(`http://localhost:5000/api/members`).then((res) => {
            cy.wrap(res.body.length).as('oldLength')
        })
        cy.request({
            method: 'POST',
            url: `http://localhost:5000/api/members`,
            form: true,
            body: {"name":"Alice Tang","email":"alice@gmail.com","status":"active"}
        })
        .then((res) => {    
            expect(res.status).to.eq(201)
            expect(res.body.msg).to.match(/member with id \b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b created .../)
            
        })
        cy.request(`http://localhost:5000/api/members`).then((res) => {
            cy.wrap(res.body.length).then((newLength) => {
                cy.get('@oldLength').then((oldLength) => {
                    expect(newLength).to.eq(oldLength + 1)
                    cy.wrap(res.body[oldLength]).then((newlyAddedTodo) => {
                        expect(newlyAddedTodo.name).to.eq("Alice Tang")
                        expect(newlyAddedTodo.email).to.eq("alice@gmail.com")
                        expect(newlyAddedTodo.status).to.eq("active")
                    })
                })
            })
        })
    })
})