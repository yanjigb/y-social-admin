import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import isEqual from "react-fast-compare";
import Swal from "sweetalert2";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UpdateInfo } from "../../../../../services/user.service";
import { IAdvertise } from "../../../../../types/advertise";
import { TransitionProps } from "@mui/material/transitions";
import PreviewCard from "../preview-card";
import { AdsRate } from "../../../../../constants/ads-target";
import { AdvertiseFormSchema, DEFAULT_ADVERTISE_FORM, IAdvertiseForm } from "./schema";
import EngageEstimate from "../engage-estimate";
import SelectCTA from "./components/select-cta";
import Schedule from "./components/schedule";
import { Slide } from "@mui/material";
import Budget from "./components/budget";
import Title from "./components/title";
import Description from "./components/description";
import UploadMedia from "./components/upload-media";
import Goal from "./components/goal";
import { Create, Get as FetchAdvertiseList } from "../../../../../services/ads.service";
import { toast } from "sonner";
import { uploadMedia } from "../../../../../api/media/uploadMedia";
import LinkAction from "./components/link-action";
import SubmitBtn from "./components/submit-btn";
import LocalStorageKeys from "../../../../../constants/local-storage-keys";
import { DEFAULT_BUDGET } from "./constants/budget";
import AppGeminiGenerate from "../../../../../components/features/app-gemini-generate";
import Topic from "./components/topic";

interface UpsertModalProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  fetchAdsList: Function;
  dataEdit: IAdvertise;
  isEdit?: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertModal: React.FC<Readonly<UpsertModalProps>> = ({
  open = false,
  onClose,
  fetchAdsList,
  dataEdit,
  isEdit,
}) => {
  const [confirmAlert, setConfirmAlert] = React.useState(false);
  const [budget, setBudget] = React.useState<number>(DEFAULT_BUDGET);
  const [mediaUrl, setMediaUrl] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    budget: dataEdit.budget ?? budget,
    media_content: dataEdit.media_content ?? mediaUrl,
  });
  const [media, setMedia] = React.useState<File | Blob>();
  const userID = localStorage.getItem(LocalStorageKeys.USER_ID);
  const [isLoading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
    watch
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
        media_content: dataEdit.media_content,
        topic: dataEdit.topic,
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
          UpdateInfo(formData).then(() => {
            fetchAdsList();
          });
          setConfirmAlert(false);
        }
      });
    }
  }, [confirmAlert]);

  const handleChangeMedia = async (file: File | Blob) => {
    try {
      const result = await uploadMedia(file, false);
      return result?.secure_url;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

  const onSubmit: SubmitHandler<IAdvertiseForm> = async () => {
    setLoading(true);

    const imageURL = await handleChangeMedia(media!);
    const formAdvertiseData = {
      ...getValues(),
      userID,
      media_content: imageURL,
    }

    Create(formAdvertiseData).then(async () => {
      toast.success("Create Ads Successfully")
      await FetchAdvertiseList();
    }).catch(() => toast.error("Something went wrong"));

    setLoading(false);
  };

  const handleUploadMedia = (file: File | null) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        media_content: file.name,
      }));

      setMedia(file)

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
            <Goal control={control} />
            <Title errors={errors} control={control} />
            <Description errors={errors} control={control} />
            <AppGeminiGenerate content={getValues("description")} />
            <UploadMedia onChange={handleUploadMedia} control={control} register={register} />
            <LinkAction errors={errors} control={control} />
            <div className="flex gap-4 flex-col lg:flex-row">
              <SelectCTA control={control} />
              <Topic errors={errors} control={control} />
            </div>
            <Schedule getValues={getValues} control={control} errors={errors} watch={watch} />
            <Budget control={control} onChangeBudget={handleChangeBudget} budget={budget} />
          </div>

          <div className="order-1 sm:order-2 flex flex-col gap-4">
            <h4 className="font-bold">Preview your ads</h4>

            <PreviewCard
              media={mediaUrl!}
              description={getValues("description")}
              title={getValues("title")}
              actions={
                <div className="w-full">
                  <Button size="small" className="w-full" variant="contained" sx={{
                    background: "blue",
                    padding: "0.8rem 0",
                  }}>
                    <span className="text-base font-bold">
                      {watch("cta")}
                    </span>
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
          <SubmitBtn onClose={onClose} watch={watch} isLoading={isLoading} />
        </DialogActions>
      </form>
    </Dialog >
  );
};

export default React.memo(UpsertModal, isEqual);
