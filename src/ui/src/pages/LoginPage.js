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

    login(user = this.credentials.username, pass = this.credentials.password) {
        cy.get('input#username').type(user);
        cy.get('input#password').type(pass);
        cy.contains('span', 'Log In').click();
    }

    getSnackError() {
        cy.get('span#snackbar-fab-message-id').should('have.text', ERROR);
        cy.contains('span', 'Close').click();
    }

    register(user = this.credentials.username, pass = this.credentials.password) {
        cy.contains('span', 'Register').click();
        
        cy.get('div[role="dialog"] h2').should('have.text', THANK);
        cy.contains('p', 'Please insert Username and Password').should('have.text', INSERT);
        cy.get('input#register-username').type(user);
        cy.get('input#register-password').type(pass);
        cy.get('div[role="dialog"] span').eq(0).click();
        cy.wait(1000)
    }
}
export default new LoginPage();
