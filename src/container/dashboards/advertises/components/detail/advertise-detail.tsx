import { useEffect, useState } from "react";
import { EAdvertiseStatus, IAdvertise } from "../../../../../types/advertise";
import { useParams } from "react-router-dom";
import { GetById } from "../../../../../services/ads.service";
import { GetById as GetDetailUser } from "../../../../../services/user.service";
import { Lightbox } from "yet-another-react-lightbox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Typography } from "@mui/material";
import formatDate from "../../../../../utils/date";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { currencytFormat } from "../../../../../lib/currency-format";
import { CheckAdsTrending } from "../../../../../lib/check-ads-trending";
import clsx from "clsx";
import { ArrowDropDownIcon } from "@mui/x-date-pickers/icons";
import { IUser } from "../../../../../types/user";
import UserDetail from "../../../../../container/dashboards/users/components/user-detail";
import Insight from "./components/insight";
import DailyPerformance from "./components/daily-performance";


const badgeStyle = (status: EAdvertiseStatus) => {
  return status === EAdvertiseStatus.ACTIVE ? "bg-success" :
    status === EAdvertiseStatus.SCHEDULE ? "bg-warning" :
      "bg-error";
};


export default function AdvertiseDetail() {
  const { id } = useParams();
  const [advertise, setAdvertise] = useState<IAdvertise>({} as IAdvertise);
  const [open, setOpen] = useState<boolean>(false);
  const { label, className: advertiseScoreClassname } = CheckAdsTrending(advertise?.score);
  const [user, setUser] = useState<IUser>({} as IUser);
  const [isOpenUserDetail, setIsOpenUserDetail] = useState<boolean>(false);

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

  const onOpenDetailUser = () => {
    setIsOpenUserDetail(!isOpenUserDetail);
  };

  return (
    <>
      <div className="container my-[3rem]">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="xl:col-span-7 col-span-12">
            <div
              className={clsx("capitalize py-2 mb-6 w-max px-4 text-white text-lg text-center rounded-md font-bold",
                badgeStyle(advertise.status))}
            >
              {advertise.status}
            </div>

            <div className="box">
              <div className="box-body">
                <div className="sm:flex items-center">
                  <button type="button" onClick={() => setOpen(true)} className="flex-1">
                    <LazyLoadImage src={advertise.media_content} title={advertise._id} className="object-cover aspect-video h-full w-full max-w-full max-h-[19.8125rem]" />
                  </button>
                </div>
              </div>
            </div>

            <div className="box">
              <div className="box-body">
                <Typography
                  variant="h5"
                >
                  {advertise.title}
                </Typography>
                <Typography
                  variant="h6"
                >
                  {advertise.description}
                </Typography>
              </div>
            </div>
          </div>

          <div className="xl:col-span-5 col-span-12">
            <button data-hs-overlay="#hs-overlay-contacts" type="button" className="box w-full" onClick={onOpenDetailUser}>
              <div className="box-body">
                <Typography variant="h6">
                  View Author
                </Typography>
              </div>
            </button>

            <div className="grid grid-cols-2 gap-6">
              <div className="box">
                <div className="box-body">
                  <h6>Start date</h6>

                  <div className="flex items-center gap-2">
                    <CalendarMonthIcon />
                    {
                      advertise.schedule_start && formatDate(
                        advertise.schedule_start,
                        "DATE_WITH_TIME"
                      )
                    }
                  </div>
                </div>
              </div>

              <div className="box">
                <div className="box-body">
                  <h6>End date</h6>

                  <div className="flex items-center gap-2">
                    <CalendarMonthIcon />
                    {
                      advertise.schedule_end && formatDate(
                        advertise.schedule_end,
                        "DATE_WITH_TIME"
                      )
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="box">
              <div className="box-body flex items-center gap-4">
                <Typography variant="h6">
                  Budget per day:
                </Typography>

                <Typography variant="h4" fontWeight="bold" color="primary">
                  {currencytFormat(advertise.budget)} {advertise.currency}
                </Typography>
              </div>
            </div>

            <div className="box">
              <div className="box-body flex items-center gap-4">
                <Typography variant="h6">
                  Score:
                </Typography>

                <Typography variant="h4" fontWeight="bold" color="primary" className="flex items-center justify-between flex-1">
                  {advertise.score}

                  <div
                    className={clsx(
                      "py-1 px-2 text-white text-center rounded-md font-bold text-sm",
                      advertiseScoreClassname
                    )}
                  >
                    {label}
                  </div>
                </Typography>
              </div>
            </div>

            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>Advertise Goal</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        <Insight result={advertise.result} />
        <DailyPerformance result={advertise.result} currency={advertise.currency} />
      </div>

      <UserDetail user={user} />

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          { src: advertise.media_content },
        ]}
      />
    </>
  );
}
