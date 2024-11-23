import CartPage from "../../src/ui/src/pages/CartPage";
import HomePage from "../../src/ui/src/pages/HomePage";
import LoginPage from "../../src/ui/src/pages/LoginPage"

describe('ASAPP automation test', () => {
    beforeEach(() => {
        // Bring down any existing container
        cy.exec('docker-compose down').then((result) => {
            console.log(result.stdout);
        })

        // Bring up the container
        cy.exec('docker-compose up -d').then((result) => {
            console.log(result.stdout)
            cy.wait(10000)
        })
    })

    it("Register a new user", () => {
        LoginPage.visit();
    
        LoginPage.register("newUser","newPass");
    })

    it("Login with new user", () => {
        LoginPage.visit();

        LoginPage.register("newUser","newPass");
        LoginPage.login("newUser","newPass");
    })

    it('Happy path -- should add and proceed to checkout', () => {
        LoginPage.visit();

        // Register new account and login
        LoginPage.register();
        LoginPage.login();

        // Validate static data
        HomePage.validateHeader();
        HomePage.validatePens();
        HomePage.validateStickers();
        HomePage.validateBottle();

        // Add items to cart
        HomePage.addRandomPens(true);
        HomePage.addRandomStickers(true);
        HomePage.addRandomBottles(true);
        HomePage.goToCart();

        // Proceed to checkout
        CartPage.buy();
        CartPage.validatePurchase();
        HomePage.logOut();
    })

    it('Test boundary values', () => {
        LoginPage.visit();

        // Register new account and login
        LoginPage.register();
        LoginPage.login();

        // Add items to cart
        HomePage.addRandomPens(false);
        HomePage.addRandomStickers(false);
        HomePage.addRandomBottles(false);
        HomePage.goToCart();

        // Proceed to checkout
        CartPage.buy();
        CartPage.validatePurchase();
        HomePage.logOut();
    })

    it('Cart is empty', () => {
        LoginPage.visit();

        // Register new account and login
        LoginPage.register();
        LoginPage.login();

        // Proceed to checkout
        HomePage.goToCart();
        CartPage.validateEmptyCart();

    })

    it('Should not login', () => {
        LoginPage.visit();
        LoginPage.login("fakeUSer","fakePass");

        LoginPage.getSnackError();
    })

    it('Out of stock!', () => {
        LoginPage.visit();

        // Register new account and login
        LoginPage.register();
        LoginPage.login();

        // Add items to cart
        HomePage.addMax();
        HomePage.goToCart();

        // Proceed to checkout
        CartPage.buy();
        CartPage.validatePurchase();
        HomePage.outOfStock();

        HomePage.logOut();
    })

    after(() => {
        // Clean up after tests
        cy.exec('docker-compose down').then((result) => {
            console.log(result.stdout);
        })
    })
})