import { Outlet, Route, Routes } from "react-router-dom";
import { CustomerDetails } from "../customers/CustomerDetails";
import { Customers } from "../customers/Customers";
import { EmployeeDetails } from "../employees/EmployeeDetails";
import { EmployeeForm } from "../employees/EmployeeForm";
import { Employees } from "../employees/Employees";
import { Locations } from "../locations/Locations";
import { ProductForm } from "../products/ProductForm";
import { Products } from "../products/Products";

export const EmployeeViews = () => {
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
        <Route path="products/new_product" element={<ProductForm />} />
        <Route path="employees" element={<Employees />} />
        <Route path="employees/:employeeId" element={<EmployeeDetails />} />
        <Route path="employees/add_employee" element={<EmployeeForm />} />
        <Route path="customers" element={<Customers />} />
        <Route path="customers/:customerId" element={<CustomerDetails />} />
      </Route>
    </Routes>
  );
};
