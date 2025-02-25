import { Box } from "@mui/material";
import Image from "next/image";
import SearchBar from "./SearchComponent";
import Link from "next/link";

const TopComponent = async ({ images }: { images: any[] }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link href="/">
        <Image src={"/images/logo.jpg"} alt={"logo"} width="160" height="80" />
      </Link>
      <SearchBar images={images} />
    </Box>
  );
};

export default TopComponent;
