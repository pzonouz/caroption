import { CategoryType } from "@/types/category";
import { Box } from "@mui/material";

const page = async ({ params }: { params: { uuid: string } }) => {
  const { uuid } = params;
  const categoryRes = await fetch(
    `http://caroption-back:8000/api/v1/categories/${uuid}`,
  );
  if (categoryRes.status === 404) {
    return <Box>404</Box>;
  }
  const category: CategoryType = await categoryRes.json();
  return <Box>{category?.title}</Box>;
};

export default page;
