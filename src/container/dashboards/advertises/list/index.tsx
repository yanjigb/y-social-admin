import React, { ChangeEvent, memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import Swal from "sweetalert2";

import formatDate from "../../../../utils/date";
import { useNavigate } from "react-router-dom";
import { EAdvertiseStatus, IAdvertise } from "../../../../types/advertise";
import { CheckAdsTrending } from "../../../../lib/check-ads-trending";
import clsx from "clsx";
import { Delete, } from "../../../../services/ads.service";
import { toast } from "sonner";
import { currencyFormat } from "../../../../lib/currency-format";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { columns } from "./constant";
import LocalStorageKeys from "../../../../constants/local-storage-keys";

const badgeStyle = (status: EAdvertiseStatus) => {
  return status === EAdvertiseStatus.ACTIVE ? "bg-success" :
    status === EAdvertiseStatus.SCHEDULE ? "bg-warning" :
      "bg-danger";
};

const userID = localStorage.getItem(LocalStorageKeys.USER_ID)

interface Props {
  advertiseList: IAdvertise[];
}

const AdvertiseTableList = (props: Props) => {
  const { advertiseList } = props;

  const [searching, setSearching] = useState("");
  const navigate = useNavigate();

  const [advertiseId, setAdvertiseId] = useState<string | null>(null)
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const displayedAds = advertiseList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    console.log(event)
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteAdvertise = async () => {
    try {
      await Delete(userID, advertiseId);
      toast.success("Deleted successfully!");
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
            placeholder="Search by title..."
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
                {displayedAds.map((ads) => {
                  const { label, className } = CheckAdsTrending(ads.score);

                  return (
                    <TableRow
                      key={ads._id}
                      className="border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light"
                    >
                      <TableCell>{ads._id}</TableCell>
                      <TableCell>{ads.title}</TableCell>
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
    </>
  );
}

AdvertiseTableList.dislayName = "AdvertiseTableList";

export default memo(AdvertiseTableList, isEqual);
