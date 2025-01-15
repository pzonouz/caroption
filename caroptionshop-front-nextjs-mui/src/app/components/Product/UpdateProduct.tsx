"use client";

import { useActionState, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RecursiveSelectOptions } from "../Utils/RecursiveSelect";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Fade,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Modal,
  NativeSelect,
  Select,
  Snackbar,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";
import {
  AddImagesToProductAction,
  UpdateProductAction,
} from "@/app/actions/products.action";
import { RootState } from "@/redux-toolkit/Store";
import { ImageGallery } from "../Image/ImageGallery";
import Tiptap from "../Utils/Tiptap";
import { LoadingButton, TabContext, TabPanel } from "@mui/lab";
import {
  setGalleryOpenState,
  setImage,
  setImages,
} from "../../../redux-toolkit/ImageGallerySlice";
import { SelectedImage } from "../Image/SelectedImage";
import { SelectedImages } from "../Image/SelectedImages";
import React from "react";
import { NumericInput } from "./NumericInput";
import { CategoryType } from "@/types/category";
import { FileType } from "@/types/file";
import { ParameterType } from "@/types/parameter";
import { UpdateSpecificationAction } from "@/app/actions/specifications.action";
import { SpecificationType } from "@/types/specification";
import { ProductType } from "@/types/product";

const UpdateProduct = ({
  setOpen,
  product,
  categories,
  images,
}: {
  setOpen: Function;
  product: ProductType;
  categories: CategoryType[];
  images: FileType[];
}) => {
  console.log(product);
  const image = useSelector((state: RootState) => state.ImageGallery.image);
  const selectedImages = useSelector(
    (state: RootState) => state.ImageGallery.images,
  );
  const galleryOpen = useSelector(
    (state: RootState) => state.ImageGallery.open,
  );
  const [description, setDescription] = useState(product?.description);
  const [review, setReview] = useState(product?.review);
  const [status, setStatus] = useState(product?.status);
  const [category, setCategory] = useState<string>(product?.category);
  const [tab, setTab] = useState("1");
  const [updateProductAlert, setUpdateProductAlert] = useState(false);
  const [imagesAssignAlert, setImagesAssignAlert] = useState(false);

  const dispatch = useDispatch();
  const [state, action, loading] = useActionState(
    UpdateProductAction.bind(
      null,
      product?.uuid!,
      status,
      image,
      description,
      review,
      category,
    ),
    null,
  );

  const [stateImages, actionImages, loadingImages] = useActionState(
    AddImagesToProductAction.bind(null, product?.uuid!, selectedImages),
    null,
  );
  const [stateSpecification, actionSpecification, loadingSpecification] =
    useActionState(UpdateSpecificationAction.bind(null, product?.uuid), null);

  useEffect(() => {
    dispatch(
      setImage(images?.filter((image) => image?.uuid == product?.image)?.[0]),
    );
    images?.map((image) => {
      if (product?.images?.includes(image?.uuid)) {
        dispatch(setImages(image));
      }
    });
  }, []);

  useEffect(() => {
    if (stateImages?.success) {
      setImagesAssignAlert(true);
    }
  }, [stateImages]);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state]);
  return (
    <>
      <Snackbar
        open={updateProductAlert}
        autoHideDuration={6000}
        onClose={() => {
          setUpdateProductAlert(false);
        }}
      >
        <Alert
          onClose={() => {}}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          محصول ایجاد شد
        </Alert>
      </Snackbar>
      <Snackbar
        open={imagesAssignAlert}
        autoHideDuration={6000}
        onClose={() => {
          setImagesAssignAlert(false);
        }}
      >
        <Alert
          onClose={() => {}}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          تصاویر اضافه شد
        </Alert>
      </Snackbar>
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
      <Typography sx={{ textAlign: "center" }} variant="h5">
        ویرایش محصول
      </Typography>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={(e, value) => {
              setTab(value);
            }}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab label="مشخصات" value="1" />
            <Tab label="تصاویر" value="2" />
            <Tab label="مشخصات فنی" value="3" />
          </Tabs>
        </Box>
        <TabPanel value="1" keepMounted>
          <Box
            component={"form"}
            action={action}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            <TextField
              name="title"
              defaultValue={state?.data?.title || product?.title}
              variant="filled"
              label="عنوان"
              helperText={state?.error?.fieldErrors?.["title"]}
              error={!!state?.error?.fieldErrors?.["title"]}
            />
            <TextField
              name="subtitle"
              defaultValue={state?.data?.subtitle || product?.subtitle}
              variant="filled"
              label="عنوان فرعی"
              helperText={state?.error?.fieldErrors?.["subtitle"]}
              error={!!state?.error?.fieldErrors?.["subtitle"]}
            />
            <NumericInput
              name="weight"
              defaultValue={state?.data?.weigth || product?.weight}
              label="وزن به گرم"
              helperText={state?.error?.fieldErrors?.["weight"]}
              error={!!state?.error?.fieldErrors?.["weight"]}
            />
            <FormControl fullWidth>
              <InputLabel>دسته بندی</InputLabel>
              <NativeSelect
                value={
                  state?.value?.category ||
                  (product?.category as CategoryType)?.uuid
                }
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                variant="filled"
              >
                <RecursiveSelectOptions
                  textField="title"
                  valueField="uuid"
                  keyField="uuid"
                  items={categories}
                />
              </NativeSelect>
            </FormControl>
            <NumericInput
              name="quantity"
              label="موجودی"
              defaultValue={state?.data?.quantity || product?.quantity}
              helperText={state?.error?.fieldErrors?.["quantity"]}
              error={!!state?.error?.fieldErrors?.["quantity"]}
            />
            <NumericInput
              name="price"
              label="قیمت"
              defaultValue={state?.data?.price || product?.price}
              helperText={state?.error?.fieldErrors?.["price"]}
              error={!!state?.error?.fieldErrors?.["price"]}
            />
            <NumericInput
              name="price2"
              defaultValue={state?.data?.price2 || product?.price2}
              label="قیمت همکار"
              helperText={state?.error?.fieldErrors?.["price2"]}
              error={!!state?.error?.fieldErrors?.["price2"]}
            />
            <NumericInput
              name="discount"
              defaultValue={state?.data?.discount || product?.discount}
              label="تخفیف(٪)"
              helperText={state?.error?.fieldErrors?.["discount"]}
              error={!!state?.error?.fieldErrors?.["discount"]}
            />
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
                  dispatch(setGalleryOpenState({ open: true }));
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
            <Typography sx={{ marginBottom: "-1rem" }} component={"p"}>
              معرفی اجمالی
            </Typography>
            <Tiptap
              text={description}
              setText={setDescription}
              editable={!product}
            />
            {state?.error?.fieldErrors?.description && (
              <FormHelperText error sx={{ marginTop: "-1rem" }}>
                {state?.error?.fieldErrors?.description?.[0]}
              </FormHelperText>
            )}
            <TextField
              multiline
              label="مزایا"
              name="cons"
              defaultValue={state?.data?.cons || product?.cons}
              variant="filled"
              helperText={state?.error?.fieldErrors?.["cons"]}
              error={!!state?.error?.fieldErrors?.["cons"]}
            />
            <TextField
              multiline
              label="معایب"
              name="pros"
              defaultValue={state?.data?.pros || product?.pros}
              variant="filled"
              helperText={state?.error?.fieldErrors?.["pros"]}
              error={!!state?.error?.fieldErrors?.["pros"]}
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
            <Typography sx={{ marginBottom: "-1rem" }} component="p">
              نقد و بررسی
            </Typography>

            <Tiptap editable={true} text={review || ""} setText={setReview} />
            {state?.error?.fieldErrors?.review && (
              <FormHelperText error sx={{ marginTop: "-1rem" }}>
                {state?.error?.fieldErrors?.review?.[0]}
              </FormHelperText>
            )}
            <FormHelperText error>
              {(state?.error?.formErrors as Array<string>)?.length > 0 &&
                JSON.stringify(state?.error?.formErrors)}
            </FormHelperText>
            <LoadingButton
              color={state?.error ? "error" : "primary"}
              type="submit"
              variant="contained"
              loading={loading}
            >
              ثبت
            </LoadingButton>
          </Box>
        </TabPanel>
        <TabPanel value="2" sx={{ width: "100%" }} keepMounted>
          <SelectedImages readOnly={false} />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<ImageIcon />}
            onClick={() => {
              dispatch(setGalleryOpenState({ open: true, type: "multiple" }));
            }}
          >
            انتخاب تصاویر
          </Button>
          <Box component="form" action={actionImages} sx={{ width: "100%" }}>
            <FormHelperText error>
              {stateImages?.error?.length > 0 &&
                JSON.stringify(stateImages?.error)}
            </FormHelperText>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={loadingImages}
              sx={{ marginTop: "1rem" }}
            >
              افزودن تصاویر
            </LoadingButton>
          </Box>
        </TabPanel>
        <TabPanel value="3" keepMounted>
          {categories
            .filter((c) => c.uuid === product?.category)?.[0]
            ?.parameter_groups?.map((p) => (
              <Accordion key={p?.uuid}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography component="span" sx={{ fontFamily: "VazirMatn" }}>
                    {p?.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {p?.parameters?.map((param: ParameterType) => {
                    if (param?.parameter_type == "TF") {
                      return (
                        <Box
                          component="form"
                          action={actionSpecification}
                          key={param?.uuid}
                          sx={{ display: "flex", gap: "1rem" }}
                        >
                          <TextField
                            key={param?.uuid}
                            name="value"
                            defaultValue={
                              product?.specifications?.find(
                                (s) => s?.parameter === param?.uuid,
                              )?.value
                            }
                            label={param?.title}
                            helperText={
                              stateSpecification?.error?.fieldErrors?.[`value`]
                            }
                            error={
                              !!stateSpecification?.error?.fieldErrors?.[
                                `value`
                              ]
                            }
                          />
                          <input
                            hidden
                            type="text"
                            name="uuid"
                            defaultValue={
                              (
                                product?.specifications as SpecificationType[]
                              )?.find((s) => s?.parameter === param?.uuid)?.uuid
                            }
                          />
                          <input
                            hidden
                            type="text"
                            name="parameter"
                            defaultValue={param?.uuid}
                          />
                          <LoadingButton
                            loading={loadingSpecification}
                            variant="contained"
                            type="submit"
                          >
                            ثبت
                          </LoadingButton>
                        </Box>
                      );
                    }
                    if (param?.parameter_type == "BF") {
                      return (
                        <TextField
                          key={param?.uuid}
                          name={`parameter-${param?.uuid}`}
                          label={param?.title}
                        />
                      );
                    }
                    if (param?.parameter_type == "SO") {
                      return (
                        <Select
                          native
                          key={param?.uuid}
                          name={`parameter-${param?.uuid}`}
                        >
                          {param.values.split("،")?.map((item) => (
                            <option value={item} key={item}>
                              {item}
                            </option>
                          ))}
                        </Select>
                      );
                    }
                  })}
                </AccordionDetails>
              </Accordion>
            ))}
        </TabPanel>
      </TabContext>
    </>
  );
};
export { UpdateProduct };
