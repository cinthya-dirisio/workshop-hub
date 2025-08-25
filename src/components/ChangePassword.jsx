import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "./Input";
import authQueries from "../services/authQueries";
import { enqueueSnackbar } from "notistack";
import userActions from "../redux/actions/userActions";

function ChangePassword() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const [isEditing, setIsEditing] = useState(false);
  

  const handleChangePassword = (e) =>{
    e.preventDefault()
    const data = {
      password : e.target[0].value
    }
    authQueries.changePassword(user._id, data).then( response =>{
      if (response){
        enqueueSnackbar('La contraseña se ha actualizado con exito', {variant:'success'})
      }
    }).catch(error=>enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' }))
  }
  return (
  <>
    {
        !isEditing ? (
            <button onClick={()=>setIsEditing(true)} className="btn btn-outline-light">Cambiar contraseña</button>
        ) : ( 
          <form onSubmit={handleChangePassword} className="form_changepass bg-tran">
            <Input type={'password'} label={'Nueva contraseña'}  />
            <button className="btn btn-outline-info mx-2" onClick={() =>setIsEditing(false)}>Cancelar</button>
            <button className="btn btn-outline-success">Cambiar</button>
          </form> )
    }
  
  
  
  
  </>)
}

export default ChangePassword;
