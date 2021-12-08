/// <reference types="Cypress" />

describe("My First Test", () => {
  it("My first test case", () => {
    expect(true).to.equal(true);
  });

  it("My second test case", () => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get(".search-keyword").type("ca");
    cy.wait(2000);
    cy.get(".product:visible").should("have.length", 4);
    cy.get(".products").find(".product").should("have.length", 4);

    //click add to cart in second product
    cy.get(".products").find(".product").eq(1).contains("ADD TO CART").click();

    //   // each
    cy.get(".products").as("productLocator");
    cy.get("@productLocator")
      .find(".product")
      .each(($el, index) => {
        const vegName = $el.find("h4.product-name").text();
        if (vegName.match(/cashews/i)) {
          // $el.find('button').click()
          cy.wrap($el).find("button").click();
        }
      });

    //   // async method
    cy.get(".brand").then(($el) => {
      cy.log($el.text());
    });

    cy.get(".brand").contains(/green/i).should("exist");
  });
});
