"use client";

// TODO:Code refactor, clean up,Tests,CodeSmells, use AI tools

import { useActionState, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RecursiveSelectOptions } from "../Utils/RecursiveSelect";
import {
  Box,
  Fade,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Modal,
  NativeSelect,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";
import { CreateCategoryAction } from "@/app/actions/categories.action";
import { RootState } from "@/redux-toolkit/Store";
import { ImageGallery } from "../Image/ImageGallery";
import Tiptap from "../Utils/Tiptap";
import { LoadingButton } from "@mui/lab";
import {
  setGalleryOpenState,
  setImage,
} from "../../../redux-toolkit/ImageGallerySlice";
import { redirect } from "next/navigation";
import { SelectedImage } from "../Image/SelectedImage";
import { CategoryType } from "@/types/category";
import { FileType } from "@/types/file";

const CreateCategory = ({
  categories,
  images,
}: {
  categories: CategoryType[];
  images: FileType[];
}) => {
  const image = useSelector((state: RootState) => state.ImageGallery.image);
  const galleryOpen = useSelector(
    (state: RootState) => state.ImageGallery.open,
  );
  const [text, setText] = useState("");
  const [status, setStatus] = useState(true);
  const [parent, setParent] = useState("0");
  const dispatch = useDispatch();
  const [state, action, loading] = useActionState(
    CreateCategoryAction.bind(null, parent, text, status, image),
    null,
  );
  useEffect(() => {
    if (state?.success) {
      dispatch(setImage(null));
      redirect("/admin/categories");
    }
  }, [state]);
  return (
    <>
      <Modal
        open={galleryOpen}
        onClose={() => {
          dispatch(setGalleryOpenState({ open: false }));
        }}
        closeAfterTransition
      >
        <Fade in={galleryOpen}>
          <Box
            sx={{
              marginX: "auto",
              marginY: "auto",
              width: "100%",
              height: "100%",
              backgroundColor: "white",
            }}
          >
            <ImageGallery images={images} />
          </Box>
        </Fade>
      </Modal>
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
        <Typography variant="h5">ایجاد دسته بندی جدید</Typography>
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
            value={parent}
            onChange={(e) => {
              setParent(e.target.value);
            }}
            variant="filled"
          >
            <option key={0} style={{ fontFamily: "VazirMatn" }} value="0">
              بخش اصلی
            </option>
            <RecursiveSelectOptions
              textField="title"
              valueField="title"
              keyField="uuid"
              items={categories}
            />
          </NativeSelect>
        </FormControl>
        {image ? (
          <SelectedImage />
        ) : (
          <Button
            component="label"
            color={state?.error?.fieldErrors?.image ? "error" : "primary"}
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<ImageIcon />}
            onClick={() => {
              dispatch(setGalleryOpenState({ open: true, type: "single" }));
            }}
          >
            انتخاب تصویر
          </Button>
        )}
        {state?.error?.fieldErrors?.image && (
          <FormHelperText error>
            {state?.error?.fieldErrors?.image}
          </FormHelperText>
        )}
        <Typography component={"p"}>توضیحات</Typography>
        <Tiptap text={text} setText={setText} />
        <FormControlLabel
          sx={{ width: "100%", textAlign: "left" }}
          dir="rtl"
          label="وضعیت نمایش"
          control={
            <Switch
              checked={status}
              onChange={(e) => setStatus(e.target.checked ? true : false)}
            />
          }
        />
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
export { CreateCategory };
