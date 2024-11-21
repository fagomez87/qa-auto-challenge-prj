const utils = require("../utils/utils");

const PRODUCTS = 'Products';
const QUANTITY = 'Quantity';
const STOCK = 'In Stock';
const REMOVE = 'Remove';
const EMPTY = 'OH NO YOUR CART IS EMPTY';
const THANKS = 'Thank you!';
const MESSAGE = "We'll be sending you a link by e-mail to complete payment. We only accept DLacy Coins!!";

class CartPage {
    buy() {
        cy.contains('span', 'BUY!').click()

    }
    removeItem() {

    }

    validateEmptyCart() {
        cy.contains('span', 'OH NO YOUR CART IS EMPTY').should('be.visible')
        cy.get('table tbody').find('tr').should('have.length', 0)
        cy.contains('span', 'OH NO YOUR CART IS EMPTY').click()
    }

    validatePurchase() {
        cy.contains('h2', THANKS).should('be.visible')
        cy.contains('h2', THANKS).should('contain', THANKS)

        cy.get('p.MuiTypography-root').should('be.visible')
        cy.get('p.MuiTypography-root').should('contain', MESSAGE)

        cy.get('img[alt=":dlacy:"]').should('be.visible')
        
        cy.contains('span', 'Awesome').click()

    }
    
}
export default new CartPage();