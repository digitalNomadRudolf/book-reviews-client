const email = Cypress.env("email");
const password = Cypress.env("password");
const resetPassword = Cypress.env("resetPassword");
const newUserEmail = Cypress.env("newUserEmail");
const newUserPassword = Cypress.env("newUserPassword");
const username = Cypress.env("username");

export const page = {
  typeEmailPassword: (email: string, password: string) => {
    cy.get('input[name="email"]').click();
    cy.get('input[name="email"]').type(email);

    cy.get('input[name="password"]').click();
    cy.get('input[name="password"]').type(password);
  },

  tickCheckbox: () => {
    cy.get("input[name='rememberCheckbox']").should("be.visible");
    cy.get("input[name='rememberCheckbox']").click();
    cy.get("input[name='rememberCheckbox']").should("be.checked");
  },

  login: (email: string, password: string) => {
    cy.get("label").should("contain", "Email");
    cy.get("input[name='email']").should("be.visible");
    cy.get("label").should("contain", "Password");
    cy.get('input[name="password"]').should("be.visible");

    page.typeEmailPassword(email, password);
    page.tickCheckbox();

    cy.get("button[type='submit']").click();
  },

  clickLink: (url: string) => {
    cy.get(`a[href="${url}"]`).should("be.visible");
    cy.get(`a[href="${url}"]`).click();
  },
};

export {
  email,
  password,
  resetPassword,
  username,
  newUserEmail,
  newUserPassword,
};
