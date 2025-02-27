/// <reference types="Cypress" />

describe("Newsletter", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.task("seedDatabase");
  });
  it("should display a success message", () => {
    cy.intercept("POST", "/newsletter*", { status: 201 }).as("subscribe"); //intersept any HTTP request sent to localhost:3000/newsletter
    //third attribute will add the dummy data we want to get from the response, we block the response this way
    //cy.intercept("POST", "/newsletter*"); only this will just add an spy to the http requestes
    //we block requests to speedup the test since we are not testing the backend
    cy.get('[data-cy="newsletter-email"]').type("test@example.com");
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait("@subscribe");
    cy.contains("Thanks for signing up");
  });
  it("should display validation errors", () => {
    cy.intercept("POST", "/newsletter*", {
      message: "Email exists already.",
    }).as("subscribe");
    cy.get('[data-cy="newsletter-email"]').type("test@example.com");
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait("@subscribe");
    cy.contains("Email exists already.");
  });
  it("should successfully create a new contact", () => {
    cy.request({
      method: "POST",
      url: "/newsletter",
      body: { email: "test@example.com" },
      form: true,
    }).then((res) => {
      cy.request({
        method: "POST",
        url: "/newsletter",
        body: { email: "test@example.com" },
        form: true,
      }).then((res) => {
        expect(res.status).to.eq(201);
      });
    });
  });
});
