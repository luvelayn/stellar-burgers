Cypress.Commands.add('addIngredient', (name: string) => {
  cy.contains(name).parents('li').find('button').click();
});

Cypress.Commands.add('expectEmptyConstructor', () => {
  cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
  cy.get('[data-cy="constructor-bun-bottom"]').should('not.exist');
  cy.get('[data-cy="constructor-ingredients"]')
    .children()
    .should('have.length', 1)
    .should('contain', 'Выберите начинку');
  cy.contains('Выберите булки').should('be.visible');
});
