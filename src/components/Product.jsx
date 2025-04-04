import React from "react";
import { Typography, Button } from "@mui/material";

const Product = ({ product, onSelect, selectedItems, onQuantityChange }) => {
  const productImage = product.image ? `../assets/${product.image}` : null;
  const selectedItem = selectedItems[product.id] || { quantity: 0 };

  return (
    <div className="product-card">
      {productImage ? (
        <img src={productImage} alt={product.name} className="product-image" />
      ) : (
        <Typography variant="body2" color="error">
          Image not available
        </Typography>
      )}

      <div className="product-details">
        <Typography className="product-name">{product.name}</Typography>
        <Typography className="product-price">₹{product.price}</Typography>
      </div>

      <div className="product-button-group">
        {selectedItem.quantity > 0 ? (
          <div className="quantity-controls">
            <Button onClick={() => onQuantityChange(product.id, -1)}>-</Button>
            <Typography>{selectedItem.quantity}</Typography>
            <Button onClick={() => onQuantityChange(product.id, 1)}>+</Button>
          </div>
        ) : (
          <Button 
            className="product-button" 
            onClick={(e) => {  
              onSelect(product); 
            }}
          >
            Add
          </Button>
        )}
      </div>
    </div>
  );
};

export default Product;