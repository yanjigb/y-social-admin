import React, { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { useDebounce } from "use-debounce";
import Swal from "sweetalert2";

import formatDate from "../../../../utils/date";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppPagination from "../../../../components/common/app-pagination";
// import usePersistState from "../../../../hooks/use-presist-state";
// import LocalStorageKeys from "../../../../constants/local-storage-keys";
import ResponseTime from "../../../../constants/resonse-time";
import { EAdvertiseStatus, IAdvertise } from "../../../../types/advertise";
// import { mockAds } from "../../../../data/mock-data/mock-ads";
import { CheckAdsTrending } from "../../../../lib/check-ads-trending";
import clsx from "clsx";
import { Delete, Get } from "../../../../services/ads.service";
import { toast } from "sonner";
import { currencyFormat } from "../../../../lib/currency-format";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { columns } from "../components/constant";
// import { RouteNames } from "../../../../types/routes";

const badgeStyle = (status: EAdvertiseStatus) => {
  return status === EAdvertiseStatus.ACTIVE ? "bg-success" :
    status === EAdvertiseStatus.SCHEDULE ? "bg-warning" :
      "bg-danger";
};


const AdvertiseTableList = () => {
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

  // const [openUpsertModal, setOpenUpsertModal] = useState(false);
  // const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // const [user, setAdvertise] = useState<IUser | any>({});
  const [advertiseList, setAdvertiseList] = useState<IAdvertise[]>([]);
  const [advertiseId, setAdvertiseId] = useState<string | null>(null)
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

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

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(event)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteAdvertise = async () => {
    console.log(advertiseId)
    try {
      await Delete('65a0dcccfa6ca1e9ba94c698', advertiseId);
      toast.success("Deleted successfully!");
      fetchAdvertiseList("1");
    } catch (error) {
      toast.error("Something went wrong");
      Swal.fire({
        title: "Delete Failed"
      })
    } finally {
      setOpenDeleteModal(false);
    }
  };

  const showConfirmDeleteDialog = async (): Promise<boolean> => {
    const result = await Swal.fire({
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B8001F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete now",
    })

    setOpenDeleteModal(false);
    return result.isConfirmed;
  }

  useEffect(() => {
    const confirmDelete = async () => {
      if (openDeleteModal && advertiseId) {
        const confirmed = await showConfirmDeleteDialog();

        if (confirmed) {
          handleDeleteAdvertise();
        }
      }
    };

    confirmDelete();
  }, [openDeleteModal, advertiseId]);

  const handleOpenDeleteDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    const adId = e.currentTarget.getAttribute("data-id");
    setAdvertiseId(adId || null);
    setOpenDeleteModal(true);
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

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {advertiseList.map((ads) => {
                  const { label, className } = CheckAdsTrending(ads.score);

                  return (
                    <TableRow
                      key={ads._id}
                      className="border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light"
                    >
                      <TableCell>{ads._id}</TableCell>
                      <TableCell>{ads.userID}</TableCell>
                      <TableCell>{ads.title}</TableCell>
                      <TableCell>{ads.description}</TableCell>
                      <TableCell>{currencyFormat(ads.budget)}</TableCell>
                      <TableCell>{ads.currency}</TableCell>
                      <TableCell>
                        {formatDate(
                          ads.schedule_start,
                          "DATE_WITH_TIME"
                        )}
                      </TableCell>
                      <TableCell>
                        {formatDate(
                          ads.schedule_end!,
                          "DATE_WITH_TIME"
                        )}
                      </TableCell>
                      <TableCell>
                        <div
                          className={clsx("capitalize py-1 px-2 text-white text-center rounded-md font-bold",
                            badgeStyle(ads.status)
                          )}
                        >
                          {ads.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={clsx(
                            "py-1 px-2 text-white text-center rounded-md font-bold",
                            className
                          )}
                        >
                          {label}
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatDate(
                          ads.createdAt,
                          "DATE_WITH_TIME"
                        )}
                      </TableCell>
                      <TableCell>
                        {formatDate(
                          ads.updatedAt,
                          "DATE_WITH_TIME"
                        )}
                      </TableCell>
                      <TableCell className="flex gap-2" align="right">
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
                            className="ti-btn ti-btn-sm ti-btn-danger contact-delete"
                            data-id={ads._id}
                            onClick={handleOpenDeleteDialog}
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={advertiseList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>

      <div className="box-footer">
        <AppPagination pageCount={Math.ceil(totalUsers / ITEM_PER_PAGE)} />
      </div>
    </>
  );
}

export default memo(AdvertiseTableList, isEqual);
