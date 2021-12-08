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
})