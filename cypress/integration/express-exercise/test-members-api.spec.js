describe(`check HTTP requests to /api/members`, () => {
    it(`can GET all members`, () => {
        cy.request({
            method: `GET`,
            url: `http://localhost:5000/api/members`,
            form: true
        }).then(
            (res) => {
                expect(res.body).to.have.length(8)    
            }
        )
    })

    it(`can POST a new member and verify`, () => {
        cy.request({
            method: 'POST',
            url: `http://localhost:5000/api/members`,
            body: {"name":"Alice Tang","email":"alice@gmail.com","status":"active"}
        })
        .then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.property("name","Alice Tang")
        }) 
    })
})