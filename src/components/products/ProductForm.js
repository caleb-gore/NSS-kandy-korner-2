import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {
    const [productTypes, setProductTypes] = useState([])
    const [product, updateProduct] = useState({
        name: "",
        productTypeId: "",
        price: ""
    })

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
            .then((response) => response.json())
            .then((productTypesArray) => {
                setProductTypes(productTypesArray)
            })
        },
        []
    )

    const onButtonClick = (event) => {
        event.preventDefault()

        const productToSendToAPI = {
            name: product.name,
            productTypeId: product.productTypeId,
            price: product.price
        }

        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
        .then(response => response.json())
        .then(() => {
           navigate("/products")
        })

    }
     

    return <>
    <h2>Product Form</h2>
    <form>
        <fieldset>
            <label>Product Name</label>
            <input 
            type='text'
            onChange={
                (evt) => {
                    const copy = {...product}
                    copy.name = evt.target.value
                    updateProduct(copy)
                }
            }/>
        </fieldset>
        <fieldset>
            <label>Product Type</label>
            <select
            onChange={
                (evt) => {
                    const copy = {...product}
                    copy.productTypeId = parseInt(evt.target.value)
                    updateProduct(copy)
                }
            }>
                <option value="0">Choose</option>
                {productTypes.map(
                    type => {
                        return <option key={`productType--${type.id}`} value={type.id}>{type.type}</option>
                    }
                )}
            </select>
        </fieldset>
        <fieldset>
            <label>Price</label>
            <input 
            type="text"
            onChange={
                (evt) => {
                    const copy = {...product}
                    copy.price = parseFloat(evt.target.value)
                    updateProduct(copy)
                }
            }/>
        </fieldset>
        <button
        onClick={
            (evt) => {
                onButtonClick(evt)
            }
        }>Add Product</button>
    </form>
    </>
}