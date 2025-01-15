"use server";

import { ListCategories } from "@/app/components/Category/ListCategories";

const page = async () => {
  const categoriesRes = await fetch(
    `${process.env.BACKEND_URL}/categories/recursive`,
    {
      next: { tags: ["category"] },
    },
  );
  const filesRes = await fetch(`${process.env.BACKEND_URL}/files`, {
    next: { tags: ["files"] },
  });
  const [categories, images] = await Promise.all([
    categoriesRes.json(),
    filesRes.json(),
  ]);

  return <ListCategories categories={categories} images={images} />;
};
export default page;
