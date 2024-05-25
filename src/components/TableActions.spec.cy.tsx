import TableActions from "./TableActions";

describe("<Navbar />", () => {
  beforeEach(() => cy.mount(<TableActions selectedOrders={[]} />));
  it("renders", () => {
    cy.get("#table-actions").should("be.visible");
  });

  it("clicking on the create order button opens the create order form in a modal", () => {
    cy.get("button[data-testid='create-order-button']")
      .should("be.visible")
      .click();
    cy.get("#modal-container").should("be.visible");
  });

  it("the form should validate empty inputs", () => {
    cy.get("button[value='create']").click();
    cy.get("#modal-container").should("be.visible");
  });

  it("clicking on cancel should close the modal", () => {
    cy.get('button[data-testid="modal-cancel"]').click();
    cy.get("#modal-container").should("not.be.visible");
  });
});
