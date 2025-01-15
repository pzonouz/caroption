"use client";

import theme from "@/theme";
import { ThemeProvider } from "@mui/material";

const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export { ThemeProviderWrapper };
