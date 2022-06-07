import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Employee } from "./Employee";

export const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
      .then((response) => response.json())
      .then((employeesArray) => {
        setEmployees(employeesArray);
      });
  }, []);

  return (
    <>
      <h2>Employees</h2>
      <button
        onClick={() => {
          navigate("/employees/add_employee");
        }}
      >
        Add Employee
      </button>
      <article>
        {employees.map((employee) => (
          <Employee
            key={`employee--${employee.userId}`}
            name={employee.user.name}
            email={employee.user.email}
            id={employee.userId}
          />
        ))}
      </article>
    </>
  );
};
