import { FC, memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";

import Pageheader from "../../../components/common/pageheader/pageheader";

import UpsertModal from "./components/create-form/upsert-modal";
import { IAdvertise } from "../../../types/advertise";
import List from "./list";
import { Get } from "../../../services/ads.service";
import { toast } from "sonner";

interface UsersProps { }

const Advertises: FC<UsersProps> = () => {
  // const [totalAds, setTotalAds] = useState(mockAds.length);
  const [openUpsertModal, setOpenUpsertModal] = useState(false);
  const [advertiseList, setAdvertiseList] = useState<IAdvertise[]>([]);

  const fetchAdvertiseList = () => {
    Get().then((res: any) =>
      setAdvertiseList(res)
    ).catch(() => toast.error("Something went wrong"));
  };

  useEffect(() => {
    fetchAdvertiseList();
  }, [])

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
                  Manage Ads: {advertiseList?.length}
                </h2>

                <button
                  type="button"
                  className="bg-primary ti-btn ti-btn-wave text-white"
                  onClick={handleOpenUpsertPost}
                >
                  Create Ads
                </button>
              </div>

              <List />
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

Advertises.displayName = "Advertises";

export default memo(Advertises, isEqual);
