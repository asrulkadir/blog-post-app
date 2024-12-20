describe('Homepage Blog Post', () => {
  it('should input name and token and invalid token', () => {
    cy.visit('/');
    cy.get('[placeholder="Please input your name"]').type('Beddu');
    cy.get('[placeholder="Please input your token"]').type('123456');
    cy.get('button').contains('Submit').click();
  });

  it('should input name and token and valid token', () => {
    cy.visit('/');
    cy.get('[placeholder="Please input your name"]').type('Beddu');
    cy.get('[placeholder="Please input your token"]').type(
      Cypress.env('gorest_token'),
    );
    cy.get('button').contains('Submit').click();
  });

  it('should add post', () => {
    cy.auth();
    cy.get('button').contains('Add Post').click();
    cy.get('[placeholder="Enter user id"]').type('7594128');
    cy.get('[placeholder="Enter post title"]').type('Beddu 123');
    cy.get('[placeholder="Enter post body"]').type(
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate quos. Quisquam, voluptate quos.',
    );
    cy.get('button[type="submit"]').contains('Add').click();
  });
});
