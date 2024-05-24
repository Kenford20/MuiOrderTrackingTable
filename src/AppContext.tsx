import { createContext, useReducer, type Dispatch } from "react";
import { Order } from "./types/Order.types";

interface GlobalState {
  orders: Order[];
  filteredOrders: Order[];
  isLoading: boolean;
  isModalOpen: boolean;
}

const initialState: GlobalState = {
  orders: [],
  filteredOrders: [],
  isLoading: false,
  isModalOpen: false,
};

// interface Action {
//   type: string;
//   payload?: unknown;
// }

interface Store {
  state: GlobalState;
  dispatch: Dispatch<unknown>;
}

export const GlobalContext = createContext<Store>({} as Store);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reducer(state: GlobalState, action: any) {
  switch (action.type) {
    case "SET_ORDERS": {
      return {
        ...state,
        orders: action.payload,
        filteredOrders: action.payload,
      };
    }

    case "SET_FILTERED_ORDERS": {
      return {
        ...state,
        filteredOrders: action.payload,
      };
    }

    case "ADD_ORDER": {
      return {
        ...state,
        orders: [...state.orders, action.payload],
        filteredOrders: [...state.orders, action.payload],
      };
    }

    case "DELETE_ORDERS": {
      return {
        ...state,
        orders: state.orders.filter(
          (order) => !action.payload!.includes(order.orderId)
        ),
        filteredOrders: state.orders.filter(
          (order) => !action.payload.includes(order.orderId)
        ),
      };
    }

    case "OPEN_MODAL": {
      return {
        ...state,
        isModalOpen: true,
      };
    }

    case "CLOSE_MODAL": {
      return {
        ...state,
        isModalOpen: false,
      };
    }

    default:
      return state;
  }
}
