import { CategoryType } from "@/app/actions/categories.action";

const getparentCategories = (categories: CategoryType[], temp: any[]) => {
  categories?.forEach((category) => {
    if (category?.children?.length! > 0) {
      temp.push(category);
      getparentCategories(category?.children!, temp);
    }
  });
  return temp;
};
const generateParentCategories = (categories: CategoryType[]) => {
  const parentCategories: CategoryType[] = [];
  getparentCategories(categories, parentCategories);
  return parentCategories;
};

export { generateParentCategories };
