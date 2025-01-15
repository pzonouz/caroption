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
  CreateProductAction,
} from "@/app/actions/products.action";
import { RootState } from "@/redux-toolkit/Store";
import { ImageGallery } from "../Image/ImageGallery";
import Tiptap from "../Utils/Tiptap";
import { LoadingButton, TabContext, TabPanel } from "@mui/lab";
import {
  emptyImages,
  setGalleryOpenState,
  setImage,
} from "../../../redux-toolkit/ImageGallerySlice";
import { SelectedImage } from "../Image/SelectedImage";
import { SelectedImages } from "../Image/SelectedImages";
import React from "react";
import { NumericInput } from "./NumericInput";
import { CategoryType } from "@/types/category";
import { FileType } from "@/types/file";
import { ParameterType } from "@/types/parameter";
import { CreateSpecificationAction } from "@/app/actions/specifications.action";
import { SpecificationType } from "@/types/specification";

const CreateProduct = ({
  categories,
  images,
}: {
  categories: CategoryType[];
  images: FileType[];
}) => {
  const image = useSelector((state: RootState) => state.ImageGallery.image);
  const selectedImages = useSelector(
    (state: RootState) => state.ImageGallery.images,
  );
  const galleryOpen = useSelector(
    (state: RootState) => state.ImageGallery.open,
  );
  const [description, setDescription] = useState("");
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState(true);
  const [category, setCategory] = useState<string>(categories[0].uuid);
  const [tab, setTab] = useState("1");
  const [createProductAlert, setCreateProductAlert] = useState(false);
  const [imagesAssignAlert, setImagesAssignAlert] = useState(false);
  const [imagesAssigned, setImagesAssigned] = useState<Boolean>(false);
  const [registeredSpecification, setRegisteredSpecification] = useState<
    SpecificationType[]
  >([]);

  const dispatch = useDispatch();
  const [state, action, loading] = useActionState(
    CreateProductAction.bind(
      null,
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
    useActionState(CreateSpecificationAction.bind(null, product?.uuid), null);
  useEffect(() => {
    if (state?.product) {
      setProduct(state?.product);
      setCreateProductAlert(true);
    } else {
      setReview(state?.data?.review);
      setDescription(state?.data?.description);
    }
  }, [state]);

  useEffect(() => {
    if (stateImages?.success) {
      setImagesAssignAlert(true);
      setImagesAssigned(true);
    }
  }, [stateImages]);
  useEffect(() => {
    if (stateSpecification?.success) {
      setRegisteredSpecification((s) => [...s, stateSpecification?.data]);
    }
  }, [stateSpecification]);

  useEffect(() => {}, [registeredSpecification]);
  return (
    <>
      <Snackbar
        open={createProductAlert}
        autoHideDuration={6000}
        onClose={() => {
          setCreateProductAlert(false);
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
        ایجاد محصول جدید
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
              defaultValue={state?.data?.title}
              variant="filled"
              label="عنوان"
              helperText={state?.error?.fieldErrors?.["title"]}
              error={!!state?.error?.fieldErrors?.["title"]}
              slotProps={{ input: { readOnly: product } }}
            />
            <TextField
              name="subtitle"
              defaultValue={state?.data?.subtitle}
              variant="filled"
              label="عنوان فرعی"
              helperText={state?.error?.fieldErrors?.["subtitle"]}
              error={!!state?.error?.fieldErrors?.["subtitle"]}
              slotProps={{ input: { readOnly: product } }}
            />
            <NumericInput
              readOnly={product}
              name="weight"
              defaultValue={state?.data?.weigth}
              label="وزن به گرم"
              helperText={state?.error?.fieldErrors?.["weight"]}
              error={!!state?.error?.fieldErrors?.["weight"]}
            />
            <FormControl fullWidth>
              <InputLabel>دسته بندی</InputLabel>
              <NativeSelect
                value={category || state?.value?.category}
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
              readOnly={product}
              name="quantity"
              label="موجودی"
              defaultValue={state?.data?.quantity}
              helperText={state?.error?.fieldErrors?.["quantity"]}
              error={!!state?.error?.fieldErrors?.["quantity"]}
            />
            <NumericInput
              readOnly={product}
              name="price"
              label="قیمت"
              defaultValue={state?.data?.price}
              helperText={state?.error?.fieldErrors?.["price"]}
              error={!!state?.error?.fieldErrors?.["price"]}
            />
            <NumericInput
              readOnly={product}
              name="price2"
              defaultValue={state?.data?.price2}
              label="قیمت همکار"
              helperText={state?.error?.fieldErrors?.["price2"]}
              error={!!state?.error?.fieldErrors?.["price2"]}
            />
            <NumericInput
              readOnly={product}
              name="discount"
              defaultValue={state?.data?.discount}
              label="تخفیف(٪)"
              helperText={state?.error?.fieldErrors?.["discount"]}
              error={!!state?.error?.fieldErrors?.["discount"]}
            />
            {image ? (
              <SelectedImage readOnly={product} />
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
              text={description || ""}
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
              defaultValue={state?.data?.cons}
              variant="filled"
              helperText={state?.error?.fieldErrors?.["cons"]}
              error={!!state?.error?.fieldErrors?.["cons"]}
              slotProps={{ input: { readOnly: product } }}
            />
            <TextField
              multiline
              label="معایب"
              name="pros"
              defaultValue={state?.data?.pros}
              variant="filled"
              helperText={state?.error?.fieldErrors?.["pros"]}
              error={!!state?.error?.fieldErrors?.["pros"]}
              slotProps={{ input: { readOnly: product } }}
            />
            <FormControlLabel
              sx={{ width: "100%", textAlign: "left" }}
              dir="rtl"
              label="وضعیت نمایش"
              control={
                <Switch
                  readOnly={product}
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked ? true : false)}
                />
              }
            />
            <Typography sx={{ marginBottom: "-1rem" }} component="p">
              نقد و بررسی
            </Typography>

            <Tiptap
              text={review || ""}
              setText={setReview}
              editable={!product}
            />
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
              disabled={product}
              type="submit"
              variant="contained"
              loading={loading}
              color={state?.error ? "error" : "primary"}
            >
              ثبت
            </LoadingButton>
          </Box>
        </TabPanel>
        <TabPanel value="2" sx={{ width: "100%" }} keepMounted>
          {product ? (
            <>
              <SelectedImages readOnly={imagesAssigned} />
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<ImageIcon />}
                disabled={!!imagesAssigned}
                onClick={() => {
                  dispatch(
                    setGalleryOpenState({ open: true, type: "multiple" }),
                  );
                }}
              >
                انتخاب تصاویر
              </Button>
              <Box
                component="form"
                action={actionImages}
                sx={{ width: "100%" }}
              >
                <FormHelperText error>
                  {stateImages?.error?.length > 0 &&
                    JSON.stringify(stateImages?.error)}
                </FormHelperText>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={loadingImages}
                  sx={{ marginTop: "1rem" }}
                  disabled={!!imagesAssigned}
                >
                  افزودن تصاویر
                </LoadingButton>
              </Box>
            </>
          ) : (
            <Typography sx={{ textAlign: "center", color: "error.main" }}>
              لطفا محصول را ایجاد کنید
            </Typography>
          )}
        </TabPanel>
        <TabPanel value="3" keepMounted>
          {product ? (
            categories
              .filter((c) => c.uuid === product?.category)?.[0]
              ?.parameter_groups?.map((p) => (
                <Accordion key={p?.uuid}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography
                      component="span"
                      sx={{ fontFamily: "VazirMatn" }}
                    >
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
                              slotProps={{
                                input: {
                                  readOnly: !!registeredSpecification?.filter(
                                    (item: SpecificationType) =>
                                      item?.product == product?.uuid &&
                                      item?.parameter == param?.uuid,
                                  )?.[0]?.value,
                                },
                              }}
                              key={param?.uuid}
                              name={"value"}
                              defaultValue={
                                registeredSpecification?.filter(
                                  (item: SpecificationType) =>
                                    item?.product == product?.uuid &&
                                    item?.parameter == param?.uuid,
                                )?.[0]?.value
                              }
                              label={param?.title}
                              helperText={
                                stateSpecification?.error?.fieldErrors?.[
                                  `value`
                                ]
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
                              name="parameter"
                              defaultValue={param?.uuid}
                            />
                            <LoadingButton
                              loading={loadingSpecification}
                              variant="contained"
                              type="submit"
                              disabled={
                                !!registeredSpecification?.filter(
                                  (item: SpecificationType) =>
                                    item?.product == product?.uuid &&
                                    item?.parameter == param?.uuid,
                                )?.[0]?.value
                              }
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
              ))
          ) : (
            <Typography sx={{ textAlign: "center", color: "error.main" }}>
              لطفا محصول را ایجاد کنید
            </Typography>
          )}
        </TabPanel>
      </TabContext>
    </>
  );
};
export { CreateProduct };
