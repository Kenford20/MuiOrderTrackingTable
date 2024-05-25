import { Backdrop, CircularProgress } from "@mui/material";

export default function Loader({ open }: { open: boolean }) {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: "1500" }} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
