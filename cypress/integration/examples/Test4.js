/// <reference types="Cypress" />

describe("My First Test", () => {
  it("Work flow", () => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get(".search-keyword").type("ca");
    cy.wait(2000);

    // each
    cy.get(".products").as("productLocator");
    cy.get("@productLocator")
      .find(".product")
      .each(($el, index) => {
        const vegName = $el.find("h4.product-name").text();
        if (vegName.match(/cashews/i)) {
          cy.wrap($el).find("button").click();
        }
      });

    cy.findByRole("img", { name: /cart/i }).click();
    cy.findByRole("button", {
      name: /proceed to checkout/i,
    }).click();
    cy.findByRole("button", {
      name: /place order/i,
    }).click();
  });
});
