describe("employees API", () => {
  it("verify request returns JSON", () => {
    cy.request("http://localhost:3000/employees")
      .its("headers")
      .its("content-type")
      .should("include", "application/json");
  });

  it("verify the request returns the correct status code", () => {
    cy.request("http://localhost:3000/employees")
      .its("status")
      .should("be.equal", 200);
  });

  it("verify the request returns 50 items", () => {
    cy.request("http://localhost:3000/employees")
      .its("body")
      .should("have.length", 50);
  });
});
