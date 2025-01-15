import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = { text: "" };

const TextboxSlice = createSlice({
  name: "textbox",
  initialState: initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});
