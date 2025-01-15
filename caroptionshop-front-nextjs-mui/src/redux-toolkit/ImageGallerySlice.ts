import { ImageGalleryType } from "@/app/components/Image/ImageGallery";
import { FileType } from "@/types/file";
import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ImageGalleryState {
  image: FileType | null | undefined;
  images: FileType[] | null | undefined;
  open: boolean;
  type: ImageGalleryType;
}

const initialState: ImageGalleryState = {
  image: null,
  images: [],
  open: false,
  type: "single",
};

export const ImageGallery = createSlice({
  name: "ImageGalley",
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<FileType | null | undefined>) => {
      state.image = action.payload;
      state.open = false;
    },
    setImages: (state, action: PayloadAction<FileType | null | undefined>) => {
      state.open = false;
      if (current(state?.images).includes(action.payload)) return;
      state.images = [...state.images, action.payload];
    },
    unSetImage: (state, action: PayloadAction<FileType | null | undefined>) => {
      state.images = state.images?.filter(
        (i) => i.uuid !== action.payload.uuid,
      );
    },
    emptyImages: (state) => {
      state.images = [];
    },

    setGalleryOpenState: (
      state,
      action: PayloadAction<{ open: boolean; type?: ImageGalleryType }>,
    ) => {
      state.open = action.payload.open;
      state.type = action.payload.type || "single";
    },
  },
});

export const {
  setImage,
  setImages,
  unSetImage,
  emptyImages,
  setGalleryOpenState,
} = ImageGallery.actions;

export default ImageGallery.reducer;
