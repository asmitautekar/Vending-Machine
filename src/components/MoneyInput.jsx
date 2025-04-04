import React from "react";
import { Button, Typography, Box } from "@mui/material";

const MoneyInput = ({ denominations, onInsert, insertedMoney }) => {
  return (
    <Box className="money-container">
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
        Insert Money
      </Typography>

      <Box className="money-buttons">
        {denominations.map((value) => (
          <Button
            key={value}
            onClick={() => onInsert(value)}
            className="money-button"
            sx={{
              border: `2px solid #e22827`,
              color: "#e22827",
            }}
          >
            ₹{value}
          </Button>
        ))}
      </Box>

      <Typography variant="body2" className="inserted-amount" sx={{ marginTop: "15px", fontWeight: "bold" }}>
        Inserted: ₹{insertedMoney}
      </Typography>
    </Box>
  );
};

export default MoneyInput;
