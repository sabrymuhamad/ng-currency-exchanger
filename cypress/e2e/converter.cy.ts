
describe('go to page', () => {
    it('passes', () => {
        cy.visit('/')
    });

    it('Converter default values', () => {
        cy.get("input[name=amount]").should('have.value', '1');
        cy.get("mat-select[name=from]").should('have.attr', 'ng-reflect-model').should('equal', 'EUR');
        cy.get("mat-select[name=to]").should('have.attr', 'ng-reflect-model').should('equal', 'USD');
    });

    it('Converter works', () => {
        let cardsCount = 0;
        cy.get('ul')
            .find("app-converstion-card").then(count => {
                cardsCount = Cypress.$(count).length;
            });

        cy.get("button[type=submit]").contains('Convert').click();
        cy.wait(3000);
        cy.get('ul')
            .find("app-converstion-card").then((count) => {
                if (Cypress.$(count).length === cardsCount + 1) {
                    return true
                } else {
                    throw new Error("error adding converter to the grid")
                }
            })

    });
})


