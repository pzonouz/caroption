"use client";

import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Snackbar,
  styled,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UploadIcon from "@mui/icons-material/Upload";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useActionState, useEffect, useRef, useState } from "react";
import { UploadAction } from "@/app/actions/files.action";
import { useDispatch } from "react-redux";
import { setGalleryOpenState } from "@/redux-toolkit/ImageGallerySlice";

const ImageUploader = () => {
  const dispatch = useDispatch();
  const [snackBar, setSnackBar] = useState({
    open: false,
    severity: "error",
    message: "",
  });
  const [state, action, loading] = useActionState(UploadAction, null);

  useEffect(() => {
    if (state?.success) {
      setSnackBar({
        open: true,
        severity: "success",
        message: "فایل با موفقیت آپلود شد",
      });
    }
    if (state?.error) {
      setSnackBar({
        open: true,
        severity: "error",
        message: JSON.stringify(state?.error),
      });
    }
  }, [state]);
  const ref = useRef(null);
  const navabrRef = useRef(null);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  // BUG::While Snackbar open, upload not work
  return (
    <Box width="100%">
      <Snackbar
        id="snackbar"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          height: "8rem",
        }}
        open={snackBar.open}
        autoHideDuration={6000}
        onClose={() => {
          setSnackBar({ ...snackBar, open: false });
        }}
      >
        <Alert
          onClose={() => {
            setSnackBar({ ...snackBar, open: false });
          }}
          severity={snackBar.severity}
          variant="filled"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
      <Box
        ref={navabrRef}
        id="navbar"
        component={"nav"}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #aaa",
          paddingY: "0.5rem",
          boxShadow: "0 2px 4px rgba(247, 248, 249, 0.1)",
          backgroundColor: "rgba(247, 248, 249, 1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton>
            <MenuIcon />
          </IconButton>
          <IconButton>
            <UploadIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            paddingLeft: "1rem",
          }}
        >
          <TextField
            sx={{
              width: "6rem",
              backgroundColor: "#fff",
            }}
            variant="outlined"
            size="small"
          />
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>
      <Box id="uploader" sx={{ width: "100%", padding: "1rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            backgroundColor: "rgba(247, 248, 249, 1)",
            padding: "0.5rem",
          }}
        >
          <Box sx={{ marginRight: "2rem" }}>فایل را انتخاب کنید</Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            component="form"
            ref={ref}
            action={action}
          >
            <IconButton
              component="label"
              disabled={loading}
              sx={{
                display: "flex",
                alignItems: "center",
                color: "black",
                position: "relative",
              }}
            >
              {loading && (
                <CircularProgress size={24} sx={{ position: "absolute" }} />
              )}
              <AddIcon />
              <VisuallyHiddenInput
                disabled={loading}
                name="file"
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                onChange={(event) => {
                  if (
                    event?.target?.files?.length! > 0 &&
                    event.target?.files?.[0]?.size! > 4194304
                  ) {
                    setSnackBar({
                      open: true,
                      severity: "error",
                      message: "حجم فایل بیشتر از 4 مگابایت است",
                    });
                    event.target.value = "";
                    return;
                  }
                  ref.current?.requestSubmit();
                  event.target.value = "";
                }}
              />
            </IconButton>
            <IconButton size="small" sx={{ color: "black" }}>
              <CloseIcon
                onClick={() => dispatch(setGalleryOpenState({ open: false }))}
                fontSize="small"
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box id="image-list"></Box>
    </Box>
  );
};
export { ImageUploader };
