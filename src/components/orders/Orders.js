import { useEffect, useState } from "react"

export const Orders = () => {
const [purchases, setPurchases] = useState([])


useEffect(
    () => {
        fetch(`http://localhost:8088/purchases?_expand=product`)
        .then((response) => response.json())
        .then(
            (purchasesArray) => {
                setPurchases(purchasesArray)
            })
    },
    []
)

return (
<>
<h2>My Orders</h2>
    {
        purchases.map(
            (purchase) => {
                return <div>{purchase.product.name} - {purchase.product.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</div>
            }
        )
    }
</>
)}