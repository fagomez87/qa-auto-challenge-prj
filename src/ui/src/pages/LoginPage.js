const utils = require("../utils/utils");
const ERROR = 'Incorrect Username or Password';
const THANK = 'Thank you!';
const INSERT = 'Please insert Username and Password';

class LoginPage {
    constructor() {
        this.credentials = utils.generateRandomLogin();
    }
    visit() {
        cy.visit('localhost:3000/');
    }

    login() {
        cy.get('input#username').type(this.credentials.username);
        cy.get('input#password').type(this.credentials.password);
        cy.contains('span', 'Log In').click();
    }

    getSnackError() {
        cy.get('span#snackbar-fab-message-id').should('equal', ERROR);
        cy.contains('span', 'Close').click();
    }

    register() {
        cy.contains('span', 'Register').click();
        
        cy.get('div[role="dialog"] h2').should('contain', THANK);
        cy.contains('p', 'Please insert Username and Password').should('contain', INSERT);
        cy.get('input#register-username').type(this.credentials.username);
        cy.get('input#register-password').type(this.credentials.password);
        cy.get('div[role="dialog"] span').eq(0).click();
        cy.wait(1000)
    }
}
export default new LoginPage();
