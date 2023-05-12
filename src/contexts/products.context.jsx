import { createContext, useState } from "react";
import SHOP_DATA from "../shop-data.json";

export const ProductsContext = createContext({
  products: [],
  setProduct: () => null,
});
export const ProductsProvider = ({ children }) => {
  const [products, setCurrentProducts] = useState(SHOP_DATA);
  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};