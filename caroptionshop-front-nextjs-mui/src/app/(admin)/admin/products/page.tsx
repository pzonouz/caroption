"use server";

import { ListProducts } from "@/app/components/Product/ListProducts";

const page = async () => {
  const productsRes = await fetch(`${process.env.BACKEND_URL}/products`, {
    next: { tags: ["product"] },
  });
  const categoriesRes = await fetch(`${process.env.BACKEND_URL}/categories`, {
    next: { tags: ["category"] },
  });
  const filesRes = await fetch(`${process.env.BACKEND_URL}/files`, {
    next: { tags: ["files"] },
  });
  const [products, images, categories] = await Promise.all([
    productsRes.json(),
    filesRes.json(),
    categoriesRes.json(),
  ]);

  return (
    <ListProducts products={products} images={images} categories={categories} />
  );
};
export default page;
