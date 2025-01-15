"use server";

import { SpecificationSchema } from "@/types/specification";

const CreateSpecificationAction = async (
  product: string,
  _prevState: any,
  formData: FormData,
) => {
  formData.append("product", product);
  const rawData = Object.fromEntries(formData);
  const validatedData = SpecificationSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  const resSpec = await fetch(`${process.env.BACKEND_URL}/specifications/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(validatedData.data),
  });
  if (resSpec?.ok) {
    return { success: true, data: rawData };
  }
  const formError = await resSpec.json();
  return { error: { formErrors: formError }, data: rawData };
};
const UpdateSpecificationAction = async (
  product: string,
  _prevState: any,
  formData: FormData,
) => {
  formData.append("product", product);
  const rawData = Object.fromEntries(formData);
  const validatedData = SpecificationSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  const resSpec = await fetch(
    `${process.env.BACKEND_URL}/specifications/${formData.get("id")}/`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    },
  );
  if (resSpec?.ok) {
    return { success: true, data: rawData };
  }
  const formError = await resSpec.json();
  return { error: { formErrors: formError }, data: rawData };
};

export { CreateSpecificationAction, UpdateSpecificationAction };
