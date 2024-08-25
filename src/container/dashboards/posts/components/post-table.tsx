import React, { memo, useCallback, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { useDebounce } from "use-debounce";

import formatDate from "../../../../utils/date";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppPagination from "../../../../components/common/app-pagination";
import { GetById, AllPosts, GetByContent } from "../../../../services/post.service";
import { GetById as GetUserInfo } from "../../../../services/user.service";
import UpsertModal from "./upsert-modal";
import DeleteModal from "./delete-modal";
import { IPost } from "../../../../types/post";
import UserDetail from "../../users/components/user-detail";
import { IUser } from "../../../../types/user";
import usePersistState from "../../../../hooks/usePresistState";
import LocalStorageKeys from "../../../../constants/local-storage-keys";
import ResponseTime from "../../../../constants/resonse-time";

const TableHeadList = [
  'ID',
  'Author',
  'Likes',
  'Comments',
  'Shares',
  'Restrictive',
  'Created At',
  'Updated At',
  'Action',
];
const ITEM_PER_PAGE = 14;

function PostTable() {
  const [postList, setPostList] = useState<IPost[]>([]);
  const [totalPosts, setTotalPosts] = usePersistState(0, LocalStorageKeys.TOTAL_POST);
  const [searching, setSearching] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  const [searchParams] = useSearchParams();
  const [debouncedFilter] = useDebounce(searching, ResponseTime.DEFAULT);

  const [openUpsertModal, setOpenUpsertModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [post, setPost] = useState<IPost | any>({});
  const [author, setAuthor] = useState<IUser | any>({});

  const navigate = useNavigate();
  const pageNumber = parseInt(searchParams.get('page') ?? '1', 10);

  const fetchBySearch = useCallback(async (filter: string) => {
    GetByContent(filter).then((response: any) => {
      const { data } = response

      if (data.length > 0) {
        setPostList(data);
        setIsEmpty(false);
      } else {
        setPostList([]);
        setIsEmpty(true);
      }
    })
  }, [debouncedFilter])

  useEffect(() => {
    fetchBySearch(debouncedFilter)
  }, [debouncedFilter])

  const fetchPostList = useCallback(async () => {
    const query = `?limit=${ITEM_PER_PAGE}&skip=${(pageNumber - 1) * 14}`;

    AllPosts(query).then((response: any) => {
      const { posts, length } = response;
      setTotalPosts(length);

      if (posts.length > 0) {
        setPostList(posts);
        setIsEmpty(false);
      } else {
        setPostList([]);
        setIsEmpty(true);
      }
    });
  }, [pageNumber]);

  useEffect(() => {
    fetchPostList();
  }, [pageNumber]);

  const handleOpenDeleteModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const postId = e.currentTarget.getAttribute('data-id');
    GetById(postId).then((response: any) => {
      setPost(response.data);
    });

    setOpenDeleteModal(true);
  };

  const handleOpenUpsertPost = (e: React.MouseEvent<HTMLButtonElement>) => {
    const postId = e.currentTarget.getAttribute('data-id');
    GetById(postId).then(response => {
      setPost(response.data);
    });
    setOpenUpsertModal(!openUpsertModal);
  };

  const handleOpenDetailPost = (e: React.MouseEvent<HTMLButtonElement>) => {
    const postId = e.currentTarget.getAttribute('data-id');
    navigate(`/dashboards/post/${postId}`);
  };

  const handleOpenDetailUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    const userId = e.currentTarget.getAttribute('data-id');
    GetUserInfo(userId).then((response: any) => {
      setAuthor(response.user);
    });
  };

  return (
    <>
      <div className="box-body">
        <div className="filter-container">
          <label htmlFor="search" className="form-label">Search post</label>
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

            {isEmpty ?
              <tr>
                <td colSpan={TableHeadList.length}>post not found</td>
              </tr> : <tbody>
                {postList.map((post) => (
                  <tr key={post._id} className="border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light">
                    <td>{post._id}</td>
                    <td>
                      <button aria-label="button" type="button" data-hs-overlay="#hs-overlay-contacts" data-id={post.userID} onClick={handleOpenDetailUser} className="text-info">
                        {post.userID}
                      </button>
                    </td>
                    <td>{post.likes.length}</td>
                    <td>{post.comments.length}</td>
                    <td>{post.shares.length}</td>
                    <td>
                      <div
                        className='py-1 px-2 bg-success/10 text-success !rounded-full'
                      >
                        😄 Healthy
                      </div>
                    </td>
                    <td>
                      {formatDate(post.createdAt, "DATE_WITH_MONTH_FIRST_WITH_TIME")}
                    </td>
                    <td>
                      {formatDate(post.updatedAt, "DATE_WITH_MONTH_FIRST_WITH_TIME")}
                    </td>
                    <td className="flex gap-2">
                      <div className='space-x-2 rtl:space-x-reverse'>
                        <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-warning" data-hs-overlay="#hs-overlay-contacts" data-id={post._id} onClick={handleOpenDetailPost}><i className="ri-eye-line"></i></button>
                        <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-info" onClick={handleOpenUpsertPost} data-id={post._id}><i className="ri-pencil-line"></i></button>
                        <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-danger contact-delete" data-id={post._id} onClick={handleOpenDeleteModal}><i className="ri-delete-bin-line"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>}
          </table>
        </div>
      </div >

      {openUpsertModal && <UpsertModal open={openUpsertModal} onClose={setOpenUpsertModal} fetchPostList={fetchPostList} post={post} />}
      {openDeleteModal && <DeleteModal open={openDeleteModal} onClose={setOpenDeleteModal} fetchPostList={fetchPostList} post={post} />}
      <UserDetail user={author} />

      <div className="box-footer">
        <AppPagination
          pageCount={Math.ceil(totalPosts / ITEM_PER_PAGE)}
        />
      </div>
    </>
  );
}

export default memo(PostTable, isEqual);
