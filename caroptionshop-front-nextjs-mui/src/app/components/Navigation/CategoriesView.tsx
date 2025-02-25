import { CategoryType } from "@/types/category";
import { FileType } from "@/types/file";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

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
      {categories?.map((c: CategoryType) => (
        <Box
          component={Link}
          href={`/category/${c?.uuid}`}
          key={c?.uuid}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            cursor: "pointer",
            gap: "0.5rem",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Image
            width={100}
            height={100}
            alt=""
            src={images?.find((i: FileType) => i.uuid === c.image)?.file}
          />
          <Typography>{c?.title}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export { CategoriesView };
