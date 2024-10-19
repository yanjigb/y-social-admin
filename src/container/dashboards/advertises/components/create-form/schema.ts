import { IAdvertise, IGoal } from "../../../../../types/advertise";
import { REQUIRED_MSG } from "../../../../../lib/form-text-generator";
import { z, ZodType } from "zod";
import { AdsCTAList } from "../../../../../constants/ads-target";

export type IAdvertiseForm = Omit<
  IAdvertise,
  | "_id"
  | "createdAt"
  | "updatedAt"
  | "media_content"
  | "schedule_start"
  | "schedule_end"
  | "currency"
  | "userID"
  | "adTargetAudience"
  | "score"
  | "result"
  | "status"
> & {
  createdAt?: Date;
  updatedAt?: Date;
  schedule_start: Date;
  schedule_end?: Date;
  media_content: string;
  title: string;
  description: string;
  goal: IGoal;
};

export const DEFAULT_ADVERTISE_FORM = (
  data: IAdvertiseForm,
  isEdit = false,
): IAdvertiseForm => ({
  title: isEdit ? data.title : "",
  description: isEdit ? data.description : "",
  budget: isEdit ? data.budget : 50000,
  schedule_start: isEdit ? data.schedule_start : new Date(),
  schedule_end: isEdit ? data.schedule_end : new Date(),
  media_content: isEdit ? data.media_content : "",
  cta: isEdit ? data.cta : AdsCTAList[0],
  link_action: isEdit ? data.link_action : "",
  goal: isEdit ? data.goal : {
    goalID: "",
  },
});

export const AdvertiseFormSchema: ZodType<IAdvertiseForm> = z.object({
  title: z.string().min(2, { message: "Must be at least 2 characters long" }),
  description: z
    .string()
    .min(2, { message: "Must be at least 2 characters long" }),
  budget: z.coerce.number(),
  schedule_start: z.coerce.date(),
  schedule_end: z.coerce.date().optional(),
  media_content: z.string(),
  cta: z.string(),
  link_action: z.string(),
  goal: z.object(
    { goalID: z.string().min(1, { message: REQUIRED_MSG("goalID") }) }
  ),
});
