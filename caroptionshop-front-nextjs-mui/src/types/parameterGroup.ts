import { z } from "zod";

const ParametersGroupSchema = z.object({
  uuid: z.string().nullish(),
  title: z.string().min(1, { message: "لطفا عنوان را وارد کنید" }),
  category: z
    .string({ message: "لطفا دسته بندی را وارد نمایید" })
    .min(1, { message: "لطفا دسته بندی را وارد نمایید" }),
});
export type ParametersGroupType = z.infer<typeof ParametersGroupSchema>;
export { ParametersGroupSchema };
