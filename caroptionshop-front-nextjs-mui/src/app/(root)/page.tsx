import { Box } from "@mui/material";
import { CategoriesView } from "../components/Navigation/CategoriesView";

export default async function Home() {
  const imagesRes = await fetch("http://caroption-back:8000/api/v1/files");
  const categoriesRes = await fetch(
    "http://caroption-back:8000/api/v1/categories",
  );
  const [images, categories] = await Promise.all([
    imagesRes.json(),
    categoriesRes.json(),
  ]);
  return (
    <Box>
      <CategoriesView images={images} categories={categories} />
    </Box>
  );
}
