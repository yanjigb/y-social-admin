import { Control, Controller, FieldErrors } from "react-hook-form";
import { IAdvertiseForm } from "../../schema";
import { TextField } from "@mui/material";

interface Props {
  errors: FieldErrors<IAdvertiseForm>;
  control: Control<IAdvertiseForm, any>;
}

export default function Description(props: Props) {
  const { errors, control } = props;

  return (
    <div className="flex flex-col gap-2">
      <Controller
        name="description"
        control={control}
        defaultValue={""}
        render={({ field: { onChange } }) => (
          <TextField
            multiline
            rows={4}
            id="ads-description"
            placeholder="Description"
            className="block w-full rounded-md bg-gray-200 border-transparent focus:ring-0 dark:!bg-gray-200"
            aria-labelledby="ads-description"
            helperText="This will showing on the website"
            onChange={onChange}
          />
        )}
      />
      {errors.description && (
        <span className="text-red">{errors.description.message}</span>
      )}
    </div>
  );
}
