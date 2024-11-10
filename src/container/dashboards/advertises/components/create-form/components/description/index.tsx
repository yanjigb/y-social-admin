import { Control, Controller, FieldErrors } from "react-hook-form";
import { IAdvertiseForm } from "../../schema";
import ReactQuill from 'react-quill';

interface Props {
  errors: FieldErrors<IAdvertiseForm>;
  control: Control<IAdvertiseForm, any>;
}

export default function Description(props: Props) {
  const { errors, control } = props;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="ads-description" aria-labelledby="ads title label" className="text-base">
        Description (This will showing on the website)
      </label>

      <Controller
        name="description"
        control={control}
        defaultValue={""}
        render={({ field: { onChange } }) => (
          <ReactQuill
            theme="snow"
            className="bg-gray-100"
            onChange={onChange}
            placeholder="Description (This will showing on the website)"
          />
        )}
      />
      {errors.description && (
        <span className="text-red">{errors.description.message}</span>
      )}
    </div>
  );
}
