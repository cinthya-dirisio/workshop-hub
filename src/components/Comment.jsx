import React, { useEffect, useState } from "react";
import userQueries from "../services/userQueries";
import { useSelector } from "react-redux";

function Comment({ _id, date, comment, userId, rating }) {
  const user = useSelector(store=>store.user.user)
  const [userComment, setUserComment] = useState({});
  const [localDate, setLocalDate] = useState("")
  const [ isEditing, setIsEditing ] = useState(false)

  const generarEstrellas = (numero) => {
    let estrellas = "";
    for (let i = 0; i < numero; i++) {
      estrellas += "⭐";
    }
    return estrellas;
  };

  useEffect(() => {
    userQueries.getUserById(userId).then((response) => {
      const user = response.data;
      setUserComment(user);
    });
  const convertirUTCaLocal = (fechaUTC) => {
    const fecha = new Date(fechaUTC);
    return fecha.toLocaleString();
  };
  setLocalDate(convertirUTCaLocal(date));
  }, [userId, date]);

  return (
    <div className="card comment__card" key={_id}>
      <div className="card-header bg-tran d-flex align-items-center gap-2">
        <img className="comment_photo" src={userComment.photo} alt="user_photo" />
        <p>{userComment.firstName} {userComment.lastName}</p>
      </div>
      <div className="card-body bg-tran">
        {
          !isEditing ? (
            <>
        <blockquote className="blockquote mb-0">
          <span>{localDate}</span>
          <p>{comment}</p>
          <footer className="blockquote-footer">{generarEstrellas(rating)}</footer>
        </blockquote>
        {
          user._id === userId && (
            <div>
              <button className="btn btn-outline-info m-1">Editar</button>
              <button className="btn btn-outline-success m-1">Borrar</button>
            </div>

          )
        }
            </>
          ) : (
            <>
            <Input
            id={"rating"}
            label={"Puntuación"}
            type={"number"}
            name={"rating"}
            min={1}
            max={5}
            />
          <Input
            id={"comment"}
            label={"Comentario"}
            type={"text"}
            name={"comment"}
            />
        <button type="reset" className="btn btn-outline-info mx-1">Borrar</button>

        <button className="btn btn-outline-success mx-1">Enviar</button>
            </>)
        }
      </div>
    </div>
  );
}

export default Comment;
