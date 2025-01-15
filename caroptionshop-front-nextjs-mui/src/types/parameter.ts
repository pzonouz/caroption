import { z } from "zod";

const ParameterSchema = z.object({
  uuid: z.string().nullish(),
  title: z
    .string({ message: "لطفا عنوان را وارد کنید" })
    .min(1, { message: "لطفا عنوان را وارد کنید" }),
  group: z.string({ message: "لطفا گروه پارامتر را وارد کنید" }).min(1),
  category: z.string({ message: "لطفا دسته بندی را وارد کنید" }),
  parameter_type: z.enum(["TF", "BF", "SO", "SM"]),
  values: z.string().nullish(),
  specifications: z.string().nullish(),
  products: z.string().nullish(),
});

export type ParameterType = z.infer<typeof ParameterSchema>;
export { ParameterSchema };
