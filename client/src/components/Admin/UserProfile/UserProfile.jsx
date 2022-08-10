import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearPage, getUserById } from "../../../redux/actions";
import axios from "axios";
import styles from './UserProfile.module.css'
export default function UserProfile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [msg, setMsg] = useState('')

  useEffect(() => {
    dispatch(getUserById(id));
    return () => dispatch(clearPage())
  }, [id, dispatch]);

  const user = useSelector((state) => state.userDetails);

  const handleClick = async (e, email) => {
    e.preventDefault();
    const { data } = await axios.put(`https://gamehubapi.vercel.app/forcepassword`, { email });
    setMsg(data.msg)

  };


  return (
    <div className={styles.containerAll}>
      {user.username && (
        <div className={styles.container}>
          <div className={styles.textContainerUno}>
            <i className="fa-solid fa-user-astronaut"></i>
            <p className={styles.text}>{user.username}</p>
          </div>
          <div className={styles.dos}>
            <div className={styles.textContainer}>
              <i className="fa-solid fa-key"></i>
              <p className={styles.text}>{user.role}</p>
            </div>
            <div className={styles.textContainer}>
              <i className="fa-solid fa-envelope"></i>
              <p className={styles.text}>{user.email}</p>
            </div>
            <button className="button" onClick={(e) => handleClick(e, user.email)}>
              Reset Password
            </button>
          </div>
          <br />
          {msg ? <div> {msg} </div> : null}


        </div>
      )}
    </div>
  );
}
