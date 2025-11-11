describe('Constructor Page', () => {
  beforeEach(() => {
    // Моковые ингредиенты
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    // Посещаем страницу конструктора
    cy.visit('http://localhost:4000');

    // Ждем загрузки ингредиентов
    cy.wait('@getIngredients');
  });

  describe('Adding ingredients to constructor', () => {
    it('should add bun to constructor', () => {
      // Проверяем, что конструктор пустой
      cy.expectEmptyConstructor();

      // Добавляем булку
      cy.addIngredient('Краторная булка N-200i');

      // Проверяем, что булка добавилась в конструктор (должна быть сверху и снизу)
      cy.get('[data-cy="constructor-bun-top"]').should(
        'contain',
        'Краторная булка N-200i'
      );

      cy.get('[data-cy="constructor-bun-bottom"]').should(
        'contain',
        'Краторная булка N-200i'
      );

      // Проверяем, что сообщения "Выберите булки" больше нет
      cy.contains('Выберите булки').should('not.exist');
    });

    it('should add main ingredient to constructor', () => {
      // Проверяем, что конструктор пустой
      cy.expectEmptyConstructor();

      // Добавляем начинку
      cy.addIngredient('Биокотлета из марсианской Магнолии');

      // Проверяем, что ингредиент добавился в конструктор
      cy.get('[data-cy="constructor-ingredients"]')
        .children()
        .should('have.length', 1)
        .should('contain', 'Биокотлета из марсианской Магнолии');

      // Проверяем, что сообщения "Выберите начинку" больше нет
      cy.contains('Выберите начинку').should('not.exist');
    });

    it('should add sauce ingredient to constructor', () => {
      // Проверяем, что конструктор пустой
      cy.expectEmptyConstructor();

      // Добавляем соус
      cy.addIngredient('Соус Spicy-X');

      // Проверяем, что соус добавился
      cy.get('[data-cy="constructor-ingredients"]')
        .children()
        .should('have.length', 1)
        .should('contain', 'Соус Spicy-X');

      // Проверяем, что сообщения "Выберите начинку" больше нет
      cy.contains('Выберите начинку').should('not.exist');
    });

    it('should add multiple ingredients to constructor', () => {
      // Проверяем, что конструктор пустой
      cy.expectEmptyConstructor();

      // Добавляем булку
      cy.addIngredient('Краторная булка N-200i');

      // Добавляем начинку
      cy.addIngredient('Биокотлета из марсианской Магнолии');

      // Добавляем соус
      cy.addIngredient('Соус Spicy-X');

      // Проверяем, что все ингредиенты в конструкторе
      cy.get('[data-cy="constructor-bun-top"]').should(
        'contain',
        'Краторная булка N-200i'
      );

      cy.get('[data-cy="constructor-bun-bottom"]').should(
        'contain',
        'Краторная булка N-200i'
      );

      cy.get('[data-cy="constructor-ingredients"]')
        .children()
        .should('have.length', 2)
        .should('contain', 'Биокотлета из марсианской Магнолии')
        .should('contain', 'Соус Spicy-X');

      // Проверяем, что сообщений "Выберите булки" и "Выберите начинку" больше нет
      cy.contains('Выберите булки').should('not.exist');
      cy.contains('Выберите начинку').should('not.exist');
    });

    it('should replace bun when adding another bun', () => {
      // Добавляем первую булку
      cy.addIngredient('Краторная булка N-200i');

      // Проверяем, что в конструкторе первая булка
      cy.get('[data-cy="constructor-bun-top"]').should(
        'contain',
        'Краторная булка N-200i'
      );

      cy.get('[data-cy="constructor-bun-bottom"]').should(
        'contain',
        'Краторная булка N-200i'
      );

      // Добавляем вторую булку
      cy.addIngredient('Флюоресцентная булка R2-D3');

      // Проверяем, что в конструкторе только вторая булка
      cy.get('[data-cy="constructor-bun-top"]')
        .should('contain', 'Флюоресцентная булка R2-D3')
        .should('not.contain', 'Краторная булка N-200i');

      cy.get('[data-cy="constructor-bun-bottom"]')
        .should('contain', 'Флюоресцентная булка R2-D3')
        .should('not.contain', 'Краторная булка N-200i');
    });
  });

  describe('Modal functionality', () => {
    it('should open ingredient modal on click', () => {
      // Проверяем, что модальное окно закрыто
      cy.get('[data-cy="modal"]').should('not.exist');

      // Кликаем на ингредиент
      cy.contains('Краторная булка N-200i').click();

      // Проверяем, что модальное окно открылось
      cy.get('[data-cy="modal"]').should('be.visible');

      // Проверяем заголовок
      cy.get('[data-cy="modal"]').should('contain', 'Детали ингредиента');

      // Проверяем содержимое
      cy.get('[data-cy="modal"]').should('contain', 'Краторная булка N-200i');
    });

    it('should close modal on close button click', () => {
      // Открываем модальное окно
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-cy="modal"]').should('be.visible');

      // Кликаем на крестик
      cy.get('[data-cy="modal-close"]').click();

      // Проверяем, что модальное окно закрылось
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('should close modal on overlay click', () => {
      // Открываем модальное окно
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-cy="modal"]').should('be.visible');

      // Кликаем на оверлей
      cy.get('[data-cy="modal-overlay"]').click({ force: true });

      // Проверяем, что модальное окно закрылось
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('should close modal on Escape key press', () => {
      // Открываем модальное окно
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-cy="modal"]').should('be.visible');

      // Нажимаем Escape
      cy.get('body').type('{esc}');

      // Проверяем, что модальное окно закрылось
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('should show correct ingredient details in modal', () => {
      // Открываем модальное окно
      cy.contains('Биокотлета из марсианской Магнолии').click();

      // Проверяем детали ингредиента
      cy.get('[data-cy="modal"]').within(() => {
        cy.contains('Биокотлета из марсианской Магнолии');
        cy.contains('Калории').parent().should('contain', '4242');
        cy.contains('Белки').parent().should('contain', '420');
        cy.contains('Жиры').parent().should('contain', '142');
        cy.contains('Углеводы').parent().should('contain', '242');
      });
    });
  });

  describe('Order creation', () => {
    beforeEach(() => {
      // Моковые данные пользователя
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
        'getUser'
      );

      // Моковые данные заказа
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
        'createOrder'
      );

      // Моковые токены
      cy.setCookie('accessToken', 'mock-access-token');
      cy.window().then((win) => {
        win.localStorage.setItem('refreshToken', 'mock-refresh-token');
      });

      // Перезагружаем страницу
      cy.reload();
      cy.wait('@getIngredients');
    });

    afterEach(() => {
      // Удаляем токены
      cy.clearCookie('accessToken');
      cy.window().then((win) => {
        win.localStorage.removeItem('refreshToken');
      });
    });

    const createBurger = () => {
      cy.addIngredient('Краторная булка N-200i');
      cy.addIngredient('Биокотлета из марсианской Магнолии');
      cy.addIngredient('Соус Spicy-X');
    };

    it('should close modal and clear constructor after creating order', () => {
      // Собираем бургер
      createBurger();

      // Кликаем на кнопку "Оформить заказ"
      cy.contains('Оформить заказ').click();

      // Ждем запроса создания заказа
      cy.wait('@createOrder');

      // Проверяем, что модальное открылось
      cy.get('[data-cy="modal"]').should('be.visible');

      // Проверяем номер заказа
      cy.get('[data-cy="order-number"]').should('contain', '12345');

      // Закрываем модальное окно
      cy.get('[data-cy="modal-close"]').click();

      // Проверяем, что модальное окно закрылось
      cy.get('[data-cy="modal"]').should('not.exist');

      // Проверяем, что конструктор пуст
      cy.expectEmptyConstructor();
    });

    it('should redirect to login if not authenticated', () => {
      // Удаляем токены
      cy.clearCookie('accessToken');
      cy.window().then((win) => {
        win.localStorage.removeItem('refreshToken');
      });

      // Перезагружаем страницу
      cy.reload();
      cy.wait('@getIngredients');

      // Собираем бургер
      createBurger();

      // Кликаем на кнопку "Оформить заказ"
      cy.contains('Оформить заказ').click();

      // Проверяем редирект на страницу логина
      cy.url().should('include', '/login');
    });
  });
});
