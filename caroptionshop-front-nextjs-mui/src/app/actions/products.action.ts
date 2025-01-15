"use server";

import { FileType } from "@/types/file";
import { ProductSchema } from "@/types/product";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const CreateProductAction = async (
  status: boolean,
  image: FileType | null | undefined,
  description: string,
  review: string,
  category: string,
  _prevState: any,
  formData: FormData,
) => {
  if (image) {
    formData.append("image", image?.uuid);
  } else {
    formData.append("image", "");
  }
  if (description) {
    formData.append("description", description);
  }
  if (review) {
    formData.append("review", review);
  }
  if (category) {
    formData.append("category", category);
  }

  const rawData = Object.fromEntries(formData);
  const validatedData = ProductSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  validatedData.data.status = status;
  validatedData.data.weight = validatedData.data.weight?.replace(/,/g, "");
  validatedData.data.quantity = validatedData.data.quantity?.replace(/,/g, "");
  validatedData.data.price = validatedData.data.price?.replace(/,/g, "");
  validatedData.data.price2 = validatedData.data.price2?.replace(/,/g, "");
  const res = await fetch(`${process.env.BACKEND_URL}/products/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(validatedData.data),
  });
  if (!res?.ok) {
    const formError = JSON.stringify(await res.json());
    const err = { fieldErrors: {}, formErrors: formError };
    return { error: err, data: rawData };
  }
  const product = await res.json();
  revalidatePath("/admin/products");
  return { product: product, data: rawData };
};
const UpdateProductAction = async (
  uuid: string,
  status: boolean,
  image: FileType | null | undefined,
  description: string,
  review: string,
  category: string,
  _prevState: any,
  formData: FormData,
) => {
  if (image) {
    formData.append("image", image?.uuid);
  } else {
    formData.append("image", "");
  }
  if (description) {
    formData.append("description", description);
  }
  if (review) {
    formData.append("review", review);
  }
  if (category) {
    formData.append("category", category);
  }

  const rawData = Object.fromEntries(formData);
  const validatedData = ProductSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  validatedData.data.status = status;
  validatedData.data.weight = validatedData.data.weight?.replace(/,/g, "");
  validatedData.data.quantity = validatedData.data.quantity?.replace(/,/g, "");
  validatedData.data.price = validatedData.data.price?.replace(/,/g, "");
  validatedData.data.price2 = validatedData.data.price2?.replace(/,/g, "");
  const res = await fetch(`${process.env.BACKEND_URL}/products/${uuid}/`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(validatedData.data),
  });
  if (!res?.ok) {
    const formError = JSON.stringify(await res.json());
    const err = { fieldErrors: {}, formErrors: formError };
    return { error: err, data: rawData };
  }
  revalidateTag("product");
  return { success: true };
};
const AddImagesToProductAction = async (
  uuid: string,
  images: FileType[] | null | undefined,
  _prevState: any,
  formData: FormData,
) => {
  let selectedImages: string[] = [];
  if (images.length > 0) {
    images.map((image) => selectedImages.push(image.uuid));
    formData.append("images", JSON.stringify(selectedImages));
  }
  const res = await fetch(`${process.env.BACKEND_URL}/products/${uuid}/`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ images: selectedImages }),
  });
  if (!res?.ok) {
    const error = await res.json();
    return { error: error };
  }
  revalidateTag("product");
  return { success: true };
};

const DeleteProductAction = async (
  uuid: string,
  _prevState: any,
  _formData: FormData,
) => {
  const res = await fetch(`${process.env.BACKEND_URL}/products/${uuid}/`, {
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

const DeleteMultipleProductAction = async (
  uuids: string[],
  _prevState: any,
  _formData: FormData,
) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/products/multiple-delete/`,
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
    redirect("/admin/parameters-groups");
  }
  return { success: false };
};

export {
  CreateProductAction,
  UpdateProductAction,
  AddImagesToProductAction,
  DeleteProductAction,
  DeleteMultipleProductAction,
};
