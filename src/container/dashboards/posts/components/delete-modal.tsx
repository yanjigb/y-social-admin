import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import isEqual from 'react-fast-compare';
import Swal from 'sweetalert2';

import { Delete } from '../../../../services/post.service';
import { IPost } from '../../../../types/post';
import ErrorType from '../../../../constants/error';

interface DeleteModalProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  fetchPostList: Function;
  post: IPost;
}

const DeleteModal: React.FC<Readonly<DeleteModalProps>> = ({ open = false, onClose, fetchPostList, post }) => {
  const handleDeletePost = (postID: string) => {
    Delete(postID)
      .then(() => {
        fetchPostList();
        onClose(false);
      })
      .catch(() => {
        Swal.fire({
          title: `[${ErrorType.DELETE_POST}] Failed to delete this post`,
          text: "There was an error deleting the post.",
          icon: "error",
        });
      });
  };

  const showConfirmationDialog = async (): Promise<boolean> => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this post?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });
    onClose(false);
    return result.isConfirmed;
  };

  const handleDelete = async () => {
    onClose(false);

    const confirmed = await showConfirmationDialog();

    if (confirmed) {
      try {
        handleDeletePost(post._id);
        Swal.fire({
          title: "Deleted!",
          text: "This post has been deleted.",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: `[${ErrorType.DELETE_POST}] Failed to delete this post`,
          text: "There was an error deleting the post.",
          icon: "error",
        });
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle>
        Delete This Post ?
      </DialogTitle>

      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button onClick={handleDelete} color='error' variant='contained'>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(DeleteModal, isEqual);
