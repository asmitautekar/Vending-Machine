import React from "react";
import { Typography } from "@mui/material";

const ChangeDisplay = ({ change }) => {
  return <Typography variant="h6">Change Returned: ₹{change || 0}</Typography>;
};

export default ChangeDisplay;
