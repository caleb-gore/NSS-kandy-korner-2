import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EmployeeDetails = () => {
    const {employeeId} = useParams()
    const [employee, updateEmployee] = useState({})

    const navigate = useNavigate()
    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_expand=location&userId=${employeeId}`)
            .then((response) => response.json())
            .then((data) => {
                const singleEmployee = data[0]
                updateEmployee(singleEmployee)
            })
        },
        [employeeId]
    )
    return <section className="employee">
        <header className="employee__header">{employee?.user?.name}</header>
        <div>Email: {employee?.user?.email}</div>
        <div>Location: {employee?.location?.address}</div>
        <div>Pay Rate: {employee.payRate}</div>
        <div>Start Date: {employee.startDate}</div>
        <button onClick={
            () => {
                fetch(`http://localhost:8088/employees/${employee.id}`, {
                    method: "DELETE"
                })

                fetch(`http://localhost:8088/users/${employee.userId}`, {
                    method: "DELETE"
                })
                .then(() => {
                    navigate("/employees")
                })
            }
        }>Remove Employee</button>
    </section>
}