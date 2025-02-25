"use client";

import { SlideType } from "@/types/slide";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectSlide = ({
  slides,
  selectedSlide,
  setSelectedSlide,
}: {
  slides: SlideType[];
  selectedSlide: SlideType | number;
  setSelectedSlide: any;
}) => {
  return (
    <FormControl sx={{ minWidth: "80%", marginX: "auto", marginTop: "3rem" }}>
      <InputLabel>دسته بندی</InputLabel>
      <Select
        value={selectedSlide || 0}
        onChange={(e) => {
          setSelectedSlide(e?.target?.value);
        }}
        label="دسته بندی"
      >
        <MenuItem key={0} value={0}>
          بخش اصلی
        </MenuItem>
        {slides.map((slide) => {
          return (
            <MenuItem key={slide?.uuid} value={slide}>
              {slide.title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export { Selectslide };
