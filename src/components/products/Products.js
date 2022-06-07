import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Products = ({setterFunction}) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    const localKandyUser = localStorage.getItem('kandy_user')
    const userObject = JSON.parse(localKandyUser)

    const navigate = useNavigate()
    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_sort=name&_expand=productType`)
            .then((response) => response.json())
            .then((productsArray) => {
                setProducts(productsArray)
            })
        },
        []
    )

    useEffect(
        () => {
            setFilteredProducts(products)
            setterFunction(products)
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
                {product.name} ({product.productType.type}) - {product.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
            </li>
        })}
    </ul>
    </>

    )
}