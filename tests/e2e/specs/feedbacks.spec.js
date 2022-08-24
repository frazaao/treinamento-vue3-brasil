describe("Feedbacks", () => {
  it("Should be able to render any feedback correctly", () => {
    cy.visit("/");
    cy.get("#header-login-button").click();

    cy.get("#modal-login");

    cy.get("#email-field").type("igor@igor.me");
    cy.get("#password-field").type("1234");
    cy.get("#submit-button").click();

    cy.url().should("include", "/feedbacks");
    cy.get("#filters");
    cy.get("#feedbacks > :nth-child(1)");
  });

  it("Should be able to select filters and it change feedbacks correctly", async () => {
    cy.visit("/");
    cy.get("#header-login-button").click();

    cy.get("#modal-login");

    cy.get("#email-field").type("igor@igor.me");
    cy.get("#password-field").type("1234");
    cy.get("#submit-button").click();

    cy.url().should("include", "/feedbacks");
    cy.get("#filters");
    cy.get("#filters > li");
    cy.get("#feedbacks > :nth-child(1)");
    cy.get("#feedbacks > div");
    cy.get("#filters > :nth-child(2)").click();
    cy.get("#feedbacks > div");
  });
});
