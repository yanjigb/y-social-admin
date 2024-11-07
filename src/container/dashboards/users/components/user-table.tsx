import React, { memo, useCallback, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { useDebounce } from "use-debounce";

import { IUser } from "../../../../types/user";
import { useSearchParams } from "react-router-dom";
import AppPagination from "../../../../components/common/app-pagination";
import { AllUsers, GetById } from "../../../../services/user.service";
import UpsertModal from "./upsert-modal";
import DeleteModal from "./delete-modal";
import UserDetail from "./user-detail";
import AppAvatar from "../../../../components/features/app-avatar";
import usePersistState from "../../../../hooks/use-presist-state";
import LocalStorageKeys from "../../../../constants/local-storage-keys";
import ResponseTime from "../../../../constants/resonse-time";
import ROLE from "../../../../constants/role";
import clsx from "clsx";

const TableHeadList = [
  'ID',
  'Username',
  'Avatar',
  'Balance',
  'Followers',
  'Followings',
  'Verify',
  'Verify Email',
  'Restrictive',
  'Role',
  'Action',
];

const roleColors = {
  [ROLE.SUPER_ADMIN_PROFILE.id]: {
    label: ROLE.SUPER_ADMIN_PROFILE.name,
    style: "bg-primary text-white"
  },
  [ROLE.ADMIN_PROFILE.id]: {
    label: ROLE.ADMIN_PROFILE.name,
    style: "bg-danger text-white"
  },
  [ROLE.STAFF_PROFILE.id]: {
    label: ROLE.STAFF_PROFILE.name,
    style: "bg-warning text-white"
  },
  [ROLE.USER_PROFILE.id]: {
    label: ROLE.USER_PROFILE.name,
    style: "border border-blue"
  },
} as const

function UserTable() {
  const [userList, setUserList] = useState<IUser[]>([]);
  const [totalUsers, setTotalUsers] = usePersistState(0, LocalStorageKeys.TOTAL_USER);
  const [searching, setSearching] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  const [debouncedFilter] = useDebounce(searching, ResponseTime.DEFAULT);
  const [searchParams] = useSearchParams();
  const pageNumber = parseInt(searchParams.get('page') || '1', 10);
  const ITEM_PER_PAGE = 14;
  const [userId, setUserId] = useState<string>("");

  const [openUpsertModal, setOpenUpsertModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [user, setUser] = useState<IUser | any>({});

  const fetchUsers = useCallback(async (filter: string) => {
    const query = filter
      ? `?username=${filter.toLowerCase()}`
      : `?limit=${ITEM_PER_PAGE}&skip=${pageNumber * 14}`;

    AllUsers(query).then((response: any) => {
      const { users, totalUsers } = response;
      const userList = users;
      setTotalUsers(totalUsers);

      if (userList.length > 0) {
        setUserList(userList);
        setIsEmpty(false);
      } else {
        setUserList([]);
        setIsEmpty(true);
      }
    });
  }, [pageNumber]);

  useEffect(() => {
    fetchUsers(debouncedFilter);
  }, [pageNumber, debouncedFilter]);

  const handleOpenUpsertModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const userId = e.currentTarget.getAttribute('data-id');
    setOpenUpsertModal(!openUpsertModal);
    setUserId(userId!);

    GetById(userId).then((response: any) => {
      setUser(response.user);
    });
  };

  const handleOpenDeleteModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const userId = e.currentTarget.getAttribute('data-id');
    GetById(userId).then((response: any) => {
      setUser(response.user);
    });

    setOpenDeleteModal(true);
  };

  const handleOpenDetailUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    const userId = e.currentTarget.getAttribute('data-id');
    GetById(userId).then((response: any) => {
      setUser(response.user);
    });
  };

  return (
    <>
      <div className="box-body">
        <div className="filter-container">
          <label htmlFor="search" className="form-label">Search user</label>
          <input
            id="search"
            type="text"
            value={searching || ''}
            onChange={(e) => setSearching(e.target.value)}
            className="form-control mb-4 border-2"
            placeholder="Search..."
            aria-labelledby="search"
          />
        </div>

        <div className="table-responsive">
          <table className="table table-hover whitespace-nowrap min-w-full table-bordered">
            <thead>
              <tr>
                {
                  TableHeadList.map(title => (
                    <th key={title} scope="col" className="text-start">
                      {title}
                    </th>
                  ))
                }
              </tr>
            </thead>

            {isEmpty ? <td colSpan={TableHeadList.length}>user not found</td> : <tbody>
              {userList.map((user) => (
                <tr key={user._id} className="border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light">
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>
                    <div className="avatar avatar-sm avatar-rounded">
                      <AppAvatar imageSrc={user?.profilePicture} userId={user._id} label={user.username} customClass='bg-info' />
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {user.balance}
                    </div>
                  </td>
                  <td>
                    {user.followers.length}
                  </td>
                  <td>
                    {user.followings.length}
                  </td>
                  <td>
                    <div className={`py-1 px-2 text-white text-center rounded-md font-bold ${user.isVerify ? 'bg-success' : 'bg-danger'}`}>
                      {user.isVerify ? 'Verified' : 'Not verified'}
                    </div>
                  </td>
                  <td>
                    <div className={`py-1 px-2 text-white text-center rounded-md font-bold ${user.isVerifyEmail ? 'bg-success' : 'bg-danger'}`}>
                      {user.isVerifyEmail ? 'Verified' : 'Not verified'}
                    </div>
                  </td>
                  <td>
                    <div
                      className='py-1 px-2 bg-success/10 text-success text-center rounded-md'
                    >
                      😄 Healthy
                    </div>
                  </td>
                  <td>
                    <div
                      className={clsx('py-1 px-2 text-center rounded-md', roleColors[user.role].style)}
                    >
                      {roleColors[user.role].label}
                    </div>
                  </td>
                  <td className="flex gap-2">
                    <div className='space-x-2 rtl:space-x-reverse'>
                      <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-warning" data-hs-overlay="#hs-overlay-contacts" data-id={user._id} onClick={handleOpenDetailUser}><i className="ri-eye-line"></i></button>
                      <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-info" data-id={user._id} onClick={handleOpenUpsertModal}><i className="ri-pencil-line"></i></button>
                      <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-danger contact-delete" data-id={user._id} onClick={handleOpenDeleteModal}><i className="ri-delete-bin-line"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>}
          </table>
        </div>
      </div >

      <UpsertModal open={openUpsertModal} onClose={setOpenUpsertModal} userId={userId} fetchUserList={fetchUsers} user={user} />
      <DeleteModal open={openDeleteModal} onClose={setOpenDeleteModal} fetchUserList={fetchUsers} user={user} />
      <UserDetail user={user} />

      <div className="box-footer">
        <AppPagination
          pageCount={Math.ceil(totalUsers / ITEM_PER_PAGE)}
        />
      </div>
    </>
  );
}

export default memo(UserTable, isEqual);
