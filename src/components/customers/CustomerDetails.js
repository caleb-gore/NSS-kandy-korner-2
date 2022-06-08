import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
    const {customerId} = useParams()
    const [customer, updateCustomer] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
            .then((response) => response.json())
            .then((data) => {
                const singleCustomer = data[0]
                updateCustomer(singleCustomer)
            })
        },[customerId]
    )

    return (
        <section>
            <header>{customer?.user?.name}</header>
            <div>Email: {customer?.user?.email}</div>
            <div>Loyalty Number:  <input type="number" value={customer.loyaltyNumber} onChange={
                (evt) => {
                    const copy = {...customer}
                    copy.loyaltyNumber = parseInt(evt.target.value)
                    updateCustomer(copy)
                }
            }/><button
                onClick={
                    () => {
                        fetch(`http://localhost:8088/customers/${customer.id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(customer)
                        })
                        .then(response => response.json)

                        
                    }
                }
                >Update</button></div>
        </section>
    )
}