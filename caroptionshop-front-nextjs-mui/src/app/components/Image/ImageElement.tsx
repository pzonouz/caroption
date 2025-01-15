import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import TickIcon from "@mui/icons-material/Check";
import { useActionState } from "react";
import { DeleteFileAction } from "@/app/actions/files.action";
import { useDispatch, useSelector } from "react-redux";
import { setImage, setImages } from "@/redux-toolkit/ImageGallerySlice";
import { ImageGalleryType } from "./ImageGallery";
import { FileType } from "@/types/file";

const ImageElement = ({
  image,
  select,
  setSelect,
}: {
  image: FileType;
  select: string;
  setSelect: Function;
}) => {
  const dispatch = useDispatch();
  const images: FileType[] = useSelector(
    (state: any) => state.ImageGallery.images,
  );
  const type: ImageGalleryType = useSelector(
    (state: any) => state.ImageGallery.type,
  );
  const [_state, action, deleteLoading] = useActionState(
    DeleteFileAction.bind(null, image?.uuid),
    null,
  );
  return (
    <Box
      sx={[
        {
          position: "relative",
          display: "inline-flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 0,
          width: "100%",
          marginY: "0.5rem",
          gap: "1rem",
        },
        select === image?.title && { border: "2px solid blue" },
      ]}
      onClick={() => {
        setSelect(image?.title);
      }}
    >
      <Image
        style={{ display: "block" }}
        width={100}
        height={100}
        src={image?.file || "/images/placeholder.jpg"}
        alt="image"
      />
      <Typography sx={{ textAlign: "right" }}>{image?.title}</Typography>
      {select === image?.title && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {!images.includes(image) && (
            <IconButton
              onClick={() => {
                if (type === "single") {
                  dispatch(setImage(image));
                }
                if (type === "multiple") {
                  dispatch(setImages(image));
                }
              }}
              sx={{ position: "relative" }}
            >
              <TickIcon color="success" />
            </IconButton>
          )}
          <Box component="form" action={action}>
            <IconButton
              type="submit"
              disabled={deleteLoading}
              sx={{ position: "relative" }}
            >
              {deleteLoading && (
                <CircularProgress color="error" sx={{ position: "absolute" }} />
              )}
              <DeleteIcon
                color="error"
                sx={[deleteLoading && { color: "gray" }]}
              />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export { ImageElement };
