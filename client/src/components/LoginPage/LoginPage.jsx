import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./LoginPage.module.css";
import { loginRefresher, postUsersGoogle } from "../../redux/actions";
import jwt_decode from "jwt-decode"
import swal from "sweetalert"

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [count, setCount] = useState(false)

  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const [infoGoogle, setInfoGoogle] = useState({
    username: "",
    email: "",
    email_verified: ""
  })

  const [errorLogin, setErrorLogin] = useState("");

  useEffect(() => {
    setErrorLogin("");
  }, [dispatch]);

  const viewAlert = () => {
    swal({
      title: "Iniciar sesion con mi cuenta de Google",
      text: "Al iniciar sesion das permiso a GameHub de acceder a tus datos como nombre, correo e imagen de perfil",
      icon: "warning",
      buttons: ["No", "Si"]
    }).then((respuesta) => {
      if(respuesta){
        dispatch(postUsersGoogle(infoGoogle));
        navigate("/")
      }
    })
  }

  function HandleCallbackResponse(response){
    var userObject = jwt_decode(response.credential);
    setInfoGoogle({
      username: userObject.name,
      email: userObject.email,
      email_verified: userObject.email_verified
    })
    localStorage.setItem("usuario", response.credential)
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "256336172305-cdslorqnnmmohtst3pus9l3rshdfh6d7.apps.googleusercontent.com",
      callback: HandleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"},
      setCount(!count)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(postUsersGoogle(infoGoogle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[count] )

  const validate = (info) => {
    let errors = {};

    if (!info.email) {
      errors.email = "Ingresar un email";
    }
    if (!info.password) {
      errors.password = "Ingresar la contraseña";
    }
    return errors;
  };

  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    setInfo(
      e.target.name === "email" ? {
      ...info,
      [e.target.name]: e.target.value,
    }: {...info,
    [e.target.name]: e.target.value});
    setErrors(
      validate({
        ...info,
        [e.target.name]: e.target.value,
      })
    );
  };


  const LoginUser = async (payload) => {
    try {
      const user = await axios.post(`https://gamehubapi.vercel.app/accounts`, payload);
      if (user.status === 201) {
        await axios.post("https://gamehubapi.vercel.app/login", payload).then((r) => {
          {localStorage.setItem("usuario", r.data.tokenSession)}
          if(r.data.data.accountState === "banned") {
             return swal("Error", "Tu cuenta se encuentra en estado de suspensión", "error")
          }
          r.data.data.role === "admin" || r.data.data.role === "owner" ? navigate("/Dashboard") : navigate("/");
        });
        dispatch(loginRefresher())
      }
    } catch (e) {
      if (e.response.data === "Email no encontrado") {
        setErrorLogin("Email inválido");
      }
      if (e.response.data === "Contraseña inválida") {
        setErrorLogin("Contraseña inválida");
      }
    }
  };

  return (
    <div className={style.container}>
      <i className={`${style.icon} fa-solid fa-user-large`}></i>
      <h1 style={{textAlign: "center", textTransform: "uppercase", fontWeight: "bold"}}>Inicio de sesión</h1>
      <p>Ingresa con tu cuenta</p>

      <div className={style.inputs}>
      <p>Ingresa tu email :</p>
        <input
          className="input-login"
          type="text"
          placeholder="Correo"
          name="email"
          onChange={handleChange}
        ></input>
        {!errorLogin && !errors.email ? (
          <p className={style.errors1}>soy un error</p>
        ) : info.email.length > 0 && !errorLogin && !errors.email ? (
          <p className={style.errors1}>soy un error</p>
        ) : errorLogin === "Email inválido" ? (
          <p className={style.errors}>{errorLogin}</p>
        ) : errorLogin === "Contraseña inválida" ? (
          <p className={style.errors1}>soy un error</p>
        ) : (
          errors.email && <p className={style.errors}>{errors.email}</p>
        )}
      <p>Ingresa tu contraseña :</p>
        <input
          className={`input-login ${style.input}`}
          type="password"
          placeholder="Contraseña"
          name="password"
          onChange={handleChange}
        ></input>
        {!errorLogin && !errors.password ? (
          <p className={style.errors1}>soy un error</p>
        ) : info.password.length > 0 && !errorLogin && !errors.password ? (
          <p className={style.errors1}>soy un error</p>
        ) : errorLogin === "Contraseña inválida" ? (
          <p className={style.errors}>{errorLogin}</p>
        ) : errorLogin === "Email inválido" ? (
          <p className={style.errors1}>soy un error</p>
        ) : (
          errors.password && <p className={style.errors}>{errors.password}</p>
        )}
        <br />
        {!errors.email &&
        info.email.length > 0 &&
        info.password.length > 0 &&
        !errors.password ? (
          <button className="button" onClick={() => LoginUser(info)}>
            Iniciar Sesion
          </button>
        ) : (
          <button
            className="button"
            onClick={() => alert("Completar los campos")}
          >
            Iniciar Sesion
          </button>
        )}
        <br />
      </div>
      <br/>
      { !infoGoogle.username && !infoGoogle.email && !infoGoogle.email_verified && <div id="signInDiv"></div>}
      <br/>
      {
        infoGoogle.username && infoGoogle.email && infoGoogle.email_verified && <button className="button" onClick={() => viewAlert()}>Ingresar a GameHub</button>
      }
      <br/>
    </div>
  );
}

export default LoginPage;
