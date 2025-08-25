import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userQueries from "../../services/userQueries";
import Input from "../../components/Input";
import { enqueueSnackbar } from "notistack";
import userActions from "../../redux/actions/userActions";
import ProfileWorkshops from "../../components/ProfileWorkshops";
import LogoutButton from "../../components/LogoutButton";
import ChangePassword from "../../components/ChangePassword";
const errorImg = 'https://static.vecteezy.com/system/resources/previews/005/005/788/original/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg'
function UserProfile() {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user.user);
  const [isEditing, setIsEditing] = useState(false);
 const [ userPic, setUserPic ] = useState(user?.photo)
  const role = (role) => {
    if (role === "admin") return "Administrador";
    if (role === "instructor") return "Instructor";
    if (role === "user") return "Usuario";
  };

  
  const handleSave = (e) => {
    e.preventDefault()
    const data = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      photo: e.target[2].value
    }
    userQueries.updateUser(user._id, data).then((updatedUser) => {
      dispatch(userActions.update({user:updatedUser}))
      setIsEditing(false);
      enqueueSnackbar('Información editada exitosamente', { variant: 'success' });
    }).catch(error => enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' }));
  };

  return (
    <div className="d-flex flex-column gap-1 w-100">
      {isEditing ? (
        <>
          <form onSubmit={handleSave} className="container-fluid d-flex flex-column bg-tran rounded w-100 text-light p-2 justify-content-around">
            <Input
              id="firstName"
              label="Nombre"
              type="text"
              defaultValue={user.firstName}
              className="form-control-sm col-7 rounded bg-tran text-light"
            />
            <Input
              id="lastName"
              label="Apellido"
              type="text"
              defaultValue={user.lastName}
                className="form-control-sm col-7 rounded bg-tran text-light"
            />
            <Input
              id="photo"
              label="Foto de perfil"
              type="url"
              defaultValue={user.photo}
              className="form-control-sm col-7 rounded bg-tran text-light"
            />
            <div className="d-flex justify-content-center gap-1">
              <button
                className="btn btn-outline-danger"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
              <button className="btn btn-outline-success">
                Guardar
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <article className="container-fluid bg-tran rounded text-light p-2 flex-wrap">
            <div className="d-flex p-2 justify-content-around flex-wrap">
              <figure className="user_profile_figure">
                <img src={userPic} onError={()=>setUserPic(errorImg)} alt="user_photo" />
              </figure>
              <div className="d-flex flex-column text-center">
                <h3>
                  {user.firstName} {user.lastName}
                </h3>
                <p>{user.email}</p>
                <p>{role(user.role)}</p>
                <div className="d-flex flex-column gap-1">

                <button
                  className="btn btn-outline-light"
                  onClick={() => setIsEditing(true)}
                >
                  Editar tu Información
                </button>
                <ChangePassword />
                <LogoutButton />
                  </div>
              </div>
            </div>
          </article>
        </>
      )}

      <ProfileWorkshops />
    </div>
  );
}

export default UserProfile;