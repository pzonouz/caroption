"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { CategorySchema } from "@/types/category";
import { FileType } from "@/types/file";
import { SlideSchema } from "@/types/slide";

const CreateSlideAction = async (
  image: FileType | null | undefined,
  _prevState: any,
  formData: FormData,
) => {
  if (image) {
    formData.append("image", image?.uuid);
  } else {
    formData.append("image", "");
  }
  const rawData = Object.fromEntries(formData);
  const validatedData = SlideSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/slides`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(validatedData.data),
  });
  if (!res?.ok) {
    const formError = JSON.stringify(await res.json());
    const err = { fieldErrors: {}, formErrors: formError };
    return { error: err, data: validatedData?.data };
  }
  revalidateTag("slide");
  return { success: true };
};
const UpdateCategoryAction = async (
  uuid: string,
  image: FileType | null | undefined,
  _prevState: any,
  formData: FormData,
) => {
  if (image) {
    formData.append("image", image?.uuid);
  } else {
    formData.append("image", "");
  }
  const rawData = Object.fromEntries(formData);
  const validatedData = CategorySchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten() };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/slider/${uuid}/`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(validatedData.data),
  });
  if (!res?.ok) {
    const formError = JSON.stringify(await res.json());
    const err = { fieldErrors: {}, formErrors: formError };
    return { error: err, data: validatedData?.data };
  }
  revalidateTag("category");
  return { success: true };
};
const DeleteCategoryAction = async (
  uuid: string,
  _prevState: any,
  _formData: FormData,
) => {
  const res = await fetch(`${process.env.BACKEND_URL}/slide/${uuid}/`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  if (res?.ok) {
    revalidateTag("slide");
    return { success: true };
  }
  return { success: false };
};

const DeleteMultipleCategoryAction = async (
  uuids: string[],
  _prevState: any,
  _formData: FormData,
) => {
  const res = await fetch(`${process.env.BACKEND_URL}/slide/multiple-delete`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(uuids),
  });
  if (res?.ok) {
    revalidateTag("slide");
    redirect("/admin/slides");
  }
  return { success: false };
};

export { CreateSlideAction };
