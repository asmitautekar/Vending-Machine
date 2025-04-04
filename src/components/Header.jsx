import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar className="toolbar">
        <Typography variant="h6">Vending Machine</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
