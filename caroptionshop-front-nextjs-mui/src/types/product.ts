import { z } from "zod";

const ProductSchema = z.object({
  uuid: z.string().nullish(),
  title: z.string().min(1, { message: "لطفا عنوان را وارد کنید" }),
  subtitle: z.string().min(1, { message: "لطفا عنوان فرعی را وارد کنید" }),
  weight: z.string().min(1, { message: "لطفا وزن را وارد کنید" }),
  quantity: z.string().min(1, { message: "لطفا تعداد را وارد کنید" }),
  price: z.string().min(1, { message: "لطفا قیمت را وارد کنید" }),
  price2: z
    .string({ message: "لطفا قیمت همکار را وارد کنید" })
    .min(1, { message: "لطفا قیمت همکار را وارد کنید" }),
  discount: z
    .string({ message: "لطفا تخفیف را وارد کنید" })
    .min(1, { message: "لطفا تخفیف را وارد کنید" }),
  description: z
    .string({ message: "لطفا توضیحات اجمالی را وارد نمایید" })
    .min(1, {
      message: "لطفا توضیحات اجمالی را وارد نمایید",
    }),
  status: z.boolean().default(true),
  image: z.string().min(1, { message: "لطفا عکس را انتخاب کنید" }),
  images: z.string().nullish(),
  cons: z.string().min(1, { message: "لطفا مزایا را وارد کنید" }),
  pros: z.string().min(1, { message: "لطفا معایب را وارد کنید" }),
  review: z
    .string({ message: "لطفا نقد و بررسی را وارد نمایید" })
    .min(1, { message: "لطفا نقد و بررسی را وارد نمایید" }),
  category: z.string().nullish(),
  specifications: z.array(z.any()).nullish(),
});

export type ProductType = z.infer<typeof ProductSchema>;

export { ProductSchema };
