describe(`check HTTP requests to /api/members`,
    {
        baseUrl : 'http://localhost:5000'
    }, () => {
    
    it(`can GET all members`, () => {
        cy.request({
            method: `GET`,
            url: `/api/members`,
            form: true
        }).then(
            (res) => {
                expect(res.status).to.eq(200)
            }
        )
    })

    it(`can GET a specific member`, () => {
        cy.request(`/api/members/2`)
          .then((res) => {
              expect(res.status).to.eq(200)
              cy.log(res.body)
              expect(res.body[0]).to.contain({"id":2,"name":"Donatello Bellucio","email":"donbellend@gmail.com","status":"active"})
          })
    })

    it(`can POST a new member and verify`, () => {
        cy.request(`/api/members`).then((res) => {
            cy.wrap(res.body.length).as('oldLength')
        })
        cy.request({
            method: 'POST',
            url: `/api/members`,
            form: true,
            body: {"name":"Alice Tang","email":"alice@gmail.com","status":"active"}
        })
        .then((res) => {    
            const re = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/
            const successMsg = /member with id \b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b created .../
            expect(res.status).to.eq(201)
            expect(res.body.msg).to.match(successMsg)
            cy.wrap(res.body.msg.match(re)).as('createdId')
        })
        cy.request(`/api/members`).then((res) => {
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
        cy.get('@createdId').then((id) => {
            cy.request(`/api/members/${id}`).then((res) => {
                expect(res.body[0].name).to.eq("Alice Tang")
                expect(res.body[0].email).to.eq("alice@gmail.com")
                expect(res.body[0].status).to.eq("active")
            })
        })       
    })

    it('can PUT to amend ONLY the email of a member', () => {
        cy.request({ 
            method: 'PUT', 
            url: `/api/members/2`, 
            form: true,
            body: {"email":"amended-email-test-1@gmail.com"}
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).property("msg").to.eq("Member 2 updated")
            expect(res.body.member).property("id").to.eq(2)
            expect(res.body.member).property("email").to.eq("amended-email-test-1@gmail.com")
            cy.request(`/api/members/2`)
              .then((res) => {
                  expect(res.body[0].email).to.eq("amended-email-test-1@gmail.com")
              })
        })
    })

    it('can PUT to amend more than one property of a member', () => {
        cy.request({ 
            method: 'PUT', 
            url: `/api/members/2`, 
            form: true,
            body: {
                "name":"amended-name",
                "email":"amended-email-test-2@gmail.com"
            }
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).property("msg").to.eq("Member 2 updated")
            expect(res.body.member).property("id").to.eq(2)
            expect(res.body.member).property("name").to.eq("amended-name")
            expect(res.body.member).property("email").to.eq("amended-email-test-2@gmail.com")
            cy.request(`/api/members/2`)
              .then((res) => {
                  expect(res.body[0].name).to.eq("amended-name")
                  expect(res.body[0].email).to.eq("amended-email-test-2@gmail.com")
              })
        })
    })
})