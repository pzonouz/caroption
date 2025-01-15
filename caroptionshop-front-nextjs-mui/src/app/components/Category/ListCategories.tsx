"use client";
import {
  CategoryType,
  DeleteMultipleCategoryAction,
} from "@/app/actions/categories.action";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Checkbox,
  Fab,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { SelectCategory } from "./SelectCatgory";
import { useActionState, useEffect, useState } from "react";
import { ModalComponenet } from "../Utils/ModalComponent";
import { CreateCategory } from "./CreateCategory";
import { FileType } from "@/app/actions/files.action";
import { UpdateCategory } from "./UpdateCategory";
import { DeleteCategory } from "./DeleteCategory";
import { LoadingButton } from "@mui/lab";
import { generateParentCategories } from "@/helperFunctions/generateParentCategories";

const ListCategories = ({
  categories,
  images,
}: {
  categories: CategoryType[];
  images: FileType[];
}) => {
  const parentCategories: CategoryType[] = generateParentCategories(categories);
  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
  const [updateCategory, setUpdateCategory] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | number
  >(0);

  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const toggleChecked = (value: string) => {
    if (checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
    } else {
      setCheckedList([...checkedList, value]);
    }
  };
  const [_state, action, loading] = useActionState(
    DeleteMultipleCategoryAction.bind(null, checkedList),
    null,
  );
  useEffect(() => {
    if (selectedCategory) {
      setFilteredCategories((selectedCategory as CategoryType)?.children || []);
    } else {
      setFilteredCategories(
        categories.filter((category) => category.parent === null),
      );
    }
  }, [selectedCategory, categories]);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        marginBottom: "3rem",
      }}
    >
      <Fab
        onClick={() => setCreateCategoryOpen(true)}
        color="primary"
        sx={{ position: "fixed", left: "1rem", bottom: "1rem" }}
      >
        <AddIcon />
      </Fab>
      <ModalComponenet
        open={createCategoryOpen}
        setOpen={setCreateCategoryOpen}
      >
        <CreateCategory categories={categories} images={images} />
      </ModalComponenet>
      <ModalComponenet open={updateCategory} setOpen={setUpdateCategory}>
        <UpdateCategory
          categories={categories}
          images={images}
          category={updateCategory!}
        />
      </ModalComponenet>
      <ModalComponenet open={deleteCategory} setOpen={setDeleteCategory}>
        <DeleteCategory
          category={deleteCategory!}
          setOpen={setDeleteCategory}
        />
      </ModalComponenet>

      <SelectCategory
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={parentCategories}
      />
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Checkbox
                  onChange={() => {
                    if (checkedList.length == filteredCategories.length) {
                      setCheckedList([]);
                      return;
                    }
                    setCheckedList(
                      filteredCategories?.map((item) => item.uuid!),
                    );
                  }}
                  checked={checkedList.length == filteredCategories.length}
                  value={"uuid"}
                />
              </TableCell>
              <TableCell align="left">عنوان</TableCell>
              <TableCell align="center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories?.map((row) => (
              <TableRow
                key={row.uuid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Checkbox
                    onChange={(e) => {
                      toggleChecked(row?.uuid!);
                    }}
                    checked={row?.uuid ? checkedList.includes(row.uuid) : false}
                    value={row?.uuid || "uuid"}
                  />
                </TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      setUpdateCategory(row);
                    }}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => setDeleteCategory(row)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {checkedList.length > 0 && (
        <Box component="form" action={action}>
          <LoadingButton
            loading={loading}
            type="submit"
            color="error"
            variant="contained"
            sx={{ margin: "1rem", width: "fit-content" }}
          >
            حذف
          </LoadingButton>
        </Box>
      )}
    </div>
  );
};

export { ListCategories };
