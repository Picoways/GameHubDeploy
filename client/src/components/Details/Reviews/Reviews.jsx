import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import s from "./Reviews.module.css";
import axios from "axios"
import { useJwt } from "react-jwt"

function Reviews({ id }) {
  const [hover, setHover] = useState(null);

  const { decodedToken } = useJwt(localStorage.getItem("usuario"));

  let usernameTokened = decodedToken?.username;


  const [input, setInput] = useState({
    id: id,
    comment: "",
    commentRating: 1,
    username: "",
  });

  useEffect(() => {
    setInput({
      ...input,
      username: usernameTokened
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decodedToken])

  async function handleSubmit(e) {
    e.preventDefault();
    setInput({
      comment: "",
      commentRating: 1,
    });
    await axios.put("https://gamehubapi.vercel.app/comments", input)
  }

  function onClickStar(e) {
    setInput({
      ...input,
      [e.target.name]: Number(e.target.value),
    });
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className={s.containerAll}>
      <h1>Reseña</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={s.stars}>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
              <label>
                <input
                  className={s.inputradio}
                  type="radio"
                  name="commentRating"
                  value={ratingValue}
                  onClick={(e) => onClickStar(e)}
                />
                <FaStar
                  className={s.star}
                  color={
                    ratingValue <= (hover || input.commentRating)
                      ? "#ffc107"
                      : /* "#e4e5e9" */ ""
                  }
                  size={30}
                  onMouseEnter={(e) => setHover(ratingValue)}
                  onMouseLeave={(e) => setHover(null)}
                />
              </label>
            );
          })}
        </div>
        <div className={s.formContainer}>
          <label className="label">Reseña:</label>
          <input
            className="input"
            style={{borderBottom: "2px solid #ffc107"}}
            name="comment"
            type="text"
            placeholder="Ingrese su reseña..."
            onChange={(e) => handleChange(e)}
          />
          <button 
            style={{textTransform: "capitalize"}} className="btnDash" type="submit">Enviar reseña</button>
        </div>
      </form>
    </div>
  );
}

export default Reviews;
