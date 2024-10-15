import { Control, Controller, FieldErrors } from "react-hook-form";
import { IAdvertiseForm } from "../../schema";
import TextField from '@mui/material/TextField';

interface Props {
  errors: FieldErrors<IAdvertiseForm>;
  control: Control<IAdvertiseForm, any>;
}

export default function Title(props: Props) {
  const { errors, control } = props;

  return (
    <div className="flex flex-col gap-2">
      <Controller
        name="title"
        control={control}
        defaultValue={""}
        render={({ field: { onChange } }) => (
          <TextField
            id="ads-title"
            type="text"
            placeholder="Title"
            className="block w-full rounded-md bg-gray-200 border-transparent focus:ring-0"
            aria-labelledby="ads-title"
            onChange={onChange}
            helperText="This will not showing on the website"
          />
        )}
      />
      {errors.title && (
        <span className="text-red">{errors.title.message}</span>
      )}
    </div>
  );
}
