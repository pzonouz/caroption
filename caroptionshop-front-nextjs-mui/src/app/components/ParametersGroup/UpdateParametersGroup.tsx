"use client";

// TODO:Code refactor, clean up,Tests,CodeSmells, use AI tools

import { useActionState, useEffect } from "react";
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
import { CategoryType } from "@/app/actions/categories.action";
import { LoadingButton } from "@mui/lab";
import { redirect } from "next/navigation";
import {
  ParametersGroupType,
  UpdateParametersGroupAction,
} from "@/app/actions/parametersGroups.action";

const UpdateParametersGroup = ({
  categories,
  parametersGroup,
}: {
  categories: CategoryType[];
  parametersGroup: ParametersGroupType;
}) => {
  const [state, action, loading] = useActionState(
    UpdateParametersGroupAction.bind(null, parametersGroup?.uuid!),
    null,
  );
  useEffect(() => {
    if (state?.success) {
      redirect("/admin/parameters-groups");
    }
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
        <Typography variant="h5">ویرایش گروه پارامتری</Typography>
        <TextField
          name="title"
          defaultValue={state?.data?.title || parametersGroup?.title}
          variant="filled"
          label="عنوان"
          helperText={state?.error?.fieldErrors["title"]}
          error={!!state?.error?.fieldErrors["title"]}
        />
        <FormControl fullWidth>
          <InputLabel>دسته بندی</InputLabel>
          <NativeSelect
            defaultValue={parametersGroup?.category}
            name="category"
            label="دسته بندی"
            variant="filled"
          >
            <option key={0} style={{ fontFamily: "VazirMatn" }} value={0}>
              بخش اصلی
            </option>
            <RecursiveSelectOptions
              textField="title"
              valueField="uuid"
              keyField="uuid"
              items={categories}
            />
          </NativeSelect>
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
export { UpdateParametersGroup };
