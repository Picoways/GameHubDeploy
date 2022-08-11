import React from "react";
import { useDispatch } from "react-redux";
import Style from "./ProductCardAdmin.module.css";
import { deleteProduct } from "../../../redux/actions";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function ProductCardAdmin({ id, name, price, image }) {
  const dispatch = useDispatch();

  return (
    <div className={Style.carouselOrder}>
      <div className={Style.container}>
        <div className={Style.cardContainer}>
          <div>
            <img className={Style.image} src={image} alt="img" />
            <br /> <br />
            <div className={Style.text}>
              <div className={Style.name}>
                {name.length >= 45 ? (
                  <div>{name.slice(0, 45)}...</div>
                ) : (
                  <p>{name}</p>
                )}
              </div>
            </div >
            <p className={Style.price}>${price}</p>
          </div>
        </div>
        <br />
        <div className={Style.buttonsContainer}>
          <Link to={"/detailsAdmin/" + id}>
              <button className="buttonEdit">✏ Editar Producto</button>
          </Link>
          <br />
          <button
            className="buttonDelete"
            href="/products"
            onClick={() => {
              dispatch(deleteProduct(id));
              swal("Eliminado", "El producto ha sido eliminado con éxito", "success")
            }}
          >
            {" "}
            ❌ Eliminar Producto
          </button>
          <br />
        </div>
      </div>
    </div>

  );
}
