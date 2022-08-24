describe("Home '/'", () => {
  it("Should render create account modal when click CTA create account button", () => {
    cy.visit("/");
    cy.get("#cta-create-account-button").click();

    cy.get("#modal-create-account");
  });

  it("Should render create account modal when click header create account button", () => {
    cy.visit("/");
    cy.get("#header-create-account-button").click();

    cy.get("#modal-create-account");
  });

  it("Should render login modal when click header login button", () => {
    cy.visit("/");
    cy.get("#header-login-button").click();

    cy.get("#modal-login");
  });

  it("Should login with and email and password", () => {
    cy.visit("/");
    cy.get("#header-login-button").click();

    cy.get("#modal-login");

    cy.get("#email-field").type("igor@igor.me");
    cy.get("#password-field").type("1234");
    cy.get("#submit-button").click();

    cy.url().should("include", "/feedbacks");
  });

  it("Should show an error with an invalid email", () => {
    cy.visit("/");
    cy.get("#header-login-button").click();

    cy.get("#modal-login");

    cy.get("#email-field").type("example@");
    cy.get("#password-field").type("1234");
    cy.get("#submit-button").click();

    cy.get("#email-error");
  });

  it("Shloud be able to logout after login", () => {
    cy.visit("/");
    cy.get("#header-login-button").click();

    cy.get("#modal-login");

    cy.get("#email-field").type("igor@igor.me");
    cy.get("#password-field").type("1234");
    cy.get("#submit-button").click();

    cy.url().should("include", "/feedbacks");
    cy.get("#logout-button").click();
  });
});
