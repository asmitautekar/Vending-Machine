import React, { createContext, useState, useEffect } from "react";
import productsData from "../data/products.json"

export const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    setProducts(productsData);
  }, []);

  return (
    <GlobalStateContext.Provider value={{ products, setProducts }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
