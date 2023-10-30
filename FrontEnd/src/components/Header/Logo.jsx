import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

const styles = {
  textTransform: "uppercase",
  fontFamily: "Bungee",
  color: "text.main",
  lineHeight: 1,
};

function Logo() {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="logo"
        sx={{
          ...styles,
          color: "yellow.main",
          WebkitTextStrokeWidth: "1px",
          WebkitTextStrokeColor: theme.palette.text.dark,
        }}
      >
        Defense
      </Typography>
      <br />
      <Typography variant="logo" sx={{ ...styles }}>
        resources
      </Typography>
    </Box>
  );
}

export default Logo;
