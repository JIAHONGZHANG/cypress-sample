/// <reference types="Cypress" />

describe("Automation website", () => {
  it("My first test case", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    // checkbox
    cy.get("#checkBoxOption1")
      .check()
      .should("be.checked")
      .and("have.value", "option1");

    cy.get("input[type='checkbox']").check(["option2", "option3"]);

    // static selector
    cy.findByRole("combobox").select("option2").should("have.value", "option2");

    // dynamic selector
    cy.get("#autocomplete").type("chin");
    cy.wait(1000);
    cy.get(".ui-menu-item div").each(($el, index) => {
      cy.log($el.text());
      if ($el.text() === "China") {
        cy.wrap($el).click();
      }
    });
    cy.get("#autocomplete").should("have.value", "China");

    // visible check
    cy.get("#displayed-text").should("be.visible");
    cy.findByRole("button", {
      name: /hide/i,
    }).click();
    cy.get("#displayed-text").should("not.be.visible");
    cy.findByRole("button", {
      name: /show/i,
    }).click();
    cy.get("#displayed-text").should("be.visible");

    // alert
    const inputName = "Charles";
    cy.get("#name").type(inputName);
    cy.findByRole("button", {
      name: /alert/i,
    }).click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal(
        `Hello ${inputName}, share this practice page and share your knowledge`
      );
    });

    cy.get("#name").should("have.value", "");

    cy.get("#name").type(inputName);
    cy.findByRole("button", {
      name: /confirm/i,
    }).click();

    cy.on("window:confirm", (str) => {
      expect(str).to.equal(
        `Hello ${inputName}, Are you sure you want to confirm?`
      );
    });

    // invoke jquery method
    cy.get("#opentab").invoke("removeAttr", "target").click();
    cy.url().should((url) => {
      expect(url).to.match(/rahulshettyacademy/i);
    });
    cy.go("back");

    // validate table
    cy.get("tr td:nth-child(2)").each(($el, index) => {
      const text = $el.text();
      if (text.includes("Python")) {
        cy.get("tr td:nth-child(2)")
          .eq(index)
          .next()
          .should(($targetEl) => {
            expect($targetEl.text()).to.equal("25");
          });
      }
    });
  });
});
