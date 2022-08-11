import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearPage, editProduct } from "../../../redux/actions";
import Style from "./DetailsAdmin.module.css"
import loader from "../../../img/loader.gif"
import swal from 'sweetalert';
/* import { useJwt } from "react-jwt" */

export default function DetailsAdmin(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* const { decodedToken } = useJwt(localStorage.getItem("usuario")) */
  /* let autho = decodedToken?.role */
  const { id } = useParams();
  const product = useSelector((state) => state.details);

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    product.name && setLoading(false)
  }, [product])

  const [edit, setEdit] = useState({
    price: "",
    stock: "",
    description: "",
  });

  const [showInputs, setShowInputs] = useState("");

  useEffect(() => {
    dispatch(getProductDetails(id));
    return () => {
      dispatch(clearPage());
    };
  }, [dispatch, id]);

  /* useEffect(() => {
    setEdit({
      price: product.price,
      stock: product.stock,
      description: product.description
    })
  }, [product]) */

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!edit.price) {
      edit.price = product.price;
    }
    if (!edit.stock) {
      edit.stock = product.stock;
    }
    if (!edit.description) {
      edit.description = product.description;
    }
    dispatch(editProduct(edit, id));
    swal("Listo!","El producto fue modificado correctamente","success");
    navigate("/Dashboard");
  };

  return (
    <div>
      <Link to='/Dashboard'>
     <button>Volver</button>
     </Link>
      {
        loading === false ? <div>
          {product && (
            <div>
              <br />
              <div className={Style.container}>
                <img src={product.image && product.image[0].url} alt="img" />
                <div className={Style.namePositioning}>
                  <h1 className={Style.descriptionTitle}>{product.name}</h1>
                  <br />
                  <h1>Precio: ${product.price}{" "}</h1>
                  <button className="btnDash" onClick={(e) => handleInputState(e)}
                    value={"price"}>EDIT</button>
                  <br />
                  {
                    showInputs === "price" &&
                    <input className="inputPrice" placeholder="Modificar precio" name="price" value={edit.price} type="number"
                      onChange={(e) => handleChange(e)} ></input>
                  }
                  <h1>Stock: {product.stock}{" "}</h1>
                  <button className="btnDash" onClick={(e) => handleInputState(e)}
                    value={"stock"}>EDIT</button>
                  <br />
                  {
                    showInputs === "stock" &&
                    <input className="inputPrice" placeholder="Modificar stock" name="stock" value={edit.stock} type="number"
                      onChange={(e) => handleChange(e)} ></input>
                  }
                  <div className={Style.inputsAdminPositioning}>
                    <button className="btnDash" onClick={(e) => handleSubmit(e)}>Guardar Cambios</button>
                  </div>
                </div>
              </div>
              <div className={Style.lowerPositioning}>
                <div className={Style.descriptionPositioning}>
                  <h1 className={Style.descriptionTitle} >Descripción </h1><button className={`btnDash ${Style.btnDesc}`} onClick={(e) => handleInputState(e)}
                    value={"description"}>EDIT</button>
                  <div className={Style.descriptionBody} >{product.description}</div>
                </div>
                <div className={Style.textarea}>
                  {
                    showInputs === "description" &&
                    <textarea rows="20" type="text" name="description" value={edit.description} style={{ resize: "none", width: "45vw" }} aria-multiline="true"
                      placeholder="Modifique la descripción" onChange={(e) => handleChange(e)}></textarea>
                  }
                </div>
              </div>
              <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
            </div>
          )}
        </div>
          : loading === true ? <div className={Style.loader} ><img className={Style.gif} src={loader} alt="loading"></img></div> :
          <div>Acceso denegado</div>
      }
    </div>
  );
}
