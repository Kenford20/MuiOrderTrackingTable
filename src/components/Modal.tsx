import Select from "@mui/material/Select";
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
import { useOrderModalActions } from "../hooks/useOrderModalActions";

export default function ModalContainer() {
  const {
    state,
    updateOrderType,
    handleOnSubmit,
    menuProps,
    orderTypes,
    closeModal,
  } = useOrderModalActions();

  return (
    <Dialog
      id="modal-container"
      open={state.isModalOpen}
      onClose={closeModal}
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
            onChange={updateOrderType}
            input={<OutlinedInput label="Order Type" />}
            MenuProps={menuProps}
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
        <Button onClick={closeModal} data-testid="modal-cancel">
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
