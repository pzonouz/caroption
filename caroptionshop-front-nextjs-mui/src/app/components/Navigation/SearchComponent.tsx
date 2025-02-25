"use client";

import {
  Autocomplete,
  Box,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { ProductType } from "@/types/product";
import { SearchAction } from "@/app/actions/search.action";
import { FileType } from "@/types/file";
import Image from "next/image";

export default function SearchBar({ images }: { images: string[] }) {
  console.log(images);
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);

  const ref = useRef(null);

  useEffect(() => {
    ref?.current?.requestSubmit();
  }, [search]);
  const [state, action, loading] = useActionState(SearchAction, null);
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <Box
      ref={ref}
      action={action}
      component="form"
      sx={{ position: "relative" }}
    >
      <TextField
        name="search"
        defaultValue={search}
        onChange={(e) => {
          setSearch(e?.target?.value);
        }}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          },
        }}
      />
      {state?.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "#fff",
            borderRight: "1px solid #777",
            borderLeft: "1px solid #777",
            width: "100%",
          }}
        >
          {state?.map((option: ProductType) => (
            <Box
              key={option?.uuid}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                cursor: "pointer",
                padding: "0.5rem",
                borderBottom: "1px solid #777",
              }}
            >
              <Image
                alt=""
                width={50}
                height={50}
                src={
                  images?.find((item: FileType) => item?.uuid === option?.image)
                    ?.file
                }
              />
              <Box>{option?.title}</Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
