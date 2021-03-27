describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Username");
  });

  it("login can be performed", function () {
    cy.get("input:first").type("pacto");
    cy.get("input:last").type("pacto");
    cy.contains("Log in").click();
  });
});
