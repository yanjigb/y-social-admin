import { Control, Controller, FieldErrors } from "react-hook-form";
import { IAdvertiseForm } from "../../schema";

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
          <textarea
            rows={4}
            id="ads-description"
            placeholder="Description (This will showing on the website)"
            className="block w-full rounded-md bg-gray-100 border-transparent focus:ring-0 dark:!bg-gray-200"
            aria-labelledby="ads-description"
            onChange={onChange}
            maxLength={1500}
            required
          />
        )}
      />
      {errors.description && (
        <span className="text-red">{errors.description.message}</span>
      )}
    </div>
  );
}
