"use server";

import { ParametersGroupSchema } from "@/types/parameterGroup";
import { revalidateTag } from "next/cache";

const CreateParametersGroupAction = async (
  _prevState: any,
  formData: FormData,
) => {
  if (formData.get("category") == "0") {
    formData.delete("category");
  }
  const rawData = Object.fromEntries(formData);
  const validatedData = ParametersGroupSchema.safeParse(rawData);
  if (validatedData.error) {
    return {
      error: validatedData.error.flatten(),
      data: rawData,
    };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/parameters/groups/`, {
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
  revalidateTag("parameters-group");
  return { success: true };
};
const UpdateParametersGroupAction = async (
  uuid: string,
  _prevState: any,
  formData: FormData,
) => {
  if (formData.get("category") == "0") {
    formData.set("category", null);
  }
  const rawData = Object.fromEntries(formData);
  const validatedData = ParametersGroupSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten() };
  }
  const res = await fetch(
    `${process.env.BACKEND_URL}/parameters/groups/${uuid}/`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    },
  );
  if (!res?.ok) {
    const formError = JSON.stringify(await res.json());
    const err = { fieldErrors: {}, formErrors: formError };
    return { error: err, data: validatedData?.data };
  }
  revalidateTag("parameters-group");
  return { success: true };
};
const DeleteParametersGroupAction = async (
  uuid: string,
  _prevState: any,
  _formData: FormData,
) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/parameters/groups/${uuid}/`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    },
  );
  if (res?.ok) {
    revalidateTag("parameters-group");
    return { success: true };
  }
  return { success: false };
};

const DeleteMultipleParametersGroupAction = async (
  uuids: string[],
  _prevState: any,
  _formData: FormData,
) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/parameters/groups/multiple-delete`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(uuids),
    },
  );
  if (res?.ok) {
    revalidateTag("parameters-group");
    return { success: true };
  }
  return { success: false };
};

export {
  CreateParametersGroupAction,
  UpdateParametersGroupAction,
  DeleteParametersGroupAction,
  DeleteMultipleParametersGroupAction,
};
