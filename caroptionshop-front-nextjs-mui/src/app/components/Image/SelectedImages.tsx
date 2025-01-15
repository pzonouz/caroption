import { unSetImage } from "@/redux-toolkit/ImageGallerySlice";
import { RootState } from "@/redux-toolkit/Store";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const SelectedImages = ({ readOnly = false }: { readOnly: Boolean }) => {
  const images = useSelector((state: RootState) => state.ImageGallery.images);

  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      {images?.map((image: any) => (
        <Box key={image?.title} sx={{ position: "relative" }}>
          {!readOnly && (
            <IconButton
              onClick={() => {
                dispatch(unSetImage(image));
              }}
              size="small"
              color="error"
              sx={{
                position: "absolute",
                top: 1,
                left: 0,
                backgroundColor: "white",
                zIndex: 2,
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              opacity: 0.5,
              width: "3.7rem",
              height: "2.5rem",
              backgroundColor: "gray",
            }}
          ></Box>
          <Image alt="" src={image?.file} width={60} height={60} />
        </Box>
      ))}
    </Box>
  );
};
export { SelectedImages };
