import { FC, memo, useCallback, useEffect, useState } from "react";
import isEqual from "react-fast-compare";

import Pageheader from "../../../components/common/pageheader/pageheader";

import UpsertModal from "./components/create-form/upsert-modal";
import { IAdvertise } from "../../../types/advertise";
import List from "./list";
import { Get, GetByUser } from "../../../services/ads.service";
import { toast } from "sonner";
import LocalStorageKeys from "../../../constants/local-storage-keys";
import ROLE from "../../../constants/role";
import useCurrentUser from "../../../hooks/use-current-user";

interface UsersProps { }

const role = localStorage.getItem(LocalStorageKeys.ROLE);
const userID = localStorage.getItem(LocalStorageKeys.USER_ID)
const isAllowRole = Number(role) === ROLE.ADMIN_PROFILE.id || Number(role) === ROLE.STAFF_PROFILE.id || Number(role) === ROLE.SUPER_ADMIN_PROFILE.id;

const Advertises: FC<UsersProps> = () => {
  const [openUpsertModal, setOpenUpsertModal] = useState(false);
  const [advertiseList, setAdvertiseList] = useState<IAdvertise[]>([]);
  const { user } = useCurrentUser();

  const fetchAdvertiseList = useCallback(async () => {
    try {
      const res: any = isAllowRole ? await Get() : await GetByUser(userID);

      const filteredRes = user?.role === ROLE.USER_PROFILE.id
        ? isAllowRole ? res : res.filter((item: IAdvertise) => item.userID === userID)
        : res;

      const sortedAds = filteredRes.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setAdvertiseList(sortedAds);
    } catch {
      toast.error("Something went wrong");
    }
  }, []);

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

              <List advertiseList={advertiseList} />
            </div>
          </div>
        </div>
      </div>

      {openUpsertModal && (
        <UpsertModal
          open={openUpsertModal}
          onClose={handleOpenUpsertPost}
          userId="1234567890"
          fetchAdsList={fetchAdvertiseList}
          dataEdit={{} as IAdvertise}
        />
      )}
    </>
  );
};

Advertises.displayName = "Advertises";

export default memo(Advertises, isEqual);
