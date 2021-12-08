describe('demonstrate that elements can be added and removed', () => {
    it(`should contain button 'Add Element'`, () => {
        cy.visit(`/add_remove_elements`)
          .get(`#content`).find(`h3`).contains(`Add/Remove Elements`)
          .get(`.example button[onclick='addElement()']`).should('have.text','Add Element')  
    })
})