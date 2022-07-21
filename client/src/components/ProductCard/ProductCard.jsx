import React from "react";
import { addToCart } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Style from "./ProductCard.module.css";

export default function ProductCard({ id, name, price, image }) {
  const dispatch = useDispatch();

  return (
    <div className={Style.carouselOrder}>
      <div className={Style.cardContainer}>
        <img className={Style.image} src={image} alt="img" />
        <div className={Style.text}>
          <p className={Style.name}>{name}</p>
          <p className={Style.price}>${price}</p>
        </div>
      </div>
    </div>
  );
}
