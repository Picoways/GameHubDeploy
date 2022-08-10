import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getUserById } from '../../redux/actions/index'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Style from "./AddCartButton.module.css"
import axios from "axios"
import swal from 'sweetalert';
import {useJwt} from "react-jwt"

function AddCartButton({ id, stock, setRefresh, refresh }) {

  const { decodedToken } = useJwt(localStorage.getItem("usuario"))

  let autho = decodedToken?.role

  let idUser = decodedToken?._id

  const dispatch = useDispatch();

  const karting = useSelector((state) => state.cart)

  const cartStorage = async (id) => {
    if(autho === "admin" || autho === "owner"){
      return
    }
    if (!karting.map((a) => a._id).includes(id)) {
        let json = await axios.get("https://gamehubapi.vercel.app/product/" + id);
    const a = localStorage.getItem("Carrito") ? JSON.parse(localStorage.getItem("Carrito")) : []
    a.push(json.data)
    localStorage.setItem("Carrito", JSON.stringify(a))
    }  
  }

  async function addCart(e) {
    e.preventDefault()
    if(autho === "admin" || autho === "owner"){
      swal("Error", "No se puede hacer eso con ese tipo de cuenta", "error")
    }
    if (!karting.map((a) => a._id).includes(id)) {
      dispatch(addToCart(id));
    } else {
      await swal("Oops", "Este producto ya se encuentra en tu carrito!", "warning")
    }
    idUser && await dispatch(getUserById(idUser))
    setRefresh(!refresh)
  }

  return (
    <div>
      {
       stock > 0 ? <button className={Style.cartButton} onClick={(e) => {
        (autho === "admin" || autho === "owner") ? swal("error", "error", "error") :
         addCart(e); cartStorage(id) }}>
        <div className={Style.karting}><AddShoppingCartIcon style={{ fontSize: "40px" }} /></div>
        <div>Añadir al carrito</div>
      </button> : <button className={Style.cartNoStockButton} onClick={() => swal("Sin Stock!","Este producto no tiene stock disponible","error")}>
        <div className={Style.karting}><AddShoppingCartIcon style={{ fontSize: "40px" }} /></div>
        <div>Sin Stock</div>
      </button>
      }
    </div>
  )
}

export default AddCartButton;
