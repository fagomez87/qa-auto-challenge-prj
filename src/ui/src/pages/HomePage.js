const utils = require("../utils/utils");

const STORE = 'Store';
const CART = 'Cart';
const LOG_OUT = 'Log Out';
const PENS_TITLE = 'ASAPP Pens';
const PENS_DESCRIPTION = 'State of the art pen, hand-crafted by the internationally famous D. Lacy. We guarantee it will never run out of ink.';
const STICKERS_TITLE = 'ASAPP Stickers';
const STICKERS_DESCRIPTION = 'Be the envy of your colleagues with these amazing stickers.';
const BOTTLE_TITLE = 'ASAPP Water Bottle';
const BOTTLE_DESCRIPTION = 'Ever been thirsty at work? No more, our new state of the art bottles will keep you hydrated 24/7. Water not included.';
const IN_STOCK = 'In Stock!';
const OUT_OF_STOCK = 'Out of Stock!';
const ADDED = 'Product Added to Cart'
const firstElement = 1;

class HomePage {
    validatePens() {
        cy.contains('h2', 'ASAPP Pens').should('have.text', PENS_TITLE);
        cy.get('p[data-test-name="product-desc"]').eq(0).should('have.text', PENS_DESCRIPTION);
        cy.contains('span', 'In Stock!').eq(0).should('have.text',IN_STOCK)

    }
    validateStickers() {
        cy.contains('h2', 'ASAPP Stickers').should('have.text', STICKERS_TITLE);
        cy.get('p[data-test-name="product-desc"]').eq(1).should('have.text', STICKERS_DESCRIPTION);
        cy.get('button[data-test-name="stock-button"] span').eq(2).should('have.text',IN_STOCK)

    }
    validateBottle() {
        cy.contains('h2', 'ASAPP Water Bottle').should('have.text', BOTTLE_TITLE);
        cy.get('p[data-test-name="product-desc"]').eq(2).should('have.text', BOTTLE_DESCRIPTION);
        cy.get('button[data-test-name="stock-button"] span').eq(4).should('have.text',IN_STOCK)
    }
    validateHeader() {
        cy.contains('span', 'Store').should('have.text', STORE);
        cy.contains('span', 'Cart').eq(0).should('have.text', CART);
        cy.contains('span', 'Log Out').should('have.text', LOG_OUT);
    }

    addRandomPens(useRandom) {
        cy.get('div[role="button"]').eq(0).click();

        cy.get('div.MuiPaper-rounded ul li').last().invoke('text').then((lastItem) => {
            const lastElement = Number(lastItem);
            const randomValue = utils.getRandomNumber(firstElement, lastElement, useRandom);
            cy.get('div.MuiPaper-rounded ul li').contains(randomValue).click()
        })
        cy.contains('span', 'Add to Cart').eq(0).click()
        cy.get('span#snackbar-fab-message-id').should('have.text', ADDED)
        cy.contains('span', 'Close').click()

    }

    addRandomStickers(useRandom) {
        cy.get('div[role="button"]').eq(1).click();

        cy.get('div.MuiPaper-rounded ul li').last().invoke('text').then((lastItem) => {
            const lastElement = Number(lastItem);
            const randomValue = utils.getRandomNumber(firstElement, lastElement, useRandom);
            cy.get('div.MuiPaper-rounded ul li').contains(randomValue).click()
        })

        cy.get('span.MuiButton-label').eq(2).click()

        cy.get('span#snackbar-fab-message-id').should('have.text', ADDED)
        cy.contains('span', 'Close').click()
    }

    addRandomBottles(useRandom) {
        cy.get('div[role="button"]').eq(2).click();

        cy.get('div.MuiPaper-rounded ul li').last().invoke('text').then((lastItem) => {
            const lastElement = Number(lastItem);
            const randomValue = utils.getRandomNumber(firstElement, lastElement, useRandom);
            cy.get('div.MuiPaper-rounded ul li').contains(randomValue).click()
        })
        cy.get('span.MuiButton-label').eq(4).click()

        cy.get('span#snackbar-fab-message-id').should('have.text', ADDED)
        cy.contains('span', 'Close').click()
    }

    goToCart() {
        cy.contains('span', 'Cart').click()

    }
    logOut() {
        cy.contains('span', 'Log Out').click()

    }

    addMax() {
        // ADD MAX PENS
        cy.get('div[role="button"]').eq(0).click();

        cy.get('div.MuiPaper-rounded ul li').last().invoke('text').then((lastItem) => {
            const lastElement = Number(lastItem);
            cy.get('div.MuiPaper-rounded ul li').contains(lastElement).click()
        })
        cy.contains('span', 'Add to Cart').eq(0).click()
        cy.get('span#snackbar-fab-message-id').should('have.text', ADDED)
        cy.contains('span', 'Close').click()

        // ADD MAX STICKERS
        cy.get('div[role="button"]').eq(1).click();

        cy.get('div.MuiPaper-rounded ul li').last().invoke('text').then((lastItem) => {
            const lastElement = Number(lastItem);
            cy.get('div.MuiPaper-rounded ul li').contains(lastElement).click()
        })

        cy.get('span.MuiButton-label').eq(2).click()
        cy.get('span#snackbar-fab-message-id').should('have.text', ADDED)
        cy.contains('span', 'Close').click()


        // ADD MAX BOTTLES
        cy.get('div[role="button"]').eq(2).click();

        cy.get('div.MuiPaper-rounded ul li').last().invoke('text').then((lastItem) => {
            const lastElement = Number(lastItem);
            cy.get('div.MuiPaper-rounded ul li').contains(lastElement).click()
        })
        cy.get('span.MuiButton-label').eq(4).click()
        cy.get('span#snackbar-fab-message-id').should('have.text', ADDED)
        cy.contains('span', 'Close').click()

    }

    outOfStock() {
        // OUT OF STOCK PENS
        cy.get('button[data-test-name="out-of-stock-label"] span').eq(0).contains(OUT_OF_STOCK)

        // OUT OF STOCK STICKERS
        cy.get('button[data-test-name="out-of-stock-label"] span').eq(2).contains(OUT_OF_STOCK)

        // OUT OF STOCK BOTTLES
        cy.get('button[data-test-name="out-of-stock-label"] span').eq(4).contains(OUT_OF_STOCK)

        cy.get('div[role="button"]').eq(0).click();
        cy.get('div.MuiPaper-rounded ul').find('li[data-value="0"]').should('be.visible')
        cy.get('div.MuiPaper-rounded ul').type('{esc}')

        cy.get('div[role="button"]').eq(1).click();
        cy.get('div.MuiPaper-rounded ul').find('li[data-value="0"]').should('be.visible')
        cy.get('div.MuiPaper-rounded ul').type('{esc}')

        cy.get('div[role="button"]').eq(2).click();
        cy.get('div.MuiPaper-rounded ul').find('li[data-value="0"]').should('be.visible')
        cy.get('div.MuiPaper-rounded ul').type('{esc}')

    }
}
export default new HomePage();