"use server";

import { ParameterSchema } from "@/types/parameter";
import { revalidateTag } from "next/cache";

const CreateParameterAction = async (
  category: string,
  parameterGroup: string,
  parameterType: string,
  _prevState: any,
  formData: FormData,
) => {
  if (category != "0") {
    formData.append("category", category);
  }
  if (parameterGroup != "0") {
    formData.append("group", parameterGroup);
  }
  if (parameterType != "0") {
    formData.append("parameter_type", parameterType);
  }
  const rawData = Object.fromEntries(formData);
  const validatedData = ParameterSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/parameters/`, {
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
  revalidateTag("parameter");
  return { success: true };
};
const UpdateParameterAction = async (
  uuid: string,
  _prevState: any,
  formData: FormData,
) => {
  if (formData.get("category") == "0") {
    formData.set("category", null);
  }
  const rawData = Object.fromEntries(formData);
  const validatedData = ParameterSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten() };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/parameters/${uuid}/`, {
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
  revalidateTag("parameter");
  return { success: true };
};
const DeleteParameterAction = async (
  uuid: string,
  _prevState: any,
  _formData: FormData,
) => {
  const res = await fetch(`${process.env.BACKEND_URL}/parameters/${uuid}/`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  if (res?.ok) {
    revalidateTag("parameter");
    return { success: true };
  }
  return { success: false };
};

const DeleteMultipleParameterAction = async (
  uuids: string[],
  _prevState: any,
  _formData: FormData,
) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/parameters/multiple-delete`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(uuids),
    },
  );
  if (res?.ok) {
    revalidateTag("parameter");
    return { success: true };
  }
  return { success: false };
};

export {
  CreateParameterAction,
  UpdateParameterAction,
  DeleteParameterAction,
  DeleteMultipleParameterAction,
};
