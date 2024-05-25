import { useContext, useState } from "react";
import { GlobalContext } from "../AppContext";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
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

export default function ModalContainer() {
  const { state, dispatch } = useContext(GlobalContext);
  console.log("state", state);
  console.log("tpe", state.createOrderDraft?.orderType);
  const [orderType, setOrderType] = useState<string | undefined>(
    state.createOrderDraft?.orderType
  );
  console.log("tpe2", orderType);

  const handleChange = (event: SelectChangeEvent<typeof orderType>) => {
    setOrderType(event.target.value);
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    interface SubmitEvent extends Event {
      submitter: HTMLButtonElement;
    }
    const submitButton = (event.nativeEvent as unknown as SubmitEvent)
      .submitter;
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    if (submitButton.value === "save") {
      dispatch({
        type: "SAVE_DRAFT",
        payload: JSON.parse(JSON.stringify(formJson)),
      });
      sessionStorage.setItem("createOrderDraft", JSON.stringify(formJson));
      return;
    }

    const response = await fetch(
      "https://red-candidate-web.azurewebsites.net/api/Orders",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          ApiKey: import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify(formJson),
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
  };

  return (
    <Dialog
      open={state.isModalOpen}
      onClose={() => dispatch({ type: "CLOSE_MODAL" })}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleOnSubmit(event);
        },
      }}
    >
      <DialogTitle>Create Order</DialogTitle>
      <DialogContent>
        <DialogContentText>Pls fill out the form.</DialogContentText>
        <TextField
          required
          size="small"
          margin="normal"
          id="order-creator"
          name="createdByUserName"
          label="Full Name"
          type="text"
          fullWidth
          defaultValue={state.createOrderDraft?.createdByUserName || ""}
        />
        <TextField
          required
          size="small"
          margin="normal"
          id="company"
          name="customerName"
          label="Company"
          type="text"
          fullWidth
          defaultValue={state.createOrderDraft?.customerName || ""}
        />
        <FormControl sx={{ width: 250, mt: "15px" }} size="small">
          <InputLabel id="create-order-type-label">Order Type</InputLabel>
          <Select
            required
            labelId="create-order-type-label"
            name="orderType"
            id="create-order-type"
            defaultValue={state.createOrderDraft?.orderType || ""}
            onChange={handleChange}
            input={<OutlinedInput label="Order Type" />}
            MenuProps={MenuProps}
          >
            {orderTypes.map((orderType) => (
              <MenuItem key={orderType} value={orderType}>
                {orderType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" value="save">
          Save As Draft
        </Button>
        <Button
          variant="contained"
          type="submit"
          color="success"
          value="create"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
