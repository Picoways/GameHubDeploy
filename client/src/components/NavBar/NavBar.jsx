import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import Style from "./NavBar.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { useDispatch, useSelector } from 'react-redux';
import { filterPerCategory } from "../../redux/actions/"

function NavBar() {

  const products = useSelector((state) => state.products)
  const [dropdown, setDropdown] = useState(false)
  const dispatch = useDispatch()

  const openDropdown = () => {
    setDropdown(!dropdown)
  }

  const handleDropdown = (e) => {
    dispatch(filterPerCategory(e.target.value))
    console.log(e.target.value)
  }


  return (
    <div className={Style.container}>
      <Dropdown isOpen={dropdown} toggle={openDropdown} size="lr" >
        <DropdownToggle caret>
          Categorias
        </DropdownToggle>
        <DropdownMenu >
          {
            products?.map((e) => <DropdownItem onClick={(e) => handleDropdown(e)}
            > {e.category}
            </DropdownItem>)
          }
        </DropdownMenu>
      </Dropdown>
      <Link to='/create' style={{ textDecoration: 'none' }} className={Style.text}>
        <h1>Arma tu PC</h1>
      </Link>
      <Link to='/help' style={{ textDecoration: 'none' }} className={Style.text}>
        <h1>Ayuda</h1>
      </Link>
    </div>
  )
}

export default NavBar