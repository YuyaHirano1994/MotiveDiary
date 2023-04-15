import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button } from "@mui/material";

export function DialogModal(props) {
  const { onClose, title, message, type } = props;

  return (
    <Dialog open onClose={() => onClose("close")}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      {type ? (
        <DialogActions>
          <Button onClick={() => onClose("ok")}>OK</Button>
          <Button onClick={() => onClose("cancel")} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      ) : (
        <DialogActions>
          <Button onClick={() => onClose("ok")}>OK</Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
