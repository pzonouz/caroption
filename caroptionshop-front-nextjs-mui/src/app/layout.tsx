import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { IranXSans } from "./font";
import { ThemeProviderWrapper } from "./components/Utils/ThemeProviderWrapper";
import { CacheRtl } from "./components/Utils/CacheRtl";
import { CssBaseline } from "@mui/material";
import { ReduxProviderWrapper } from "@/redux-toolkit/ReduxProviderWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <script src="https://kit.fontawesome.com/49dfbb741b.js" crossOrigin="anonymous"></script>
      </head>
      <body className={IranXSans.className}>
        <AppRouterCacheProvider>
          <ThemeProviderWrapper>
            <CacheRtl>
              <CssBaseline enableColorScheme />
              <ReduxProviderWrapper>
                {/* <Appbar> */}
                {children}
                {/* </Appbar> */}
              </ReduxProviderWrapper>
            </CacheRtl>
          </ThemeProviderWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
