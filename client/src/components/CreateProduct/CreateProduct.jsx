import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postProduct, getProducts } from "../../redux/actions";
import Style from "./CreateProduct.module.css"
import swal from "sweetalert";
/* import { State } from "@splidejs/splide"; */

export default function CreateProduct() {

    const dispatch = useDispatch()

    const [input, setInput] = useState({
        name: "",
        price: "",
        stock: "",
        image: "",
        mainImage: "",
        secondaryImage: "",
        category: "",
        brands: "",
        description: "",
        views: "",
        rating: "",
    })

    const [errors, setErrors] = useState({})
    const [errorTrue, setErrorTrue] = useState(false)

    const handleChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("image", input.mainImage ? input.mainImage : "https://i5.walmartimages.com/asr/5b8f58b8-b1a5-4be8-a093-99f493c8ee4f.90a8495ad135b7e9474eb9cfc30c21fd.png")
        for (let index = 0; index < input.secondaryImage.length; index++) {
            data.append("image", input.secondaryImage[index]);
        }
        data.append("name", input.name)
        data.append("price", input.price)
        data.append("stock", input.stock)
        data.append("category", input.category)
        data.append("brands", input.brands)
        data.append("description", input.description)
        dispatch(postProduct(data))
        setInput({
            name: "",
            price: "",
            stock: "",
            image: "",
            category: "",
            brands: "",
            description: "",
        })
        dispatch(getProducts())
        await swal("Ya está", "El producto fue agregado con éxito", "success")
    }

    const validate = (input) => {
        let errors = {}
        if (!input.name) {
            errors.name = "El producto no tiene nombre"
        }
        if (!input.price) {
            errors.price = "El producto no tiene precio"
        }
        if (!input.stock) {
            errors.stock = "No se puede publicar un producto sin Stock"
        }
        if (!input.category) {
            errors.category = "El producto no pertenece a ninguna categoria"
        }
        if (!input.brands) {
            errors.brands = "El producto debe tener marca"
        }
        if (!input.description) {
            errors.description = "Agrega una descripción para el producto"
        }
        return errors
    }

    return (
        <div>
            <div className={Style.formPositioning}>
                <input className="input-form" type="text" value={input.name} name="name" placeholder="Nombre del producto" onChange={(e) => handleChange(e)}></input>
                {
                    errors.name && errorTrue && (
                        <p className={Style.errors}>*{errors.name}</p>
                    )
                }
                <input className="input-form" type="number" value={input.price} name="price" placeholder="Precio" onChange={(e) => handleChange(e)}></input>
                {
                    errors.price && errorTrue && (
                        <p className={Style.errors}>*{errors.price}</p>
                    )
                }
                <input className="input-form" type="number" value={input.stock} name="stock" placeholder="Stock" onChange={(e) => handleChange(e)}></input>
                {
                    errors.stock && errorTrue && (
                        <p className={Style.errors}>*{errors.stock}</p>
                    )
                }
                <label className={Style.label}>Imagen Principal:</label>
                <input type="text" name="mainImage" onChange={(e) => setInput({ ...input, mainImage: e.target.value })}></input>
                <label className={Style.label}>Imagenes Secundarias:</label>
                <input type="file" multiple name="secondaryImage" onChange={(e) => { setInput({ ...input, secondaryImage: e.target.files }); console.log(e.target.files[0]) }}></input>
                <input className="input-form" type="text" value={input.category} name="category" placeholder="Categoria" onChange={(e) => handleChange(e)}></input>
                {
                    errors.category && errorTrue && (
                        <p className={Style.errors}>*{errors.category}</p>
                    )
                }
                <input className="input-form" type="text" value={input.brands} name="brands" placeholder="Marca" onChange={(e) => handleChange(e)}></input>
                {
                    errors.brands && errorTrue && (
                        <p className={Style.errors}>*{errors.brands}</p>
                    )
                }
                <textarea rows="20" type="text" value={input.description} style={{ resize: "none" }} name="description" aria-multiline="true" placeholder="Añade una descripción" onChange={(e) => handleChange(e)}></textarea>
                {
                    errors.description && errorTrue && (
                        <p className={Style.errors}>*{errors.description}</p>
                    )
                }
                {
                    !input.name || !input.price || !input.stock || !input.mainImage || !input.category || !input.brands || !input.description
                        ?
                        <button className="button" onClick={async () => { await swal("Error", "Debes completar todos los campos", "error"); setErrorTrue(!false) }}>Añadir producto</button>
                        :
                        <button className="button" onClick={(e) => handleSubmit(e)}>Añadir producto</button>
                }
            </div>
        </div>
    )
}
