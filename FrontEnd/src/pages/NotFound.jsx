import React from "react";
import { Typography } from "@mui/material";
import ContainerCustom from "../components/customMUI/ContainerCustom";

function NotFound() {
  return (
    <ContainerCustom sx={{ display: "flex", justifyContent: "center", mt: "30vh" }}>
      <Typography variant="h2" color="text.main">
        Упс, сторінку не знайдено...
      </Typography>
    </ContainerCustom>
  );
}

export default NotFound;
