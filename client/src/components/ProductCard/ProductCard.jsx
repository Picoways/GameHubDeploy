import React, { useEffect } from 'react';
import {
  addToCart,
  addToWishList,
  modifyCart,
  getUserById,
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Style from './ProductCard.module.css';
import swal from 'sweetalert';
/* import AddCartButton from "../AddCartButton/AddCartButton"; */
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useJwt } from 'react-jwt';
/* import WishListButton from "../CardButtons/WishListButton"; */

export default function ProductCard({ id, name, price, image, stock }) {
  const { decodedToken } = useJwt(localStorage.getItem('usuario'));

  let autho = decodedToken?.role;
  let idUser = decodedToken?._id;

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  useEffect(() => {
    idUser && dispatch(getUserById(idUser));
  }, [idUser]);

  useEffect(() => {
    idUser && dispatch(getUserById(idUser));
  }, [dispatch]);

  const karting = useSelector((state) => state.cart);

  const f = localStorage.getItem('Carrito')
    ? JSON.parse(localStorage.getItem('Carrito'))
    : [];

  const refresh = (f) => {
    const w = f.filter((e) => e?.stock > 0);
    localStorage.setItem('Carrito', JSON.stringify(w));
    dispatch(modifyCart(w));
  };

  useEffect(() => {
    refresh(f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cartStorage = async (id) => {
    if (autho === 'admin' || autho === 'owner') {
      return alert('borrenme algun dia');
    }
    let json = await axios.get('https://gamehubapi.vercel.app/product/' + id);
    const a = localStorage.getItem('Carrito')
      ? JSON.parse(localStorage.getItem('Carrito'))
      : [];
    a.push(json.data);
    localStorage.setItem('Carrito', JSON.stringify(a));
  };

  return (
    <div className={Style.carouselOrder}>
      <div className={Style.container}>
        <div className={Style.cardContainer}>
          <Link to={'/product/' + id}>
            <br />
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
            </div>
            <p className={Style.price}>${price}</p>
          </Link>
        </div>
        <br />
        <div className={Style.buttonsContainer}>
          {stock > 0 ? (
            <button
              onClick={() => {
                autho === 'admin' || autho === 'owner'
                  ? swal(
                      'Error',
                      'Un administrador no puede realizar esta acción',
                      'error'
                    )
                  : !karting.map((a) => a._id).includes(id)
                  ? dispatch(addToCart(id)) && cartStorage(id)
                  : swal(
                      'Oops',
                      'Este producto ya se encuentra en tu carrito',
                      'warning'
                    );
              }}
              className="button"
            >
              Añadir al carrito
            </button>
          ) : (
            <button
              className="noStockButton"
              onClick={() => {
                swal(
                  'Sin Stock!',
                  'Este producto no tiene stock disponible',
                  'error'
                );
              }}
            >
              Sin Stock
            </button>
          )}
          <br />
          {localStorage.getItem('usuario') ? (
            <button
              onClick={() => {
                autho === 'admin' || autho === 'owner'
                  ? swal(
                      'Error',
                      'Un administrador no puede realizar esta acción',
                      'error'
                    )
                  : !userDetails.wishList?.map((a) => a._id).includes(id)
                  ? dispatch(addToWishList(id, idUser)) &&
                    swal(
                      'Listo!',
                      'El producto fue agregado a la lista de deseados',
                      'success'
                    )
                  : swal(
                      'Oops',
                      'Este producto ya se encuentra en tu lista',
                      'warning'
                    );
              }}
              className="buttonWishlist"
            >
              Añadir a lista de deseados
            </button>
          ) : (
            <button
              onClick={() =>
                swal('Atencion!', 'Debes logearte para hacer eso!', 'warning')
              }
              className="buttonWishlist"
            >
              Añadir a lista de deseados
            </button>
          )}
          <br />
        </div>
      </div>
    </div>
  );
}
