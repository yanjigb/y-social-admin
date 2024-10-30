import { FC, memo, useCallback, useEffect, useState } from "react";
import isEqual from "react-fast-compare";

import Pageheader from "../../../components/common/pageheader/pageheader";

import { AllPosts, GetByAuthor } from "../../../services/post.service";
import PostTable from "./components/post-table";
import LocalStorageKeys from "../../../constants/local-storage-keys";
import ROLE from "../../../constants/role";
import { IPost } from "../../../types/post";
import { toast } from "sonner";

interface UsersProps {}
const role = localStorage.getItem(LocalStorageKeys.ROLE);
const userID = localStorage.getItem(LocalStorageKeys.USER_ID)
const isAllowRole = Number(role) === ROLE.ADMIN_PROFILE.id || Number(role) === ROLE.STAFF_PROFILE.id || Number(role) === ROLE.SUPER_ADMIN_PROFILE.id;

const PostList: FC<UsersProps> = () => {
  const [postList, setPostList] = useState<IPost[]>([]);

  const fetchPostList = useCallback(async () => {
    try {
      const res: any = isAllowRole ? await AllPosts("/") : await GetByAuthor(userID);
      setPostList(res.posts);
    } catch {
      toast.error("Something went wrong");
    }
  }, []);

  useEffect(() => {
    fetchPostList();
  }, []);

  return (
    <>
      <Pageheader
        currentpage="Posts"
        activepage="Dashboards"
        mainpage="Posts"
      />

      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-col-12 col-span-12">
          <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
            <div className="box">
              <div className="box-header justify-between flex-wrap">
                <h2 className="box-title mb-2 sm:mb-0">
                  Total Post: {postList.length}
                </h2>
              </div>

              <PostTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(PostList, isEqual);
