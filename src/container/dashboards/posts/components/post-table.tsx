import React, { memo, useCallback, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { useDebounce } from "use-debounce";

import formatDate from "../../../../utils/date";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppPagination from "../../../../components/common/app-pagination";
import {
  GetById,
  AllPosts,
  GetByAuthor,
} from "../../../../services/post.service";
import { GetById as GetUserInfo } from "../../../../services/user.service";
import UpsertModal from "./upsert-modal";
import DeleteModal from "./delete-modal";
import { IPost } from "../../../../types/post";
import UserDetail from "../../users/components/user-detail";
import { IUser } from "../../../../types/user";
import usePersistState from "../../../../hooks/use-presist-state";
import LocalStorageKeys from "../../../../constants/local-storage-keys";
import ResponseTime from "../../../../constants/resonse-time";
import ROLE from "../../../..//constants/role";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const TableHeadList = [
  "ID",
  "Author",
  "Likes",
  "Comments",
  "Shares",
  "Restrictive",
  "Created At",
  "Updated At",
  "Action",
];
const ITEM_PER_PAGE = 10;
const role = localStorage.getItem(LocalStorageKeys.ROLE);
const isAllowRole = Number(role) === ROLE.ADMIN_PROFILE.id || Number(role) === ROLE.STAFF_PROFILE.id || Number(role) === ROLE.SUPER_ADMIN_PROFILE.id;
const userID = localStorage.getItem(LocalStorageKeys.USER_ID)

function PostTable() {
  const [postList, setPostList] = useState<IPost[]>([]);
  const [totalPosts, setTotalPosts] = usePersistState(
    0,
    LocalStorageKeys.TOTAL_POST
  );
  const [searching, setSearching] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const [searchParams] = useSearchParams();
  const [debouncedFilter] = useDebounce(searching, ResponseTime.DEFAULT);

  const [openUpsertModal, setOpenUpsertModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [post, setPost] = useState<IPost | any>({});
  const [author, setAuthor] = useState<IUser | any>({});

  const navigate = useNavigate();
  const pageNumber = parseInt(searchParams.get("page") ?? "1", 10);

  const fetchBySearch = useCallback(
    async (filter: string) => {
      if (filter) {
        const lowerCaseFilter = filter.toLowerCase();
        const filterResult = postList.filter((item: IPost) => {
          const { _id, userID, desc } = item;
          return [_id, userID, desc].some(attr => attr.toLowerCase().includes(lowerCaseFilter));
        });

        if (filterResult.length > 0) {
          setPostList(filterResult);
          setIsEmpty(false);
        } else {
          setPostList([]);
          setIsEmpty(true);
        }
      } else {
        fetchPostList();
      }
    },
    [debouncedFilter]
  );

  useEffect(() => {
    fetchBySearch(debouncedFilter);
  }, [debouncedFilter]);

  const fetchPostList = useCallback(async () => {
    const res: any = isAllowRole ? await AllPosts("/") : await GetByAuthor(userID);
    const postList = res.posts;

    const startIndex = (pageNumber - 1) * ITEM_PER_PAGE;
    const endIndex = startIndex + ITEM_PER_PAGE;
    const limitedPosts = postList.slice(startIndex, endIndex);

    setTotalPosts(postList.length);

    if (limitedPosts.length > 0) {
      setPostList(limitedPosts);
      setIsEmpty(false);
    } else {
      setPostList([]);
      setIsEmpty(true);
    }
  }, [pageNumber, postList]);

  useEffect(() => {
    fetchPostList();
  }, [pageNumber]);

  const handleOpenDeleteModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const postId = e.currentTarget.getAttribute("data-id");
    GetById(postId).then((response: any) => {
      setPost(response.data);
    });

    setOpenDeleteModal(true);
  };

  const handleOpenUpsertPost = (e: React.MouseEvent<HTMLButtonElement>) => {
    const postId = e.currentTarget.getAttribute("data-id");
    GetById(postId).then((response) => {
      setPost(response.data);
    });
    setOpenUpsertModal(!openUpsertModal);
  };

  const handleOpenDetailPost = (e: React.MouseEvent<HTMLButtonElement>) => {
    const postId = e.currentTarget.getAttribute("data-id");
    navigate(`/dashboards/post/${postId}`);
  };

  const handleOpenDetailUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    const userId = e.currentTarget.getAttribute("data-id");
    GetUserInfo(userId).then((response: any) => {
      setAuthor(response.user);
    });
  };

  return (
    <>
      <div className="box-body">
        <div className="filter-container">
          <label htmlFor="search" className="form-label">
            Search post
          </label>
          <input
            id="search"
            type="text"
            value={searching || ""}
            onChange={(e) => setSearching(e.target.value)}
            className="form-control mb-4 border-2"
            placeholder="Search..."
            aria-labelledby="search"
          />
        </div>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table" className="table table-hover whitespace-nowrap min-w-full table-bordered">
              <TableHead>
                <TableRow>
                  {TableHeadList.map((title) => (
                    <TableCell key={title} scope="col" className="text-start">
                      {title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {
                  isEmpty ? <tr>
                    <td colSpan={TableHeadList.length}>post not found</td>
                  </tr> :
                    postList.map((post) => (
                      <TableRow
                        key={post._id}
                        className="border border-inherit border-solid hover:bg-gray-100 dark:border-default border/10 dark:hover:bg-light"
                      >
                        <TableCell>{post._id}</TableCell>
                        <TableCell>
                          <button
                            aria-label="button"
                            type="button"
                            data-hs-overlay="#hs-overlay-contacts"
                            data-id={post.userID}
                            onClick={handleOpenDetailUser}
                            className="text-info"
                          >
                            {post.userID}
                          </button>
                        </TableCell>
                        <TableCell>{post.likes.length}</TableCell>
                        <TableCell>{post.comments.length}</TableCell>
                        <TableCell>{post.shares.length}</TableCell>
                        <TableCell>
                          <div className="py-1 px-2 bg-success/10 text-center text-success !rounded-full">
                            😄 Healthy
                          </div>
                        </TableCell>
                        <TableCell>
                          {formatDate(
                            post.createdAt,
                            "DATE_WITH_MONTH_FIRST_WITH_TIME"
                          )}
                        </TableCell>
                        <TableCell>
                          {formatDate(
                            post.updatedAt,
                            "DATE_WITH_MONTH_FIRST_WITH_TIME"
                          )}
                        </TableCell>
                        <TableCell className="flex gap-2">
                          <div className="space-x-2 rtl:space-x-reverse">
                            <button
                              aria-label="button"
                              type="button"
                              className="ti-btn ti-btn-sm ti-btn-warning"
                              data-hs-overlay="#hs-overlay-contacts"
                              data-id={post._id}
                              onClick={handleOpenDetailPost}
                            >
                              <i className="ri-eye-line"></i>
                            </button>
                            <button
                              aria-label="button"
                              type="button"
                              className="ti-btn ti-btn-sm ti-btn-info"
                              onClick={handleOpenUpsertPost}
                              data-id={post._id}
                            >
                              <i className="ri-pencil-line"></i>
                            </button>
                            <button
                              aria-label="button"
                              type="button"
                              className="ti-btn ti-btn-sm ti-btn-danger contact-delete"
                              data-id={post._id}
                              onClick={handleOpenDeleteModal}
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>

      {openUpsertModal && (
        <UpsertModal
          open={openUpsertModal}
          onClose={setOpenUpsertModal}
          fetchPostList={fetchPostList}
          post={post}
        />
      )}
      {openDeleteModal && (
        <DeleteModal
          open={openDeleteModal}
          onClose={setOpenDeleteModal}
          fetchPostList={fetchPostList}
          post={post}
        />
      )}
      <UserDetail user={author} />

      <div className="box-footer">
        <AppPagination pageCount={Math.ceil(totalPosts / ITEM_PER_PAGE)} />
      </div>
    </>
  );
}

export default memo(PostTable, isEqual);
