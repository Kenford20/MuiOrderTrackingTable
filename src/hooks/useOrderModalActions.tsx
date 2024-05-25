import { useContext, useState } from "react";
import { GlobalContext } from "../AppContext";
import { SelectChangeEvent } from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const menuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const orderTypes = [
  "Standard",
  "SaleOrder",
  "TransferOrder",
  "PurchaseOrder",
  "ReturnOrder",
];

const useOrderModalActions = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [orderType, setOrderType] = useState<string | undefined>(
    state.createOrderDraft?.orderType
  );

  const handleChange = (event: SelectChangeEvent<typeof orderType>) => {
    setOrderType(event.target.value);
  };

  const saveDraft = (stringifiedData: string) => {
    dispatch({
      type: "SAVE_DRAFT",
      payload: JSON.parse(stringifiedData),
    });
    sessionStorage.setItem("createOrderDraft", stringifiedData);
  };

  const createOrder = async (stringifiedData: string) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    const response = await fetch(
      "https://red-candidate-web.azurewebsites.net/api/Orders",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          ApiKey: import.meta.env.VITE_API_KEY,
        },
        body: stringifiedData,
      }
    );

    if (response.ok) {
      const newOrder = await response.json();
      dispatch({ type: "ADD_ORDER", payload: newOrder });
      dispatch({ type: "CLOSE_MODAL" });
      sessionStorage.removeItem("createOrderDraft");
    } else {
      console.log("trigger error state", response);
      window.alert("Failed to create order!");
    }
    dispatch({ type: "SET_IS_LOADING", payload: false });
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    interface SubmitEvent extends Event {
      submitter: HTMLButtonElement;
    }
    const submitButton = (event.nativeEvent as unknown as SubmitEvent)
      .submitter;
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    if (submitButton.value === "save") {
      saveDraft(JSON.stringify(formJson));
      return;
    }
    createOrder(JSON.stringify(formJson));
  };

  return {
    state,
    updateOrderType: handleChange,
    handleOnSubmit,
    menuProps,
    orderTypes,
    openModal: () => dispatch({ type: "OPEN_MODAL" }),
    closeModal: () => dispatch({ type: "CLOSE_MODAL" }),
  };
};

export { useOrderModalActions };
