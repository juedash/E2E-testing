/// <reference types="cypress" />
// * Stubs are an replacement of existing function/methods
// * Used for evaluating and controlling function calls
// * Replace the function

describe("share location", () => {
  beforeEach(() => {
    cy.clock(); // we manipulate the clock and we use tick to advance the time
    cy.fixture("user-location.json").as("userLocation");
    cy.visit("/").then((win) => {
      cy.get("@userLocation").then((fakePosition) => {
        cy.stub(win.navigator.geolocation, "getCurrentPosition")
          .as("getUserPosition") //this is an emoty stub function that isnt enough always
          .callsFake((cb) => {
            setTimeout(() => {
              cb(fakePosition);
            }, 300);
          }); // we add this when we dont want the empty function
      });

      cy.stub(win.navigator.clipboard, "writeText")
        .as("saveToClipboard")
        .resolves(); //this stub returns a promice
      cy.spy(win.localStorage, "setItem").as("storeLocation");
      cy.spy(win.localStorage, "getItem").as("getStoredLocation");
    });
  });
  it("should fetch the user location", () => {
    //when then is used after visit el is window itself

    //we give cypress instructions, we cant access the window at this point
    //cy.stub(window.navigator.geolocation, "getCurrentPosition");
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get("@getUserPosition").should("have.been.called"); // we can get access to any kind of data not only html items
    //check the button is disabled
    cy.get('[data-cy="get-loc-btn"]').should("be.disabled");
    cy.get('[data-cy="actions"]').should("contain", "Location fetched"); //we can use contains()
    //the test fails because the button remains in the loading state
  });

  it("should share location URL", () => {
    cy.get('[data-cy="name-input"]').type("John Doe");
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get("@saveToClipboard").should("have.been.called");

    cy.get("@userLocation").then((fakePosition) => {
      const { latitude, longitude } = fakePosition.coords;
      cy.get("@saveToClipboard").should(
        "have.been.calledWithMatch",
        new RegExp(`${latitude}.*${longitude}.*${encodeURI("John Doe")}`)
      );

      cy.get("@storeLocation").should(
        "have.been.calledWithMatch",
        /John Doe/,
        new RegExp(`${latitude}.*${longitude}.*${encodeURI("John Doe")}`)
      );
    });

    cy.get("@storeLocation").should("have.been.called");
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get("@getStoredLocation").should("have.been.called");
    cy.get('[data-cy="info-message"]').should("be.visible");
    cy.get('[data-cy="info-message"]').should("have.class", "visible");
    cy.tick(2000); //exactly the time on the settimeout, advaces the tume so the test wont be slow
    cy.get('[data-cy="info-message"]').should("not.be.visible");
  });
});
