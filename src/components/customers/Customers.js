import { useEffect, useState } from "react"
import { Customer } from "./Customer"

export const Customers = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user`)
            .then((response) => response.json())
            .then((customersArray) => {
                setCustomers(customersArray)
            })
        },[]
    )

    return (
        <>
        <h2>Customers</h2>
        <article>
            {
                customers.map(customer => <Customer key={`customer--${customer.userId}`} id={customer.userId} name={customer.user.name} email={customer.user.email} />)
            }
        </article>
        </>
    )
}