import { FC, memo, useCallback, useEffect, useState } from "react";
import isEqual from "react-fast-compare";

import Pageheader from "../../../components/common/pageheader/pageheader";

import UserTable from "./components/user-table";
import { AllUsers } from "../../../services/user.service";

interface UsersProps {}

const Users: FC<UsersProps> = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = useCallback(async () => {
    try {
      const response: any = await AllUsers("/");
      const { totalUsers } = response;
      setTotalUsers(totalUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }, []);

  useEffect(() => {
    if (totalUsers === 0) {
      fetchUsers();
    }
  }, [fetchUsers, totalUsers]);

  return (
    <>
      <Pageheader
        currentpage="Users"
        activepage="Dashboards"
        mainpage="Users"
      />

      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-col-12 col-span-12">
          <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
            <div className="box">
              <div className="box-header justify-between flex-wrap">
                <h2 className="box-title mb-2 sm:mb-0">
                  Manage User: {totalUsers}
                </h2>
              </div>

              <UserTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Users, isEqual);
