import { Control, Controller, UseFormRegister } from "react-hook-form";
import AppUploadFile from "../../../../../../../components/features/app-upload-file";
import { IAdvertiseForm } from "../../schema";

interface Props {
  control: Control<IAdvertiseForm, any>;
  register: UseFormRegister<IAdvertiseForm>;
  onChange: (file: File | null) => void;
}

export default function UploadMedia(props: Props) {
  const { control, register, onChange } = props;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="ads-media" aria-labelledby="ads media label" className="text-base">
        Upload Media
      </label>

      <div className="w-full min-h-40 p-6 flex justify-center items-center bg-gray-100 rounded-lg">
        <Controller
          name="media_content"
          control={control}
          defaultValue={""}
          rules={{ required: 'File is required' }}
          render={({ field }) => (
            <AppUploadFile {...register("media_content")} onUploadFile={(file) => {
              field.onChange(file?.name);
              onChange(file);
            }} />
          )} />
      </div>
    </div>
  );
}
