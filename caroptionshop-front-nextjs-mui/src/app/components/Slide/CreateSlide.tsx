"use client";
import { useActionState, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { SlideType } from "@/types/slide";
import { CreateSlideAction } from "@/app/actions/slides.action";

const CreateSlide = ({
  slides,
  images,
}: {
  slides: SlideType[];
  images: FileType[];
}) => {
  const image = useSelector((state: RootState) => state.ImageGallery.image);
  const galleryOpen = useSelector(
    (state: RootState) => state.ImageGallery.open,
  );
  const dispatch = useDispatch();
  const [state, action, loading] = useActionState(
    CreateSlideAction.bind(null, image),
    null,
  );
  useEffect(() => {
    if (state?.success) {
      dispatch(setImage(null));
      redirect("/admin/slides");
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
        <Typography variant="h5">ایجاد اسلاید جدید</Typography>
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
        <Typography component={"p"}>اولویت</Typography>
        <TextField
          type="number"
          name="order"
          defaultValue={state?.data?.order || 0}
        />
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
export { CreateSlide };
