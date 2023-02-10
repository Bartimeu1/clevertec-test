/// <reference types="cypress" />

describe('Get books test', () => {
  describe('getCategoriesAndBooks', () => {
      beforeEach(() => {
          cy.intercept('https://strapi.cleverland.by/api/categories', (req) => {
              req.on('response', (res) => {
                  res.setDelay(3000);
              });
          }).as('get-categories-success');
          cy.intercept('https://strapi.cleverland.by/api/books', (req) => {
              req.on('response', (res) => {
                  res.setDelay(3000);
              });
          }).as('get-books-success');
          cy.viewport('macbook-16');
      });

      it('categories-loading', () => {
          cy.visit(`http://localhost:3000`);      
          cy.get('[data-test-id=loader]').should('be.exist');   
          cy.get('[data-test-id=app]').wait(60).screenshot('main-loading');     
          cy.wait('@get-categories-success');              
          cy.wait('@get-books-success');  
          cy.get('[data-test-id=card]').eq(137).should('be.exist');   
          cy.get('[data-test-id=app]').screenshot('app-sucess', { clip: { x: 0, y: 0, width: 1440, height: 950 }});
      });
  });

  describe('getSuccessBookId', () => {
      beforeEach(() => {
          cy.intercept('https://strapi.cleverland.by/api/books/2').as('get-books-success-id');
          cy.viewport('macbook-16');
      });

      it('bookId-success', () => {
          cy.visit(`http://localhost:3000/#/books/all/2`);
          cy.get('[data-test-id=loader]').should('be.exist'); 
          cy.get('[data-test-id=app]').wait(60).screenshot('bookId-loading');  
          cy.wait('@get-books-success-id');   
          cy.get('[data-test-id=app]').screenshot('bookId-sucess');                 
      });
  });

  describe('ErrorMain', () => {
      beforeEach(() => {
          cy.intercept('https://strapi.cleverland.by/api/categories', {
              statusCode: 404,
          }).as('get-categories-error');
          cy.intercept('https://strapi.cleverland.by/api/books', {
            statusCode: 404,
        }).as('get-books-error');
          cy.viewport('macbook-16');
      });

      it('main-error', () => {
          cy.visit(`http://localhost:3000`);
          cy.wait('@get-categories-error');
          cy.wait('@get-books-error');
          cy.get('[data-test-id=error]').should('be.exist');
          cy.get('[data-test-id=app]').screenshot('categories-error');        
      });
  });

  describe('ErrorBookId', () => {
      beforeEach(() => {
          cy.intercept('https://strapi.cleverland.by/api/books/2', {
              statusCode: 404,
          }).as('get-bookId-error');
          cy.viewport('macbook-16');
      });

      it('bookId-error', () => {
          cy.visit(`http://localhost:3000/#/books/all/2`);
          cy.wait('@get-bookId-error');
          cy.get('[data-test-id=error]').should('be.exist');
          cy.get('[data-test-id=app]').screenshot('bookId-error');
      });
  });
});