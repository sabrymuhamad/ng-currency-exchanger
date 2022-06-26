describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/')
  });

  it('Is landing page',()=>{
    cy.get(".sitename a").find('img').should('have.attr', 'src').should('include','logo');
    cy.get("h1").contains('Currency Exchanger');
    cy.get("h1").contains('Currency Exchanger');
    cy.get("h2").contains('Converstion History');
  });
})