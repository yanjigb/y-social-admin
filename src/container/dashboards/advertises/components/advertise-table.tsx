import React, { memo, useCallback, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { useDebounce } from "use-debounce";

import formatDate from "../../../../utils/date";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppPagination from "../../../../components/common/app-pagination";
// import usePersistState from "../../../../hooks/use-presist-state";
// import LocalStorageKeys from "../../../../constants/local-storage-keys";
import ResponseTime from "../../../../constants/resonse-time";
import { IAdvertise } from "src/types/advertise";
// import { mockAds } from "../../../../data/mock-data/mock-ads";
import { CheckAdsTrending } from "../../../../lib/check-ads-trending";
import clsx from "clsx";
import { Get, GetById } from "../../../../services/ads.service";
// import { RouteNames } from "../../../../types/routes";

const TableHeadList = [
  "ID",
  "User ID",
  "Title",
  "Description",
  "Budget",
  "Currency",
  "Schedule Start",
  "Schedule End",
  "Status",
  "Score",
  "Created At",
  "Updated At",
];

function AdvertiseTable() {
  // const [userList, setUserList] = useState<IUser[]>([]);
  // const [adsList, setAdsList] = useState<IAdvertise[]>(mockAds);
  // const [totalUsers, setTotalUsers] = usePersistState(
  //   0,
  //   LocalStorageKeys.TOTAL_USER
  // );
  const totalUsers = 0
  const [searching, setSearching] = useState("");
  // const [isEmpty, setIsEmpty] = useState(false);
  // const [isEmpty, setIsEmpty] = useState(false);
  const isEmpty = false;
  const navigate = useNavigate();

  const [debouncedFilter] = useDebounce(searching, ResponseTime.DEFAULT);
  const [searchParams] = useSearchParams();
  const pageNumber = parseInt(searchParams.get("page") || "1", 10);
  const ITEM_PER_PAGE = 14;
  // const [userId, setUserId] = useState<string>("");

  // const [openUpsertModal, setOpenUpsertModal] = useState(false);
  // const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // const [user, setAdvertise] = useState<IUser | any>({});
  const [advertiseList, setAdvertiseList] = useState<IAdvertise[]>([]);

  const fetchAdvertiseList = useCallback(
    async (filter: string) => {
      console.log(filter)
      // const query = filter
      //   ? `?username=${filter.toLowerCase()}`
      //   : `?limit=${ITEM_PER_PAGE}&skip=${pageNumber * 14}`;

      Get().then((res: any) =>
        setAdvertiseList(res)
      ).catch(err => console.log(err));
    },
    [pageNumber]
  );

  useEffect(() => {
    fetchAdvertiseList(debouncedFilter);
  }, [pageNumber, debouncedFilter]);

  useEffect(() => {
    console.log(advertiseList);
  }, [advertiseList]);

  const handleOpenUpsertModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    // const userId = e.currentTarget.getAttribute("data-id");
    // setOpenUpsertModal(!openUpsertModal);
    // setUserId(userId!);
    console.log(e)

    // GetById(userId).then((response: any) => {
    //   setUser(response.user);
    // });
  };

  const handleOpenDeleteModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const userId = e.currentTarget.getAttribute("data-id");
    GetById(userId).then(() => {
      // setUser(response.user);
    });

    // setOpenDeleteModal(true);
  };

  const handleOpenDetailAdvertise = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.getAttribute("data-id");
    navigate(`${id}`);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearching(e.target.value);
  };

  return (
    <>
      <div className="box-body">
        <div className="filter-container">
          <label htmlFor="search" className="form-label">
            Search ads
          </label>
          <input
            id="search"
            type="text"
            value={searching || ""}
            onChange={onSearch}
            className="form-control mb-4 border-2"
            placeholder="Search..."
            aria-labelledby="search"
          />
        </div>

        <div className="table-responsive">
          <table className="table table-hover whitespace-nowrap min-w-full table-bordered">
            <thead>
              <tr>
                {TableHeadList.map((title) => (
                  <th key={title} scope="col" className="text-start">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            {isEmpty ? (
              <td colSpan={TableHeadList.length}>ads not found</td>
            ) : (
              <tbody>
                {advertiseList.map((ads) => {
                  const { label, className } = CheckAdsTrending(ads.score);

                  return (
                    <tr
                      key={ads._id}
                      className="border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light"
                    >
                      <td>{ads._id}</td>
                      <td>{ads.userID}</td>
                      <td>{ads.title}</td>
                      <td>{ads.description}</td>
                      <td>{ads.budget}</td>
                      <td>{ads.currency}</td>
                      <td>
                        {formatDate(
                          ads.schedule_start,
                          "DATE_WITH_TIME"
                        )}
                      </td>
                      <td>
                        {formatDate(
                          ads.schedule_end!,
                          "DATE_WITH_TIME"
                        )}
                      </td>
                      <td>
                        <div
                          className={`py-1 px-2 text-white text-center rounded-md font-bold ${ads.status ? "bg-success" : "bg-danger"
                            }`}
                        >
                          {ads.status ? "Active" : "Disabled"}
                        </div>
                      </td>
                      <td>
                        <div
                          className={clsx(
                            "py-1 px-2 text-white text-center rounded-md font-bold",
                            className
                          )}
                        >
                          {label}
                        </div>
                      </td>
                      <td>
                        {formatDate(
                          ads.createdAt,
                          "DATE_WITH_TIME"
                        )}
                      </td>
                      <td>
                        {formatDate(
                          ads.updatedAt,
                          "DATE_WITH_TIME"
                        )}
                      </td>
                      <td className="flex gap-2">
                        <div className="space-x-2 rtl:space-x-reverse">
                          <button
                            aria-label="button"
                            type="button"
                            className="ti-btn ti-btn-sm ti-btn-warning"
                            data-id={ads._id}
                            onClick={handleOpenDetailAdvertise}
                          >
                            <i className="ri-eye-line"></i>
                          </button>
                          <button
                            aria-label="button"
                            type="button"
                            className="ti-btn ti-btn-sm ti-btn-info"
                            // data-id={user._id}
                            onClick={handleOpenUpsertModal}
                          >
                            <i className="ri-pencil-line"></i>
                          </button>
                          <button
                            aria-label="button"
                            type="button"
                            className="ti-btn ti-btn-sm ti-btn-danger contact-delete"
                            // data-id={user._id}
                            onClick={handleOpenDeleteModal}
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {/* <UpsertModal
        open={openUpsertModal}
        onClose={setOpenUpsertModal}
        userId={userId}
        fetchUserList={fetchUsers}
        user={user}
      />
      <DeleteModal
        open={openDeleteModal}
        onClose={setOpenDeleteModal}
        fetchUserList={fetchUsers}
        user={user}
      /> */}
      {/* <AdvertiseDetail user={user} /> */}

      <div className="box-footer">
        <AppPagination pageCount={Math.ceil(totalUsers / ITEM_PER_PAGE)} />
      </div>
    </>
  );
}

export default memo(AdvertiseTable, isEqual);
