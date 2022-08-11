import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useJwt } from "react-jwt";
import { editUser, getUserPayments, getUsers } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom"
import Style from "./Profile.module.css"
import swal from 'sweetalert';
import loader from '../../img/loader.gif'

export default function Profile() {
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  const { decodedToken } = useJwt(localStorage.getItem("usuario"));

  let email = decodedToken?.email;
  let id = decodedToken?._id

  const Payments = useSelector((state) => state.userPayments);
  const users = useSelector((state) => state.users)
  const userExtraInfo = users.find(e => e.email === email)

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [edit, setEdit] = useState({
    phoneNumber: "",
    address: "",
    location: "",
    zipCode: "",
  });

  const [showInputs, setShowInputs] = useState("");
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    dispatch(getUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    email && setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users])


  const handleInputState = (e) => {
    e.preventDefault();
    dispatch(setShowInputs(e.target.value));
  };

  const handleChange = (e) => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!edit.phoneNumber) {
      edit.phoneNumber = userExtraInfo.phoneNumber
    }
    if (!edit.address) {
      edit.address = userExtraInfo.address
    }
    if (!edit.location) {
      edit.location = userExtraInfo.location
    }
    if (!edit.zipCode) {
      edit.zipCode = userExtraInfo.zipCode
    }
    await dispatch(editUser(edit, id));
    setShowInputs("")
    await swal("Listo!", "Tu informacion fue modificada correctamente", "success");
    navigate(0)
    dispatch(getUsers())
  }

  useEffect(() => {
    email && email.match(pattern) && dispatch(getUserPayments(email));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decodedToken]);



  return (
    <div className={Style.containerAll}>
      {
        loading === false ?
          (<div className={Style.data}>
            <div className={Style.title}>
              <p className={Style.titlep}>Información de la cuenta</p>
              <img className={Style.imgUser} src={decodedToken?.picture || "https://us.123rf.com/450wm/koblizeek/koblizeek2001/koblizeek200100050/138262629-usuario-miembro-de-perfil-de-icono-de-hombre-vector-de-s%C3%ADmbolo-perconal-sobre-fondo-blanco-aislado-.jpg?ver=6"} alt="Imagen de perfil" />
              <p> Nombre de Usuario <br /> <span className={Style.span}> {decodedToken?.name || decodedToken?.username}</span></p>
              <p>Correo Electrónico<br /> <span className={Style.span}>{decodedToken?.email}</span></p>
              <div className={Style.profileInfo}>
                <div className={Style.primero}>
                  <p>Dirección de Facturación <br /> <span className={Style.span}>{userExtraInfo?.address ? userExtraInfo.address : 'Sin definir'}</span> </p>
                  <button className="button" onClick={(e) => handleInputState(e)} value={"address"}>EDIT</button>
                  {showInputs === "address" &&
                    <input className="input" onChange={(e) => handleChange(e)} name="address" value={edit.address} type="text" placeholder="Modificar"></input>
                  }
                  <p>Codigo postal <br /> <span className={Style.span}>{userExtraInfo?.zipCode ? userExtraInfo.zipCode : 'Sin definir'}</span></p>
                  <button className="button" onClick={(e) => handleInputState(e)} value={"zipCode"}>EDIT</button>
                  {showInputs === "zipCode" &&
                    <input className="input" onChange={(e) => handleChange(e)} name="zipCode" value={edit.zipCode} type="number" placeholder="Modificar"></input>
                  }
                </div>
                <div className={Style.segundo}>
                  <p>Localidad <br /> <span className={Style.span}>{userExtraInfo?.location ? userExtraInfo.location : 'Sin definir'}</span></p>
                  <button className="button" onClick={(e) => handleInputState(e)} value={"location"}>EDIT</button>
                  {showInputs === "location" &&
                    <input className="input" onChange={(e) => handleChange(e)} name="location" value={edit.location} type="text" placeholder="Modificar"></input>
                  }
                  <p>Nro. de Teléfono <br /> <span className={Style.span}>{userExtraInfo?.phoneNumber ? userExtraInfo.phoneNumber : 'Sin definir'}</span></p>
                  <button className="button" onClick={(e) => handleInputState(e)} value={"phoneNumber"}>EDIT</button>
                  {showInputs === "phoneNumber" &&
                    <input className="input" onChange={(e) => handleChange(e)} name="phoneNumber" value={edit.phoneNumber} type="number" placeholder="Modificar"></input>
                  }
                </div>
                {edit.address || edit.location || edit.phoneNumber || edit.zipCode ? <button onClick={(e) => handleSubmit(e)}>Guardar Cambios</button> : null}
              </div>
            </div>
            <div className={Style.comprasHistory}>
              <p className={Style.titlep}>Historial de Compras</p>

              {Payments.length > 0 ?
                <div className={Style.boletas}>
                  {Payments.map((e) => {
                    return (
                      <div key={e._id} className={Style.container}>
                        <div className={Style.top}>
                          <p className={Style.centeredText}>📄 Comprobante: {e._id}</p>
                          <p className={Style.centeredText}>📅 Fecha: {e.date.slice(0, 4) + "/" + e.date.slice(5, 7) + "/" + e.date.slice(8, 10)}</p>
                          <p>🕐 Hora: {e.date.slice(11, 16)}</p>
                        </div>
                        <div className={Style.pedido}>
                          {e.container.map(x => {
                            return (
                              <Link key={x._id} style={{ textDecoration: "none" }} to={`/product/${x._id}`}>
                                <div className={Style.positioning}>
                                  <p className={Style.nameProduct}>♨️{x.name}</p>
                                  <p className={Style.priceProduct}>💲{x.price}</p>
                                  {/* <img alt="img" className={Style.Pimg} src={x.image[0]?.url} /> */}
                                </div>
                              </Link>
                            )
                          })}
                        </div>
                        <p className={Style.centeredText}>Total de la Compra: 💲{e.amount}</p>
                        <hr /><hr />
                      </div>
                    )
                  })}</div> : <h6>No has hecho compras aún</h6>}
            </div>
          </div>) : (<div className={Style.loader}><img className={Style.gif} src={loader} alt="Loading" /></div>)}
    </div>
  );
}
