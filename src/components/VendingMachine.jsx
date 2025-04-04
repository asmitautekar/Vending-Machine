import React, { useContext, useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import Product from "./Product";
import MoneyInput from "./MoneyInput";
import ChangeDisplay from "./ChangeDisplay";
import { GlobalStateContext } from "../context/GlobalStateProvider";

const VendingMachine = () => {
  const { products } = useContext(GlobalStateContext);
  const acceptedDenominations = [1, 2, 5, 10, 20, 50, 100];

  const [selectedItems, setSelectedItems] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedItems")) || {};
  });

  const [insertedMoney, setInsertedMoney] = useState(() => {
    return Number(localStorage.getItem("insertedMoney")) || 0;
  });

  const [change, setChange] = useState(() => {
    return Number(localStorage.getItem("change")) || null;
  });

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  useEffect(() => {
    localStorage.setItem("insertedMoney", insertedMoney);
  }, [insertedMoney]);

  useEffect(() => {
    localStorage.setItem("change", change);
  }, [change]);

  const handleSelect = (product) => {
    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[product.id]) {
        updatedItems[product.id].quantity += 1;
      } else {
        updatedItems[product.id] = { ...product, quantity: 1 };
      }
      return updatedItems;
    });
  };

  const handleQuantityChange = (productId, change) => {
    setSelectedItems((prevItems) => {
      const newItems = { ...prevItems };
      if (newItems[productId]) {
        newItems[productId].quantity += change;
        if (newItems[productId].quantity <= 0) {
          delete newItems[productId];
        }
      }
      return newItems;
    });
  };

  const getTotalCost = () => {
    return Object.values(selectedItems).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  const handlePurchase = () => {
    const totalCost = getTotalCost();
    if (totalCost === 0) {
      alert("Select at least one item!");
      return;
    }
    if (insertedMoney >= totalCost) {
      const remainingBalance = insertedMoney - totalCost;
      setChange(remainingBalance);
      setInsertedMoney(remainingBalance);
      setSelectedItems({});
      alert("Purchase successful!");
    } else {
      alert("Not enough money. Please insert more.");
    }
  };

  const handleCancel = () => {
    setSelectedItems({});
    setChange(insertedMoney);
    setInsertedMoney(0);
    alert(`Transaction canceled. ₹${insertedMoney} refunded.`);
  };

  return (
    <Grid className='main-container'>
      <MoneyInput
        denominations={acceptedDenominations}
        onInsert={(amount) => setInsertedMoney((prev) => prev + amount)}
        insertedMoney={insertedMoney}
      />

      <Typography variant="h6" sx={{ marginY: 2 }}>
        Select a Product
      </Typography>

      <Grid container spacing={3} className="product-container">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Product
              product={product}
              onSelect={handleSelect}
              selectedItems={selectedItems}
              onQuantityChange={handleQuantityChange}
            />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ marginY: 2 }}>
        Total Cost: ₹{getTotalCost()}
      </Typography>

      <Grid container spacing={2} sx={{ marginTop: 3, display: "flex", justifyContent: "space-between" }}>
        <Grid item>
          <ChangeDisplay change={change} />
        </Grid>

        <Grid item sx={{ display: "flex", gap: '10px' }}>
          <Button variant="contained" className="product-button" onClick={handlePurchase}>
            Buy
          </Button>
          <Button variant="outlined" className="product-button" onClick={handleCancel}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VendingMachine;