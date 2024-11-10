import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import isEqual from 'react-fast-compare';
import Swal from 'sweetalert2';
import { z, ZodType } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UpdateInfo } from '../../../../services/user.service';
import { IUser } from '../../../../types/user';
import ROLE from '../../../../constants/role';

interface UpsertModalProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  fetchUserList: Function
  user: IUser
}

interface IFormData {
  username: string;
  email: string;
  verifyStatus: boolean;
  verifyEmailStatus: boolean;
  role: number;
}

const UserSchema: ZodType<IFormData> = z.object({
  username: z.string().min(2, { message: "Must be at least 2 characters long" }),
  email: z.string().email(),
  verifyStatus: z.coerce.boolean(),
  verifyEmailStatus: z.coerce.boolean(),
  role: z.number(),
});

const UpsertModal: React.FC<Readonly<UpsertModalProps>> = ({ open = false, onClose, userId, fetchUserList, user }) => {
  const [confirmAlert, setConfirmAlert] = React.useState(false);
  const [formData, setFormData] = React.useState({})

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormData>({
    resolver: zodResolver(UserSchema),
  });

  React.useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        verifyStatus: user.isVerify ? true : false,
        verifyEmailStatus: user.isVerifyEmail ? true : false,
        role: user.role
      });
    }
  }, [user, reset]);


  React.useEffect(() => {
    if (confirmAlert) {
      Swal.fire({
        title: "Are you sure to update?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Update Now"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Updated Successfully! 😎",
            text: "This user has been updated",
          });
          UpdateInfo(formData).then((data) => {
            console.log(data)
            fetchUserList()
          })
          setConfirmAlert(false);
        }
      });
    }
  }, [confirmAlert]);

  const submitData: SubmitHandler<IFormData> = (data: IFormData, event) => {
    event?.preventDefault();

    const { verifyStatus, verifyEmailStatus } = data;
    setFormData({ ...data, isVerify: verifyStatus, isVerifyEmail: verifyEmailStatus, userId })

    onClose(false);
    setConfirmAlert(true)
  }

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(submitData)
      }}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>
        Update Info Of User
        <b> {user.username}</b>
      </DialogTitle>

      <DialogContent className='grid grid-cols-1 gap-6'>
        <div>
          <label htmlFor="username" aria-labelledby='username label'>Username</label>
          <input
            required
            {...register("username")}
            id="username"
            type="text"
            placeholder='username'
            className="block w-full rounded-md bg-gray-200 border-transparent focus:ring-0"
            aria-labelledby='username'
            defaultValue={user.username}
          />
          {errors.username && <span className='text-red'>{errors.username.message}</span>}
        </div>

        <div>
          <label htmlFor='email' aria-labelledby='email label'>Email</label>
          <input
            required
            {...register("email")}
            id="email"
            type="email"
            placeholder='email'
            className="block w-full rounded-md bg-gray-200 border-transparent focus:ring-0"
            aria-labelledby='email'
            defaultValue={user.email}
          />
          {errors.email && <span className='text-red'>{errors.email.message}</span>}
        </div>

        <label className="block">
          <span className="text-gray-700">Verify status</span>
          <select
            {...register("verifyStatus")}
            defaultChecked={user.isVerify}
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value={"true"}>Verified</option>
            <option value={"false"}>Not verified</option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Verify email status</span>
          <select
            {...register("verifyEmailStatus")}
            defaultChecked={user.isVerifyEmail}
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value={"true"}>Verified</option>
            <option value={"false"}>Not verified</option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Role</span>
          <select
            {...register("role", { valueAsNumber: true })}
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value={ROLE.ADMIN_PROFILE.id}>Admin</option>
            <option value={ROLE.SUPER_ADMIN_PROFILE.id}>Super Admin</option>
            <option value={ROLE.STAFF_PROFILE.id}>Staff</option>
            <option value={ROLE.USER_PROFILE.id}>User</option>
          </select>
        </label>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose(false)} color='error'>Cancel</Button>
        <Button type="submit" variant='contained'>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(UpsertModal, isEqual);
