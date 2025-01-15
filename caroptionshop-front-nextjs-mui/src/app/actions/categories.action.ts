"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { CategorySchema } from "@/types/category";
import { FileType } from "@/types/file";

const CreateCategoryAction = async (
  parent: string,
  description: string,
  status: boolean,
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
    return { error: validatedData.error.flatten(), data: rawData };
  }
  validatedData.data.parent = parent == "0" ? null : parent;
  validatedData.data.description = description;
  validatedData.data.status = status;
  const res = await fetch(`${process.env.BACKEND_URL}/categories/`, {
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
  revalidateTag("category");
  return { success: true };
};
const UpdateCategoryAction = async (
  uuid: string,
  parent: string,
  description: string,
  status: boolean,
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
  validatedData.data.parent = parent == "0" ? null : parent;
  validatedData.data.description = description;
  validatedData.data.status = status;
  const res = await fetch(`${process.env.BACKEND_URL}/categories/${uuid}/`, {
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
  const res = await fetch(`${process.env.BACKEND_URL}/categories/${uuid}/`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  if (res?.ok) {
    revalidateTag("category");
    return { success: true };
  }
  return { success: false };
};

const DeleteMultipleCategoryAction = async (
  uuids: string[],
  _prevState: any,
  _formData: FormData,
) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/categories/multiple-delete`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(uuids),
    },
  );
  if (res?.ok) {
    revalidateTag("category");
    redirect("/admin/categories");
  }
  return { success: false };
};

export {
  CreateCategoryAction,
  UpdateCategoryAction,
  DeleteCategoryAction,
  DeleteMultipleCategoryAction,
};
