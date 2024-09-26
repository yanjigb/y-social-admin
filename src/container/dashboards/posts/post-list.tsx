import { FC, memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";

import Pageheader from "../../../components/common/pageheader/pageheader";

import { AllPosts } from "../../../services/post.service";
import PostTable from "./components/post-table";

interface UsersProps {}

const PostList: FC<UsersProps> = () => {
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    AllPosts("/").then((response: any) => {
      const { length } = response;
      setTotalPosts(length);
    });
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
                  Total Post: {totalPosts}
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
