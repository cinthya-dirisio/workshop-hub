import { useDispatch } from "react-redux";
import userActions from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";


function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    enqueueSnackbar('Vuelve pronto!', {variant: 'info'})
    navigate('/')
    dispatch(userActions.logout())
    localStorage.removeItem('token')
  };

  return (
    <button onClick={handleLogout} className="btn btn-outline-secondary">
      Salir
    </button>
  );
}

export default LogoutButton;