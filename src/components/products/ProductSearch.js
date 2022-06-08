import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [productLocations, setProductLocations] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    fetch(`http://localhost:8088/products?_embed=productLocationMatch`)
      .then((response) => response.json())
      .then((productsArray) => {
        setProducts(productsArray);
      })

    fetch(`http://localhost:8088/productLocationMatch`)
    .then((response) => response.json())
    .then((productLocationArray) => {
        setProductLocations(productLocationArray)
    })
      
  }, []);

  return (
    <>
      <h2>Product Search</h2>
      <label>What Candy are you Looking For?</label>
      <input
        type="text"
        onChange={(evt) => {
          setSearchTerm(evt.target.value);
        }}
      />

      <ul>
        {products.map((product) => {
          if (product.name.toLowerCase().startsWith(searchTerm.toLowerCase()) && searchTerm) {
            return (
              <li key={`product--${product.id}`}>
                {product.name} - {product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </li>
            );
          }
        })}
      </ul>
    </>
  );
};
