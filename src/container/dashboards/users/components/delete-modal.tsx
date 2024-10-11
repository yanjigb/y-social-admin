import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import isEqual from 'react-fast-compare';
import Swal from 'sweetalert2';

import { Delete } from '../../../../services/user.service';
import { IUser } from '../../../../types/user';

interface DeleteModalProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  fetchUserList: Function;
  user: IUser;
}

const DeleteModal: React.FC<Readonly<DeleteModalProps>> = ({ open = false, onClose, fetchUserList, user }) => {
  const [confirmAlert, setConfirmAlert] = React.useState(false);

  React.useEffect(() => {
    if (confirmAlert) {
      Swal.fire({
        title: "Are you sure you want to delete this user?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Delete(user._id)
            .then(() => {
              Swal.fire({
                title: "Deleted!",
                text: "This user has been deleted.",
                icon: "success",
              });
              fetchUserList();
              onClose(false);
            })
            .catch((error) => {
              Swal.fire({
                title: "Error!",
                text: "There was an error deleting the user.",
                icon: "error",
              });
              console.log(error);
            });
          setConfirmAlert(false);
        } else {
          setConfirmAlert(false);
        }
      });
    }
  }, [confirmAlert, fetchUserList, user._id, onClose]);

  const handleDelete = () => {
    setConfirmAlert(true);
    onClose(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle>
        Delete User
        <b> {user.username} ?</b>
      </DialogTitle>

      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button onClick={handleDelete} color='error' variant='contained'>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(DeleteModal, isEqual);
