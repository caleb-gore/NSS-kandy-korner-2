import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Products = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [customers, setCustomers] = useState([])

    const localKandyUser = localStorage.getItem('kandy_user')
    const userObject = JSON.parse(localKandyUser)
    const currentCustomer = customers.find(customer => customer.userId === userObject.id)
    const navigate = useNavigate()
   
    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_sort=name&_expand=productType`)
            .then((response) => response.json())
            .then((productsArray) => {
                setProducts(productsArray)
            })

            fetch(`http://localhost:8088/customers`)
            .then((response) => response.json())
            .then((customersArray) => {
                setCustomers(customersArray)
            })
        },
        []
    )

    useEffect(
        () => {
            setFilteredProducts(products)
        },
        [products]
    )



    return (
    <>
    <h2>Products</h2>
    { userObject.staff ? (<>
    <button onClick={
        () => {
            navigate('/products/new_product')
        }
    }>Add New Product</button>
    <button onClick={
        () => {
            const topPriced = products.filter(product => product.price > 2)
            setFilteredProducts(topPriced)
        }
    }>Top Priced</button>
    <button onClick={
        () => {
            setFilteredProducts(products)
        }
    }>Show All</button> 
    </>) : (<>
    <button onClick={
        () => {
            navigate('/products/search')
        }
    }>Find Candy</button></>)}    
    
    <ul>
        {filteredProducts.map(product => {
            return <li key={`product--${product.id}`}>
                {product.name} ({product.productType.type}) - {product.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})} <button
                onClick={
                    () => {
                        fetch(`http://localhost:8088/purchases`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                customerId: currentCustomer.id,
                                productId: product.id,
                                quantity: 1
                            })
                        })
                        .then(response => response.json)
                    }
                }>Purchase</button>
            </li>
        })}
    </ul>
    </>

    )
}