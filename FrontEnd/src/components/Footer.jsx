import { Box, Typography } from "@mui/material";
import React from "react";
import ContainerCustom from "./customMUI/ContainerCustom";

function Footer() {
  return (
    <Box component="footer" bgcolor="bg.second" sx={{ boxShadow: 0 }}>
      <ContainerCustom>
        <Box sx={{ textAlign: "center", py: 3 }}>
          <Typography variant="p" color="text.main">
            © 2023 Шолоп | Романецький | Матюшко | Бабич | Іваник
          </Typography>
        </Box>
      </ContainerCustom>
    </Box>
  );
}

export default Footer;
