import App from "../App";
import { GlobalContext } from "../AppContext";

const state = {
  orders: [],
  filteredOrders: [],
  isLoading: false,
  isModalOpen: false,
};

describe("<App />", () => {
  beforeEach(() => {
    cy.mount(
      <GlobalContext.Provider value={{ state, dispatch }}>
        <App />
      </GlobalContext.Provider>
    );
  });
  it("renders", () => {
    cy.get("#root").should("be.visible");
  });
});
