describe('Blog Post APP Automation Test', () => {
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

  it('should add post, update post, delete post, and view detail post', () => {
    cy.auth();
    cy.setupIntercepts();

    // add post
    cy.get('button').contains('Add Post').click();
    cy.get('[placeholder="Enter user id"]').type('7594128');
    cy.get('[placeholder="Enter post title"]').type('Beddu 123');
    cy.get('[placeholder="Enter post body"]').type(
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate quos. Quisquam, voluptate quos.',
    );
    cy.get('button[type="submit"]').contains('Add').click();
    cy.wait('@addPost').its('response.statusCode').should('eq', 201);
    cy.wait('@getPosts').its('response.statusCode').should('eq', 200);
    cy.get('.ant-card-head-title').contains('Beddu 123');

    // update post
    cy.get('.ant-card-actions').parent().find('.anticon-edit').eq(0).click();
    cy.get('.ant-modal-content')
      .eq(1)
      .find('[placeholder="Enter post title"]')
      .clear();
    cy.get('.ant-modal-content')
      .eq(1)
      .find('[placeholder="Enter post title"]')
      .type('Beddu 1234');
    cy.get('button[type="submit"]').contains('Update').click();
    cy.wait('@updatePost').its('response.statusCode').should('eq', 200);
    cy.wait('@getPosts').its('response.statusCode').should('eq', 200);
    cy.get('.ant-card-head-title').contains('Beddu 1234');

    // delete post
    cy.get('.ant-card-actions').parent().find('.anticon-delete').eq(0).click();
    cy.get('.ant-popconfirm-buttons').find('button').contains('Yes').click();
    cy.wait('@deletePost').its('response.statusCode').should('eq', 204);
    cy.wait('@getPosts').its('response.statusCode').should('eq', 200);

    // view detail post
    cy.get('.ant-card-actions').parent().find('.anticon-eye').eq(2).click();
    cy.wait('@getPostById').its('response.statusCode').should('eq', 200);
    cy.get('button').contains('Back').click();
  });
});
