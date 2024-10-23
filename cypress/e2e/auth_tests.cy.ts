import {
  email,
  newUserEmail,
  newUserPassword,
  page,
  password,
  resetPassword,
  username,
} from "../support/pages/AuthPage";

describe("Login page tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/auth/login");
    cy.reload();
  });

  it("should contain headings and a form", () => {
    cy.get("h1").should("contain", "BookReview");
    cy.get("h2").should("contain", "Sign In");
    cy.get("form").should("be.visible");
  });

  it("should have a forgot password link that should work", () => {
    cy.wait(2000);
    page.clickLink("/auth/reset-password");
    cy.url().should("eq", "http://localhost:3000/auth/reset-password");
    cy.get("h2").should("contain", "Reset Password");

    page.typeEmailPassword(email, resetPassword);

    cy.get("input[name='confirmPassword']").click();
    cy.get("input[name='confirmPassword']").type(resetPassword);
    cy.get("button[type='submit']").click();
  });

  it("should sign me in on click of the Sign in button", () => {
    page.login(email, password);
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("should have a keep me signed in checkbox", () => {
    cy.wait(2000);
    page.tickCheckbox();
  });

  it("should go to the sign up page when clicked on the Sign up link", () => {
    page.clickLink("/auth/register");
    cy.url().should("eq", "http://localhost:3000/auth/register");
  });

  it("should go to the sign in page when clicked on Sign in link on Create Account page", () => {
    cy.visit("http://localhost:3000/auth/register");
    cy.url().should("eq", "http://localhost:3000/auth/register");

    page.clickLink("/auth/login");

    cy.url().should("eq", "http://localhost:3000/auth/login");
  });

  it("should be able to create an account", () => {
    cy.visit("http://localhost:3000/auth/register");
    cy.get("input[name='username']").should("be.visible");
    cy.get("input[name='username']").click();
    cy.get("input[name='username']").type(username);

    page.typeEmailPassword(newUserEmail, newUserPassword);

    cy.get("input[name='confirmPassword']").should("be.visible");
    cy.get("input[name='confirmPassword']").click();
    cy.get("input[name='confirmPassword']").type(newUserPassword);
    cy.get("button[type='submit']").should("be.visible");
    cy.get("button[type='submit']").click();
  });
});
