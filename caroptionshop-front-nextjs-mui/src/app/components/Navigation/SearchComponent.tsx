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
import Image from "next/image";
import { ProductType } from "@/types/product";
import { SearchAction } from "@/app/actions/search.action";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);

  const ref = useRef(null);

  useEffect(() => {
    ref?.current?.requestSubmit();
  }, [search]);
  const [state, action, loading] = useActionState(SearchAction, null);

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
      <Box sx={{ position: "absolute" }}>
        {state?.map((option: ProductType) => (
          <Box
            key={option?.uuid}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.5rem",
            }}
          >
            <Image alt="" src={option?.file} width={60} height={60} />
            <Box>{option?.title}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
