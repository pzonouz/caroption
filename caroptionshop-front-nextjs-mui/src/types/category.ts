import { z } from "zod";

const CategorySchema = z.object({
  uuid: z.string().nullish(),
  title: z.string().min(1, { message: "لطفا عنوان را وارد کنید" }),
  description: z.string().nullish(),
  parent: z.string().nullish(),
  order: z.string().default("0"),
  status: z.boolean().default(true),
  image: z.string().min(1, { message: "لطفا عکس را انتخاب کنید" }),
  children: z.array(z.any()).nullish(),
  parameter_groups: z.array(z.any()).nullish(),
});

export type CategoryType = z.infer<typeof CategorySchema>;
export { CategorySchema };
