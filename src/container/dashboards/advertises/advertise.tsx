import { FC, memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";

import Pageheader from "../../../components/common/pageheader/pageheader";

import AdvertiseTable from "./components/advertise-table";
import { AllUsers } from "../../../services/user.service";

interface UsersProps {}

const Advertises: FC<UsersProps> = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    AllUsers("/").then((response: any) => {
      const { totalUsers } = response;
      setTotalUsers(totalUsers);
    });
  }, []);

  return (
    <>
      <Pageheader
        currentpage="Advertises"
        activepage="Dashboards"
        mainpage="Advertises"
      />

      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-col-12 col-span-12">
          <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
            <div className="box">
              <div className="box-header justify-between flex-wrap">
                <h2 className="box-title mb-2 sm:mb-0">
                  Manage Ads: {totalUsers}
                </h2>
              </div>

              <AdvertiseTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Advertises, isEqual);
