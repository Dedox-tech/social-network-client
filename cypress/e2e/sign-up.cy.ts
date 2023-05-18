// Using findByTestId is not the best option, but since we got two forms in one screen, targeting the data-testid is the best option
// More info: https://testing-library.com/docs/queries/bytestid
describe('User sign up flow', () => {
  it('Visits the initial project page', () => {
    cy.visit('/auth');
    cy.contains('Log in');
  });
  it('Fails the sign up process with non valid info', () => {
    cy.visit('/auth');
    cy.findByText('Sign up').click();
    cy.findByTestId('username-signup').click().type('SarahLeeh');
    cy.findByTestId('email-signup').click().type('sarah@gmail.com');
    cy.findByTestId('password-signup').click().type('1234');
    cy.findAllByRole('button').click();
    cy.contains('Something went wrong').should('exist');
    cy.contains('A digit, an upper letter and a special character are a mandatory').should('exist');
  });
});
