declare namespace Cypress {
  interface Chainable {
    /**
     * Добавляет ингредиент в конструктор по имени
     * @example
     * cy.addIngredient('Краторная булка N-200i')
     */
    addIngredient(name: string): Chainable<Element>;

    /**
     * Проверяет, что конструктор пустой
     * @example
     * cy.expectEmptyConstructor()
     */
    expectEmptyConstructor(): Chainable<Element>;
  }
}
