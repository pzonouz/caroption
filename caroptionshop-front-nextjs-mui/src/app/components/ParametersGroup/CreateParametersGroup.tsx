"use client";

// TODO:Code refactor, clean up,Tests,CodeSmells, use AI tools

import { useActionState, useEffect, useRef, useState } from "react";
import { RecursiveSelectOptions } from "../Utils/RecursiveSelect";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CreateParametersGroupAction } from "@/app/actions/parametersGroups.action";
import { redirect } from "next/navigation";
import { CategoryType } from "@/types/category";

const CreateParametersGroup = ({
  categories,
}: {
  categories: CategoryType[];
}) => {
  const categoryRef = useRef(null);
  const [state, action, loading] = useActionState(
    CreateParametersGroupAction,
    null,
  );
  useEffect(() => {
    if (state?.success) {
      redirect("/admin/parameters-groups");
    }
    categoryRef.current.value = !state?.data?.category
      ? "0"
      : state?.data?.category;
  }, [state]);
  return (
    <>
      <Box
        component={"form"}
        action={action}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          padding: "1rem",
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          ایجاد گروه پارامتری جدید
        </Typography>
        <TextField
          name="title"
          defaultValue={state?.data?.title}
          variant="filled"
          label="عنوان"
          helperText={state?.error?.fieldErrors["title"]}
          error={!!state?.error?.fieldErrors["title"]}
        />
        <FormControl fullWidth>
          <InputLabel>دسته بندی</InputLabel>
          <NativeSelect
            error={!!state?.error?.fieldErrors["category"]}
            inputRef={categoryRef}
            defaultValue={state?.data?.category || "0"}
            name="category"
            variant="filled"
          >
            <option key="0" style={{ fontFamily: "VazirMatn" }} value={"0"}>
              لطفا یک دسته بندی را انتخاب کنید
            </option>
            <RecursiveSelectOptions
              textField="title"
              valueField="uuid"
              keyField="uuid"
              items={categories}
            />
          </NativeSelect>
          {
            <FormHelperText error>
              {state?.error?.fieldErrors["category"]?.[0]}
            </FormHelperText>
          }
        </FormControl>
        <FormHelperText error>
          {(state?.error?.formErrors as Array<string>)?.length > 0 &&
            JSON.stringify(state?.error?.formErrors)}
        </FormHelperText>
        <LoadingButton type="submit" variant="contained" loading={loading}>
          ثبت
        </LoadingButton>
      </Box>
    </>
  );
};
export { CreateParametersGroup };
