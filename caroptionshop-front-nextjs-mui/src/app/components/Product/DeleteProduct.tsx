"use client";

import { DeleteProductAction } from "@/app/actions/products.action";
import { ProductType } from "@/types/product";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography } from "@mui/material";
import { useActionState, useEffect } from "react";
const DeleteProduct = ({
  product,
  setOpen,
}: {
  product: ProductType;
  setOpen: Function;
}) => {
  const [state, action, loading] = useActionState(
    DeleteProductAction.bind(null, product?.uuid!),
    null,
  );
  useEffect(() => {
    if (state?.success) {
      setOpen(null);
    }
  }, [state]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "8rem",
        marginTop: "4rem",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Typography variant="h5">آيا مطمئن هستید؟</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "8rem",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Box component="form" action={action}>
          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            color="error"
          >
            بله
          </LoadingButton>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpen(null);
          }}
        >
          خیر
        </Button>
      </Box>
    </Box>
  );
};
export { DeleteProduct };
