"use client";

import { ProductType } from "@/app/actions/products.action";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectProduct = ({
  products,
  selectedProduct,
  setSelectedProduct,
}: {
  products: ProductType[];
  selectedProduct: ProductType | number;
  setSelectedProduct: any;
}) => {
  return (
    <FormControl sx={{ minWidth: "80%", marginX: "auto", marginTop: "3rem" }}>
      <InputLabel>Product</InputLabel>
      <Select
        value={selectedProduct || 0}
        onChange={(e) => {
          setSelectedProduct(e?.target?.value);
        }}
        label="Product"
      >
        <MenuItem key={0} value={0}>
          بخش اصلی
        </MenuItem>
        {products.map((category) => {
          return (
            <MenuItem key={category?.title} value={category}>
              {category.title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export { SelectProduct };
