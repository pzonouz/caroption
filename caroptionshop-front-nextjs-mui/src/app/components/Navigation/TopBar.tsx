import { Box, Link } from "@mui/material";

const TopBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        paddingX: "0.5rem",
        alignItems: "center",
        paddingY: "0.5rem",
        justifyContent: "space-between",
        borderBottom: "1px solid #E1E1E1",
      }}
    >
      <Box>
        <a
          style={{
            color: "#3390EC",
            textDecoration: "none",
            fontSize: "1rem",
          }}
          href="tel:0453333333"
        >
          0453333333
        </a>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}>
        <a
        role="none"
          href="#"
          style={{ color: "#3390EC", textDecoration: "none" }}
          className="fa-brands fa-telegram fa-lg"
        />
        <a
        role="none"
          href="#"
          style={{ color: "#fb0060", textDecoration: "none" }}
          className="fa-brands fa-instagram fa-lg"
        />
      </Box>
    </Box>
  );
};

export default TopBar;

