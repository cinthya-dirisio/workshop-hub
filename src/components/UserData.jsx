import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import LinkNav from './LinkNav'

const errorImg = 'https://static.vecteezy.com/system/resources/previews/005/005/788/original/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg'
function UserData() {
  const user = useSelector( store => store.user.user)
  const [ userPic, setUserPic ] = useState(user?.photo)
  const role = ( role ) =>{
    if (role === 'admin') return 'Administrador'
    if (role === 'instructor') return 'Instructor'
    if (role === 'user') return 'Usuario'

  }
  if (user){
    return (
    <figure className='container d-flex flex-column'>
        <img src={userPic} onError={()=>setUserPic(errorImg)}  className='portrait_offcanvas' alt="user_photo" />
        <figcaption>{user.firstName} {user.lastName}</figcaption>
        <span>{role(user.role)}</span>
        <LinkNav content={'Perfil Personal'} path={`/private/profile/${user._id}`} />
       {user.role === 'instructor' && <LinkNav content={'Panel de Instructor'} path={`/private/instructor`} />}
    </figure>
  )
  }
  return null
}

export default UserData
