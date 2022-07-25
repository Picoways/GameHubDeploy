import { sortPrice } from '../../redux/actions'
import React, { useState} from 'react'
import { useNavigate, Link, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, searchName } from "../../redux/actions/"

export default function DropdownPrecio() {
    const [dropdown, setDropdown] = useState(false)
    const dispatch = useDispatch()

    const openDropdown = () => {
        setDropdown(!dropdown)
    }
  return (
    <div>
        <Dropdown isOpen={dropdown} toggle={openDropdown} size="lr" >
            <DropdownToggle caret>
                Precio
            </DropdownToggle>
            <DropdownMenu >      
                   <DropdownItem value="Ascending" onClick={(e) => dispatch(sortPrice(e.target.value))}>
                    Menor precio
                    </DropdownItem>
                     <DropdownItem value="Descending" onClick={(e) => dispatch(sortPrice(e.target.value))}>
                        Mayor precio
                     </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
)
}