/// <reference types="Cypress" />

// you can use command line rather than writen in cypress.json
// cypress run --env url=https://xxx.com
const URL = `${Cypress.env("url")}/angularpractice/shop`;

describe("My eighth Test", () => {
  before(() => {
    cy.fixture("example").then((data) => {
      globalThis.data = data;
    });
  });

  it("My first test case", () => {
    cy.visit(URL);

    for (const phone of globalThis.data.selectedProduct) {
      cy.addProductToCart(phone);
    }

    cy.findByText(/checkout/i).should(($el) => {
      const buttonStr = $el.text();
      expect(buttonStr).to.match(/\( 2 \)/);
    });

    cy.findByText(/checkout/i).click();

    // check sum
    let sum = 0;
    cy.get("tr td:nth-child(4) strong")
      .each(($el) => {
        const amount = $el.text().match(/[1-9]\d*(\.\d+)?$/);
        if (amount && amount[0]) {
          sum += parseFloat(amount[0]);
        }
      })
      .then(() => {
        cy.log("sum", sum);
        expect(sum).to.be.equal(150000);
      });

    cy.get("h4.media-heading a").each(($el, index) => {
      const productName = $el.text();
      expect(productName).to.match(
        new RegExp(globalThis.data.selectedProduct[index], "i")
      );
    });

    cy.findByRole("button", {
      name: /checkout/i,
    }).click();

    // type country

    cy.get("#country").type("China");
    cy.wait(8000);
    cy.get(".suggestions > ul > li > a").click();
    cy.get("#checkbox2").check({ force: true });
    cy.findByRole("button", {
      name: /purchase/i,
    }).click();
    cy.get(".alert").then(($el) => {
      const alertMsg = $el.text();
      expect(alertMsg).to.be.match(/success/i);
    });
  });
});
