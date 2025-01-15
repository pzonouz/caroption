import { z } from "zod";

const SpecificationSchema = z.object({
  uuid: z.string().optional(),
  product: z.string(),
  parameter: z.string(),
  value: z
    .string({ message: "لطفا مقدار را وارد کنید" })
    .min(1, { message: "لطفا مقدار را وارد کنید" }),
});

export type SpecificationType = z.infer<typeof SpecificationSchema>;
export { SpecificationSchema };
