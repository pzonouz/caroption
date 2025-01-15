"use server";

import { ListParameters } from "@/app/components/Parameters/ListParameters";

const page = async () => {
  const parametersGroupsRes = await fetch(
    `${process.env.BACKEND_URL}/parameters/groups/`,
    {
      next: { tags: ["parameters-group"] },
    },
  );
  const parametersRes = await fetch(`${process.env.BACKEND_URL}/parameters/`, {
    next: { tags: ["parameter"] },
  });
  const categoriesRes = await fetch(`${process.env.BACKEND_URL}/categories`, {
    next: { tags: ["category"] },
  });
  const recursiveCategoriesRes = await fetch(
    `${process.env.BACKEND_URL}/categories/recursive`,
    {
      next: { tags: ["category"] },
    },
  );
  const [parametersGroups, parameters, categories, recursiveCategories] =
    await Promise.all([
      parametersGroupsRes.json(),
      parametersRes.json(),
      categoriesRes.json(),
      recursiveCategoriesRes.json(),
    ]);
  return (
    <ListParameters
      parameterGroups={parametersGroups}
      parameters={parameters}
      categories={categories}
      recursiveCategories={recursiveCategories}
    />
  );
};
export default page;
