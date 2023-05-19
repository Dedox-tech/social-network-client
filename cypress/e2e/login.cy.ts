describe('User login flow', () => {
  it('Visits the initial project page', () => {
    cy.visit('/auth');
    cy.contains('Log in').should('exist');
  });
  it('Prevent an invalid attempt to login', () => {
    cy.visit('/auth');
    cy.findByTestId('username-login').click().type('Random user');
    cy.findByTestId('password-login').click().type('1234');
    cy.findByRole('button').click();
    cy.contains('Please check your credentials').should('exist');
  });
  it('Allows a valid intent to login', () => {
    cy.visit('/auth');
    cy.findByTestId('username-login').click().type(Cypress.env('login').userName);
    cy.findByTestId('password-login').click().type(Cypress.env('login').password);
    cy.findByRole('button').click();
    cy.contains('Excellent! You have logged in').should('exist');
  });
});
