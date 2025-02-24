/// <refrence types="Cypress" />

describe("tasks page", () => {
  it("should render the main image", () => {
    cy.visit("http://localhost:5173");
    // cy.get(".main-header img");
    // cy.get(".main-header").get("img"); // it will search for images in the page, doesnt check inside main header to search inside use find instead
    cy.get(".main-header").find("img");
  });
  it("should display the page title", () => {
    cy.visit("http://localhost:5173");
    cy.get("h1").should("have.length", 1); //expectation: we have exactly one h1 element on the page
    cy.get("h1").contains("My Cypress Course Task");
    //cy.contains("My Cypress Course Task");
  });
});
