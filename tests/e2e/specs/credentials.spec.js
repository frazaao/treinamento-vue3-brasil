describe("Credentials", () => {
  it("Should generate a new API Key", () => {
    cy.visit("/");
    cy.get("#header-login-button").click();

    cy.get("#modal-login");

    cy.get("#email-field").type("igor@igor.me");
    cy.get("#password-field").type("1234");
    cy.get("#submit-button").click();

    cy.wait(4000);

    cy.visit("/credentials");

    cy.wait(2000);

    const oldApiKey = cy.get("#api-key").invoke("text");

    cy.get("#get-new-apikey").click();

    cy.wait(2000);

    const newApiKey = cy.get("#api-key").invoke("text");

    expect(oldApiKey).to.not.equal(newApiKey);
  });
});
