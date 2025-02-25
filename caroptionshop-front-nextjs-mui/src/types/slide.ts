import { z } from "zod";

const SlideSchema = z.object({
  uuid: z.string().nullish(),
  link: z.string().nullish(),
  order: z.string().default("0"),
  image: z.string().min(1, { message: "لطفا عکس را انتخاب کنید" }),
});

export type SlideType = z.infer<typeof SlideSchema>;
export { SlideSchema };
