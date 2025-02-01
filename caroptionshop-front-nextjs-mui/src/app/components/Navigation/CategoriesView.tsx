import { CategoryType } from "@/types/category";
import { FileType } from "@/types/file";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const CategoriesView = ({
  images,
  categories,
}: {
  images: FileType[];
  categories: CategoryType[];
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        padding: "2rem",
        width: "100%",
      }}
    >
      {categories?.map((c) => (
        <Box>
          <Image
            width={100}
            height={100}
            alt=""
            src={images?.find((i: FileType) => i.uuid === c.image).file}
          />
        </Box>
      ))}
    </Box>
  );
};

export { CategoriesView };
