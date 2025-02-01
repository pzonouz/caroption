import { Box } from "@mui/material";
import Image from "next/image";
import SearchBar from "./SearchComponent";
import { CategoriesView } from "./CategoriesView";

const TopComponent = async () => {
  const categoriesRes = await fetch(
    "http://caroption-back:8000/api/v1/categories",
  );
  const imagesRes = await fetch("http://caroption-back:8000/api/v1/files");
  const [categories, images] = await Promise.all([
    categoriesRes.json(),
    imagesRes.json(),
  ]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Image src={"/images/logo.jpg"} alt={"logo"} width="160" height="80" />
      <SearchBar images={images} />
      <CategoriesView images={images} categories={categories} />
    </Box>
  );
};

export default TopComponent;
