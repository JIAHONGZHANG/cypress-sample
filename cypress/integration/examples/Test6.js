/// <reference types="Cypress" />

describe("My sixth Test", () => {
  it("My first test case", () => {
    cy.visit("https://rahulshettyacademy.com/angularpractice/");
    cy.get(":nth-child(1) > .form-control").type(globalThis.data.name);
    cy.get("#exampleFormControlSelect1").select(globalThis.data.gender);
  });
});
