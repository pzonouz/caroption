import { Box } from "@mui/material";
import Image from "next/image";
import SearchBar from "./SearchComponent";

const TopComponent = () => {
  return (
    <Box sx={{display: "flex",flexDirection:"column", justifyContent: "space-between", alignItems: "center"}}>
      <Image src={"/images/logo.jpg"} alt={"logo"} width="160" height="80"/>
      <SearchBar/>
    </Box>
  )
}

export default TopComponent;