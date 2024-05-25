/// <reference types="cypress" />

import Navbar from "./Navbar";

describe("<Navbar />", () => {
  beforeEach(() => cy.mount(<Navbar />));
  it("renders", () => {
    cy.get("#navbar").should("be.visible");
  });

  it("shows the company logo", () => {
    cy.get("#logo").should("be.visible");
  });

  it("shows the navbar actions", () => {
    cy.get("#navbar-actions").should("be.visible");
  });
});
