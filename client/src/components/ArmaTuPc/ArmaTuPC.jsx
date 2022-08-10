import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, clearPage, getProducts, modifyCart } from '../../redux/actions'
import ProductCardPC from '../ProductCardPC/ProductCardPC'
import Style from "./ArmaTuPC.module.css"
import { useJwt } from "react-jwt"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Landing404 from '../Landing404/Landing404'

export default function ArmaTuPC() {

  const { decodedToken } = useJwt(localStorage.getItem('usuario'));

  let autho = decodedToken?.role;


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

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productSwitcher = useSelector((state) => state.products)
  const builder = useSelector((state) => state.builder)
  const karting = useSelector((state) => state.cart)

  const [showing, setShowing] = useState("")

  useEffect(() => {
    dispatch(getProducts())
    setShowing("Procesadores")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cartStorage = async (id) => {
    if (autho === 'admin' || autho === 'owner') {
      // return alert('borrenme algun dia');
    }
    let json = await axios.get('https://gamehubapi.vercel.app/product/' + id);
    const a = localStorage.getItem('Carrito')
      ? JSON.parse(localStorage.getItem('Carrito'))
      : [];
    a.push(json.data);
    localStorage.setItem('Carrito', JSON.stringify(a));
  };

  const finishPurchase = () => {
    let addeds = karting.length > 0 ? builder.filter(e => !karting.map(x => x._id).includes(e._id) && e) : builder;
    addeds.map(x => dispatch(addToCart(x._id)) && cartStorage(x._id));
    dispatch(clearPage())
    navigate("/paymentMethod")
  }




  return (
    <div>
      <div>
        {(autho === "user" || autho === "admin" || autho === "owner") ? <div>{showing !== "Finished" ? <div>
          <div className={Style.logoContainer}>
            <p className={Style.logo}>Game<span className={Style.span}>Hub</span></p>
            <p className={Style.componente}>{showing}</p>
          </div>
          <div className={Style.containerGrid}>
            {
              productSwitcher && productSwitcher.map(e => e.category === showing &&
                <div>
                  <ProductCardPC setShowing={setShowing} showing={showing}
                    name={e.name}
                    image={e.image[0]?.url}
                    price={e.price}
                    id={e._id}
                    key={e._id}
                    stock={e.stock} />
                </div>)
            }
          </div>
        </div>
          :
          <div className={Style.containerProducts}>
            <div className={Style.cabecera}>
              <p>Productos</p>
              {/* <p>Resumen</p> */}
            </div>
            <div className={Style.cuerpo}>
              <div className={Style.productList}>
                {
                  builder.map(e => {
                    return (
                      <div key={e._id} className={Style.productContainer}>
                        {/* <div className={Style.order}> */}
                        <img alt="img" src={e.image[0].url} />
                        <p className={Style.textProductName}> {e.name}</p>
                        <p className={Style.textProductPrice}>💲 {e.price}</p>
                        {/* </div> */}
                      </div>
                    )
                  })
                }
              </div>
              <div className={Style.btnContainer}>
                <button className='button' onClick={() => { finishPurchase() }}>
                  Realizar pedido
                </button>
              </div>
            </div>
          </div>
        }
        </div>
          :
          <Landing404 message={"Debes estar logeado"}/>
        }
      </div>
    </div>
  )
}