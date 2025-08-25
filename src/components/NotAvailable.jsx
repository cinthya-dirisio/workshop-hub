import { useNavigate } from 'react-router-dom'
import err404 from '../assets/err404.jpeg'
import { enqueueSnackbar } from 'notistack';
function NotAvailable() {
  const navigate = useNavigate()
  enqueueSnackbar('Redireccionando', {variant: 'info'})
  setTimeout(() => {
    navigate('/')
  }, 2000);

    return (
      <figure className='notavailable bg-tran text-light rounded'>
        <img src={err404} alt="404" />
        <figcaption className='kanit-semibold'>Error 404</figcaption>
      </figure>
    )
  }
  
  export default NotAvailable