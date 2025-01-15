"use server";

import { ListParametersGroup } from "@/app/components/ParametersGroup/ListParametersGroup";

const page = async () => {
  const parametersGroupsRes = await fetch(
    `${process.env.BACKEND_URL}/parameters/groups`,
    {
      next: { tags: ["parameters-group"] },
    },
  );
  const categoriesRes = await fetch(
    `${process.env.BACKEND_URL}/categories/recursive`,
    {
      next: { tags: ["category"] },
    },
  );
  const [parametersGroups, categories] = await Promise.all([
    parametersGroupsRes.json(),
    categoriesRes.json(),
  ]);

  return (
    <ListParametersGroup
      parametersGroups={parametersGroups}
      categories={categories}
    />
  );
};
export default page;
