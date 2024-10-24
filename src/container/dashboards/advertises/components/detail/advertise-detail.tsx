import { useEffect, useState } from "react";
import { EAdvertiseStatus, IAdvertise } from "../../../../../types/advertise";
import { useParams } from "react-router-dom";
import { GetById } from "../../../../../services/ads.service";
import { GetById as GetDetailUser } from "../../../../../services/user.service";
import { Box, CircularProgress } from "@mui/material";
import { IUser } from "../../../../../types/user";
import DailyPerformance from "./components/daily-performance";
import Schedule from "./components/schedule";
import Budget from "./components/budget";
import Score from "./components/score";
import DetailGoal from "./components/detail-goal";
import Status from "./components/status";
import Author from "./components/author";
import Insights from "./components/insights";
import AdvertiseCard from "./components/advertise-card";
import InfoBanner from "./components/info-banner";


export default function AdvertiseDetail() {
  const { id } = useParams();
  const [advertise, setAdvertise] = useState<IAdvertise>({} as IAdvertise);
  const [user, setUser] = useState<IUser>({} as IUser);

  const fetchDetailUser = () => {
    advertise.userID && GetDetailUser(advertise.userID).then((res: any) => {
      setUser(res.user);
    });
  };

  useEffect(() => {
    GetById(id).then((res: any) => {
      setAdvertise(res);
    });
  }, [id]);

  useEffect(() => {
    fetchDetailUser();
  }, [advertise]);

  if (!advertise) {
    return <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>;
  }

  return (
    <>
      <div className="container my-6 flex flex-col gap-6">
        <InfoBanner status={advertise.status} isEnoughBudget={advertise.isEnoughBudget} />

        <div className="grid grid-cols-12 gap-6">
          <div className="xl:col-span-7 col-span-12 flex flex-col gap-6">
            {
              (advertise.status !== EAdvertiseStatus.SCHEDULE && advertise.status !== EAdvertiseStatus.SUSPENDED)
              && <Status status={advertise.status} />
            }
            <AdvertiseCard
              link_action={advertise.link_action}
              cta={advertise.cta}
              media_content={advertise.media_content}
              media_title={advertise._id}
              title={advertise.title}
              description={advertise.description}
            />
          </div>

          <div className="xl:col-span-5 col-span-12">
            <Author user={user} />
            <Schedule schedule_start={advertise?.schedule_start} schedule_end={advertise?.schedule_end!} />
            <Budget budget={advertise.budget} currency={advertise.currency} />
            <Score score={advertise?.score} />
            <DetailGoal goal={advertise?.goal?.goalID!} />
          </div>
        </div>

        <Insights result={advertise.result} />
        <DailyPerformance result={advertise.result} currency={advertise.currency} />
      </div>
    </>
  );
}
