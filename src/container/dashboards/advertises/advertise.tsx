import { FC, memo, useState } from "react";
import isEqual from "react-fast-compare";

import Pageheader from "../../../components/common/pageheader/pageheader";

import AdvertiseTable from "./components/advertise-table";
import { mockAds } from "../../../data/mock-data/mock-ads";
import UpsertModal from "./components/create-form/upsert-modal";
import { IAdvertise } from "../../../types/advertise";

interface UsersProps { }

const Advertises: FC<UsersProps> = () => {
  // const [totalAds, setTotalAds] = useState(mockAds.length);
  const [openUpsertModal, setOpenUpsertModal] = useState(false);
  // const [ads, setAds] = useState<IAdvertise | any>({});
  // useEffect(() => {
  //   AllUsers("/").then((response: any) => {
  //     const { totalUsers } = response;
  //     setTotalUsers(totalUsers);
  //   });
  // }, []);

  const handleOpenUpsertPost = () => {
    setOpenUpsertModal(!openUpsertModal);
  };

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
                  Manage Ads: {mockAds.length}
                </h2>

                <button
                  type="button"
                  className="bg-primary ti-btn ti-btn-wave text-white"
                  onClick={handleOpenUpsertPost}
                >
                  Create Ads
                </button>
              </div>

              <AdvertiseTable />
            </div>
          </div>
        </div>
      </div>

      {openUpsertModal && (
        <UpsertModal
          open={openUpsertModal}
          onClose={handleOpenUpsertPost}
          userId="1234567890"
          fetchAdsList={() => { }}
          dataEdit={{} as IAdvertise}
        // fetchPostList={fetchPostList}
        />
      )}
    </>
  );
};

export default memo(Advertises, isEqual);
