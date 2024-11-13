import { memo, useCallback, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import Pageheader from "../../../components/common/pageheader/pageheader";
import AdvertiseCollectionList from "./components/list";
import { Get } from "../../../services/ads.service";
import { IAdvertise } from "../../../types/advertise";
import { toast } from "sonner";

const AdvertiseCollection = () => {
  const [advertiseList, setAdvertiseList] = useState<IAdvertise[]>([]);

  const fetchAdvertiseList = useCallback(async () => {
    try {
      const response: any = await Get();

      const filteredAds = response.filter((ad: IAdvertise) =>
        ad.status === 'active' || ad.status === 'disabled'
      );

      setAdvertiseList(filteredAds);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, []);

  useEffect(() => {
    fetchAdvertiseList();
  }, [fetchAdvertiseList]);

  console.log(advertiseList);

  return (
    <>
      <Pageheader
        currentpage="Advertise Collection"
        activepage="Dashboards"
        mainpage="Advertise Collection"
      />

      <div className="grid grid-cols-12 gap-x-6 mb-12">
        <div className="xl:col-col-12 col-span-12">
          <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
            <header className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Advertisements Collection For You</h1>
              <p className="text-xl text-muted-foreground">
                Discover amazing deals and offers from other competitors
              </p>
            </header>

            <AdvertiseCollectionList list={advertiseList} />
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(AdvertiseCollection, isEqual);
