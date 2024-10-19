import { Control, Controller, FieldErrors } from "react-hook-form";
import { IAdvertiseForm } from "../../schema";

interface Props {
  errors: FieldErrors<IAdvertiseForm>;
  control: Control<IAdvertiseForm, any>;
}

export default function Title(props: Props) {
  const { errors, control } = props;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="ads-title" aria-labelledby="ads title label" className="text-base">
        Title (This will showing on the website)
      </label>
      <Controller
        name="title"
        control={control}
        defaultValue={""}
        render={({ field: { onChange } }) => (
          <input
            id="ads-title"
            type="text"
            placeholder="Title (This will not showing on the website)"
            className="block w-full rounded-md bg-gray-100 border-transparent focus:ring-0"
            aria-labelledby="ads-title"
            onChange={onChange}
            maxLength={50}
            required
          />
        )}
      />
      {errors.title && (
        <span className="text-red">{errors.title.message}</span>
      )}
    </div>
  );
}
