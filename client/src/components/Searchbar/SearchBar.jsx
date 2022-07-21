import React from "react";
import styles from "./SearchBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {useDispatch}  from "react-redux"
import { searchName } from "../../redux/actions";

function SearchBar() {

  let navigate = useNavigate();
  const dispatch = useDispatch()

  // Vamos a manejar los productos a buscar por estados

  const [searchProduct, setSearchProduct] = useState("");

  function handleSubmit(e){
    // searchName(searchProduct)
    e.preventDefault();
    navigate('/products')
    dispatch(searchName(searchProduct));
  }

  return (
    <div className={styles.containerAll}>
      <Link to="/">
        <img src="https://compragamer.net/assets/img/logo-fix.png" alt="img" />
      </Link>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <input
          onChange={(e) => setSearchProduct(e.target.value)}
          value={searchProduct}
          className={styles.input}
          placeholder="Search product"
        />
        <button className="button">Search</button>
      </form>
      <div className={styles.login}>
        <button className="button">Sign In</button>
        <i class="fa-solid fa-cart-shopping"></i>
      </div>
    </div>
  );
}

export default SearchBar;
