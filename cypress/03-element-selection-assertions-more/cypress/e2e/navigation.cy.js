describe("page navigation", () => {
  it("should navigate between pages", () => {
    cy.visit("http://localhost:5173/");
    //cy.get("header a").last(); can be useful to get the about link but only in this simple example
    cy.get('[data-cy="header-about-link"]').click();
    cy.location("pathname").should("eq", "/about");
    cy.go("back");
    cy.location("pathname").should("eq", "/");
    cy.get('[data-cy="header-about-link"]').click();
    cy.get('[data-cy="header-home-link"]').click();
    cy.location("pathname").should("eq", "/");
  });
});
