import { configureStore } from "@reduxjs/toolkit";
import { ImageGallery } from "./ImageGallerySlice";

export const store = configureStore({
  reducer: {
    ImageGallery: ImageGallery.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
