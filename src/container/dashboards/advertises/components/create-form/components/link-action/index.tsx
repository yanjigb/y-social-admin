import { memo } from "react"
import isEqual from "react-fast-compare"

import { Control, Controller, FieldErrors } from "react-hook-form";
import { IAdvertiseForm } from "../../schema";

interface Props {
  errors: FieldErrors<IAdvertiseForm>;
  control: Control<IAdvertiseForm, any>;
}

const LinkAction = (props: Props) => {
  const { errors, control } = props;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="link_action" aria-labelledby="ads title label" className="text-base">
        Link action (redirect to page when user click on the ads)
      </label>

      <Controller
        name="link_action"
        control={control}
        defaultValue={""}
        render={({ field: { onChange} }) => (
          <input
            id="link-action"
            type="url"
            placeholder="ex: https://example.com"
            className="block w-full rounded-md bg-gray-100 border-transparent focus:ring-0"
            aria-labelledby="link-action"
            onChange={onChange}
            maxLength={100}
            required
          />
        )}
      />

      {errors.link_action && (
        <span className="text-red">{errors.link_action.message}</span>
      )}
    </div>
  )
}

export default memo(LinkAction, isEqual);
