import { useState } from "react";
import { Products } from "./Products";
import { ProductSearch } from "./ProductSearch";

export const ProductContainer = () => {
    const [products, setProducts] = useState([])

    return (
    <>
      <ProductSearch productsState={products}/>
      <Products setterFunction={setProducts}/>
    </>
  );
};
