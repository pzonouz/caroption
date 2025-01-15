"use client";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Checkbox,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  NativeSelect,
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
// import { SelectProduct } from "./SelectCatgory";
import { SelectCategory } from "../Category/SelectCatgory";
import { useActionState, useEffect, useState } from "react";
import { ModalComponenet } from "../Utils/ModalComponent";
import { CreateProduct } from "./CreateProduct";
import { UpdateProduct } from "./UpdateProduct";
import { DeleteProduct } from "./DeleteProduct";
import { LoadingButton } from "@mui/lab";
import { DeleteMultipleProductAction } from "@/app/actions/products.action";
import { RecursiveSelectOptions } from "../Utils/RecursiveSelect";
import { ProductType } from "@/types/product";
import { CategoryType } from "@/types/category";
import { FileType } from "@/types/file";

const ListProducts = ({
  products,
  categories,
  images,
}: {
  products: ProductType[];
  categories: CategoryType[];
  images: FileType[];
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [createProductOpen, setCreateProductOpen] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const toggleChecked = (value: string) => {
    if (checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
    } else {
      setCheckedList([...checkedList, value]);
    }
  };
  const [_state, action, loading] = useActionState(
    DeleteMultipleProductAction.bind(null, checkedList),
    null,
  );
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
        onClick={() => setCreateProductOpen(true)}
        color="primary"
        sx={{ position: "fixed", left: "1rem", bottom: "1rem" }}
      >
        <AddIcon />
      </Fab>
      <ModalComponenet open={createProductOpen} setOpen={setCreateProductOpen}>
        <CreateProduct categories={categories} images={images} />
      </ModalComponenet>
      <ModalComponenet open={updateProduct} setOpen={setUpdateProduct}>
        <UpdateProduct
          setOpen={setUpdateProduct}
          categories={categories}
          images={images}
          product={updateProduct!}
        />
      </ModalComponenet>
      <ModalComponenet open={deleteProduct} setOpen={setDeleteProduct}>
        <DeleteProduct product={deleteProduct!} setOpen={setDeleteProduct} />
      </ModalComponenet>

      <Box sx={{ display: "flex", padding: "1rem" }}>
        <FormControl fullWidth>
          <InputLabel>دسته بندی</InputLabel>
          <NativeSelect
            value={selectedCategory || "0"}
            onChange={(e) => {
              setSelectedCategory(e.target?.value);
            }}
            sx={{ width: "80%" }}
          >
            <option value={0}>همه</option>
            <RecursiveSelectOptions
              keyField="title"
              textField="title"
              valueField="uuid"
              parentText=""
              items={categories}
            />
          </NativeSelect>
        </FormControl>
      </Box>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Checkbox
                  onChange={() => {
                    if (checkedList.length == filteredProducts.length) {
                      setCheckedList([]);
                      return;
                    }
                    setCheckedList(filteredProducts?.map((item) => item.uuid!));
                  }}
                  checked={checkedList.length == filteredProducts.length}
                  value={"uuid"}
                />
              </TableCell>
              <TableCell align="left">عنوان</TableCell>
              <TableCell align="center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts?.map((row) => (
              <TableRow
                key={row.title}
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
                      setUpdateProduct(row);
                    }}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => setDeleteProduct(row)}>
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

export { ListProducts };
