import { useState } from "react";
import { useSelector } from "react-redux";
import Input from "./Input";
import commentQueries from "../services/commentQueries";
import { enqueueSnackbar } from "notistack";

function CreateComment({workshopId}) {
    console.log(workshopId)
  const user = useSelector((store) => store.user.user);
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
        workshopId: workshopId,
        userId: user._id,
        rating: e.target[0].value,
        comment: e.target[1].value
    }
    commentQueries.createComment(data).then( response =>{
        if (response){
            enqueueSnackbar('El comentario ha sido creado con exito', {variant:'success'})
        }
    }).catch(error=> enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' }))
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="card comment__card">
        <div className="card-header bg-tran d-flex align-items-center gap-2">
          <img className="comment_photo rounded" src={user.photo} alt="user_photo" />
          <p>
            {user.firstName} {user.lastName}
          </p>
        </div>
        <div className="card-body bg-tran">
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
        </div>
      </form>
    </>
  );
}

export default CreateComment;
