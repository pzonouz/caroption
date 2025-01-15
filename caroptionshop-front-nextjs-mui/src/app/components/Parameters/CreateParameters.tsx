"use client";

// TODO:Code refactor, clean up,Tests,CodeSmells, use AI tools

import React, { useActionState, useEffect, useRef, useState } from "react";
import { RecursiveSelectOptions } from "../Utils/RecursiveSelect";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { redirect } from "next/navigation";
import { CreateParameterAction } from "@/app/actions/parameters.action";
import { CategoryType } from "@/types/category";
import { ParametersGroupType } from "@/types/parameterGroup";

const CreateParameter = ({
  recursiveCategories,
  categories,
}: {
  recursiveCategories: CategoryType[];
  categories: CategoryType[];
}) => {
  const [category, setCategory] = useState("0");
  const [parameterGroup, setParameterGroup] = useState("0");
  const [parameterType, setParameterType] = useState("TF");
  const [parameterGroups, setParameterGroups] = useState<ParametersGroupType[]>(
    [],
  );
  const categoryRef = useRef(null);
  const typeRef = useRef(null);

  const [state, action, loading] = useActionState(
    CreateParameterAction.bind(null, category, parameterGroup, parameterType),
    null,
  );
  useEffect(() => {
    if (state?.data) {
      categoryRef.current.value = state.data.category;
      typeRef.current.value = state.data.parameter_type;
    }
    if (state?.success) {
      redirect("/admin/parameters");
    }
  }, [state]);
  useEffect(() => {
    const selectedCategory = categories?.filter((c) => c.uuid == category)?.[0];
    setParameterGroups(selectedCategory?.parameter_groups);
  }, [category]);

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
          ایجاد پارامتر جدید
        </Typography>
        <FormControl
          error={state?.error?.fieldErrors["category"]?.length > 0}
          variant="filled"
          fullWidth
        >
          <InputLabel>دسته بندی</InputLabel>
          <Select
            error={state?.error?.fieldErrors["category"]?.length > 0}
            inputRef={categoryRef}
            native
            value={category}
            onChange={(e: SelectChangeEvent) => {
              setCategory(e.target?.value);
            }}
            variant="filled"
          >
            <option value="0" key="0">
              لطفا یک دسته بندی را انتخاب کنید
            </option>
            <RecursiveSelectOptions
              items={recursiveCategories}
              keyField="uuid"
              textField="title"
              valueField="uuid"
            />
          </Select>
          {state?.error?.fieldErrors["category"]?.length > 0 && (
            <FormHelperText error>
              {state?.error?.fieldErrors["category"]?.[0]}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl variant="filled" fullWidth>
          <InputLabel>گروه پارامتر</InputLabel>
          <Select
            error={state?.error?.fieldErrors["group"]?.length > 0}
            value={parameterGroup}
            onChange={(e) => {
              setParameterGroup(e.target.value);
            }}
            label="گروه پارامتر"
          >
            <MenuItem value={"0"} selected>
              لطفا یک گروه را انتخاب کنید
            </MenuItem>
            {parameterGroups?.map((parameterGroup) => (
              <MenuItem key={parameterGroup.uuid} value={parameterGroup.uuid}>
                {parameterGroup.title}
              </MenuItem>
            ))}
          </Select>
          {state?.error?.fieldErrors["group"]?.length > 0 && (
            <FormHelperText error>
              {state?.error?.fieldErrors["group"]?.[0]}
            </FormHelperText>
          )}
        </FormControl>

        <TextField
          name="title"
          defaultValue={state?.data?.title}
          variant="filled"
          label="عنوان"
          helperText={state?.error?.fieldErrors["title"]}
          error={!!state?.error?.fieldErrors["title"]}
        />
        <FormControl variant="filled" fullWidth>
          <InputLabel>نوع پارامتر</InputLabel>
          <Select
            inputRef={typeRef}
            label="نوع پارامتر"
            value={parameterType}
            onChange={(e) => setParameterType(e.target.value)}
          >
            <MenuItem value="TF">متن</MenuItem>
            <MenuItem value="BF">دارد ندارد</MenuItem>
            <MenuItem value="SO">لیست کشویی</MenuItem>
            <MenuItem value="SM">لیست تیک دار</MenuItem>
          </Select>
        </FormControl>
        {(parameterType === "SO" || parameterType === "SM") && (
          <TextField
            name="values"
            defaultValue={state?.data?.values}
            variant="filled"
            label="مقادیر"
            helperText={state?.error?.fieldErrors["values"]}
            error={!!state?.error?.fieldErrors["values"]}
          />
        )}

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
export { CreateParameter };
