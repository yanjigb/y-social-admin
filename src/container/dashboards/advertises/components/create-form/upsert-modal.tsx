import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import isEqual from "react-fast-compare";
import Swal from "sweetalert2";
import { z, ZodType } from "zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UpdateInfo } from "../../../../../services/user.service";
import { IAdsTarget, IAdvertise } from "../../../../../types/advertise";
import { TransitionProps } from "@mui/material/transitions";
import PreviewCard from "../preview-card";
import AppUploadFile from "../../../../../components/features/app-upload-file";
import { AdsCTAList, AdsRate, AdsTargetList } from "../../../../../constants/ads-target";
import { AdvertiseFormSchema, DEFAULT_ADVERTISE_FORM, IAdvertiseForm } from "./schema";
import { toast } from "sonner";
import { currencytFormat } from "../../../../../lib/currency-format";
import EngageEstimate from "../engage-estimate";
import SimpleSlider from "../../../../../components/ui/simpleslider";
import SelectCTA from "./components/select-cta";
import Schedule from "./components/schedule";
import GoalTarget from "./components/goal-target";
import { Slide, Typography } from "@mui/material";

interface UpsertModalProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  fetchAdsList: Function;
  dataEdit: IAdvertise;
  isEdit?: boolean;
}

const AdsSchema: ZodType<IAdvertiseForm> = z.object({
  title: z.string().min(2, { message: "Must be at least 2 characters long" }),
  description: z
    .string()
    .min(2, { message: "Must be at least 2 characters long" }),
  budget: z.coerce.number(),
  status: z.coerce.boolean(),
  schedule_start: z.coerce.date(),
  schedule_end: z.coerce.date().optional(),
  media_content: z.string(),
  cta: z.string(),
  goal: z.object(
    { goalID: z.string().min(1, { message: "Goal ID is required" }) }
  ),
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const marks = {
  50000: `${currencytFormat(Number(50000))} VND`,
  3000000: `${currencytFormat(Number(3000000))} VND`,
};

const UpsertModal: React.FC<Readonly<UpsertModalProps>> = ({
  open = false,
  onClose,
  userId,
  fetchAdsList,
  dataEdit,
  isEdit,
}) => {
  const [confirmAlert, setConfirmAlert] = React.useState(false);
  const [budget, setBudget] = React.useState<number>(450000);
  const [adsTarget, setAdsTarget] = React.useState<IAdsTarget>(AdsTargetList[0]);
  const [mediaUrl, setMediaUrl] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    title: dataEdit.title ?? "",
    description: dataEdit.description ?? "",
    schedule_start: dataEdit.schedule_start ?? new Date(),
    schedule_end: dataEdit.schedule_end ?? new Date(),
    budget: dataEdit.budget ?? budget,
    goal: dataEdit.goal ?? { goalID: adsTarget.key },
    media_content: dataEdit.media_content ?? mediaUrl,
    cta: dataEdit.cta ?? AdsCTAList[0],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue
  } = useForm<IAdvertiseForm>({
    resolver: zodResolver(AdvertiseFormSchema),
    defaultValues: DEFAULT_ADVERTISE_FORM(
      (dataEdit as IAdvertiseForm) || {},
      isEdit,
    ),
  });

  React.useEffect(() => {
    if (dataEdit) {
      reset({
        title: dataEdit.title,
        description: dataEdit.description,
        budget: dataEdit.budget,
        schedule_start: dataEdit.schedule_start,
        schedule_end: dataEdit.schedule_end,
        status: dataEdit.status,
        media_content: dataEdit.media_content,
      });
    }
  }, [dataEdit, reset]);

  React.useEffect(() => {
    if (confirmAlert) {
      Swal.fire({
        title: "Are you sure to update?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Update Now",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Updated Successfully! 😎",
            text: "This user has been updated",
          });
          UpdateInfo(formData).then((data) => {
            console.log(data);
            fetchAdsList();
          });
          setConfirmAlert(false);
        }
      });
    }
  }, [confirmAlert]);

  const onSubmit: SubmitHandler<IAdvertiseForm> = async (data, event) => {
    // async request which may result error
    try {
      // await fetch()
      console.log(data, event);
    } catch (e) {
      // handle your error
      console.log(typeof budget, typeof data.budget);
      console.log(e);
    }
  };

  React.useEffect(() => {
    if (Object.keys(errors).length) {
      console.log(typeof budget, typeof errors.budget);
      console.log("Form errors:", errors);
      setFormData((prev) => ({ ...prev, budget: Number(budget) }));

      console.log(formData);
    }
  }, [errors]);

  const handleInputChange = (id: any) => (event: any) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  React.useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleUploadMedia = (file: File | null) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        media_content: file.name,
      }));

      const url = URL.createObjectURL(file);
      setMediaUrl(url);
    } else {
      setFormData((prev) => ({
        ...prev,
        media_content: "",
      }));

      setMediaUrl(null);
    }
  };

  const handleChangeBudget = (id: string) => (value: number | number[]) => {
    const numericValue = Number(value);
    setBudget(numericValue);
    setFormData((prev) => ({ ...prev, [id]: numericValue }));
  };

  const handleChangeDate = (field: keyof IAdvertiseForm) => (date: Date | null) => {
    if (date) {
      const updatedData = { ...formData, [field]: date };
      if (updatedData.schedule_end! < updatedData.schedule_start) {
        toast.error('Invalid End Date');
      }

      setFormData(updatedData);
      setValue(field, date);
    }
  };

  const onChangeGoalTarget = (field: keyof IAdvertiseForm) => (goal: IAdsTarget) => {
    console.log(field, goal);
    setAdsTarget(goal);
  };

  const handleChangeCTA = (value: string) => {
    setFormData((prev) => ({ ...prev, cta: value }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      TransitionComponent={Transition}
    >
      <DialogTitle >{isEdit ? "Edit Ads" : "Create Ads"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="grid sm:grid-cols-2 gap-10">
          <div className="flex flex-col gap-4 order-2 sm:order-1">
            <Controller
              name="goal"
              control={control}
              defaultValue={{ goalID: AdsTargetList[0].key }}
              render={({ field: { onChange } }) => (
                <GoalTarget
                  onChange={(selectedTarget) => {
                    onChangeGoalTarget("goal")(selectedTarget);
                    onChange({ goalID: selectedTarget.key });
                  }}
                  defaultValue={AdsTargetList[0]}
                />
              )}
            />

            <div className="flex flex-col gap-2">
              <label htmlFor="ads-title" aria-labelledby="ads title label" className="text-base">
                Title (This will not showing on the website)
              </label>
              <input
                {...register("title")}
                id="ads-title"
                type="text"
                placeholder="Title (This will not showing on the website)"
                className="block w-full rounded-md bg-gray-200 border-transparent focus:ring-0"
                aria-labelledby="ads-title"
                onChange={handleInputChange("title")}
                maxLength={50}
              />
              {errors.title && (
                <span className="text-red">{errors.title.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="ads-description" aria-labelledby="ads title label" className="text-base">
                Description (This will showing on the website)
              </label>
              <textarea
                rows={4}
                {...register("description")}
                id="ads-description"
                placeholder="Description (This will showing on the website)"
                className="block w-full rounded-md bg-gray-200 border-transparent focus:ring-0 dark:!bg-gray-200"
                aria-labelledby="ads-description"
                onChange={handleInputChange("description")}
                maxLength={1500}
              ></textarea>
              {errors.description && (
                <span className="text-red">{errors.description.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="ads-media" aria-labelledby="ads media label" className="text-base">
                Upload Media
              </label>

              <div className="w-full min-h-40 p-6 flex justify-center items-center bg-gray-200 rounded-lg">
                <Controller
                  name="media_content"
                  control={control}
                  defaultValue={""}
                  rules={{ required: 'File is required' }}
                  render={({ field }) => (
                    <AppUploadFile onUploadFile={(file: File | null) => {
                      // field.onChange(file?.name);
                      setValue("media_content", file?.name || "");
                      handleUploadMedia(file);
                    }} />
                  )} />
              </div>
            </div>

            <SelectCTA onChange={handleChangeCTA} control={control} />
            <Schedule schedule_start={formData.schedule_start} schedule_end={formData.schedule_end} control={control} />

            <div className="flex flex-col items-center gap-6">
              <Typography color="blue" fontSize="4rem" className="font-semibold">{currencytFormat(Number(budget))} VND</Typography>

              <Controller
                name="budget"
                defaultValue={budget}
                control={control}
                render={({ field: { onChange } }) => (
                  <SimpleSlider
                    style={{
                      padding: "0 2.5rem"
                    }}
                    sliderProps={
                      {
                        min: 50000,
                        max: 3000000,
                        step: 10000,
                        defaultValue: budget,
                        // value: budget,
                        trackStyle: {
                          background: "blue"
                        },
                        onChange: (newValue) => {
                          handleChangeBudget("budget")(newValue);
                          onChange(newValue);
                        }
                      }
                    }
                    markList={marks}
                  />
                )} />
            </div>
          </div>

          <div className="order-1 sm:order-2 flex flex-col gap-4">
            <h4 className="font-bold">Preview your ads</h4>

            <PreviewCard
              media={mediaUrl!}
              description={formData.description}
              title={formData.title}
              actions={
                <div className="w-full">
                  <Button size="small" className="w-full" variant="contained" sx={{
                    background: "blue",
                    padding: "0.8rem 0",
                  }}>
                    <span className="text-base font-bold">Learn More</span>
                  </Button>
                </div>
              }
            />

            <div className="flex flex-col">
              <b className="text-sm">*Note</b>
              <span className="text-sm">
                - Your ads auto run in 00:00:00 AM on your selected start date.
              </span>
            </div>
            <EngageEstimate budget={Number(budget)} audienceSize={AdsRate.AUDIENCE_SIZE} engagementRate={AdsRate.ENGAGEMENT_RATE} />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="error">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog >
  );
};

export default React.memo(UpsertModal, isEqual);
