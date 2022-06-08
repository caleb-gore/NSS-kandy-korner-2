import { Outlet, Route, Routes } from "react-router-dom";
import { Locations } from "../locations/Locations";
import { Orders } from "../orders/Orders";
import { Products } from "../products/Products";
import { ProductSearch } from "../products/ProductSearch";

export const CustomerViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Kandy Korner</h1>
            <div>Your one-stop-shop to get your candy fix</div>

            <Outlet />
          </>
        }
      >
        <Route path="locations" element={<Locations />} />
        <Route path="products" element={<Products />} />
        <Route path="products/search" element={<ProductSearch />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  );
};
