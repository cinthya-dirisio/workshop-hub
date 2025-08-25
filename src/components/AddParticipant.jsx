import { useEffect, useState } from "react";
import workshopQueries from "../services/workshopQueries";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

function AddParticipant() {
  const param = useParams();
  const user = useSelector((store) => store.user.user);
  console.log(user);
  const [workshop, setWorkshop] = useState({});
  const workshopId = param.id;

  useEffect(() => {
    workshopQueries.getOneById(workshopId).then((workshop) => {
      setWorkshop(workshop);
    });
  },[workshopId, user._id]);
  const handleInscription = () =>{
    workshopQueries.addParticipant(user._id, workshopId).then( response =>{
      if ( response ){
        enqueueSnackbar(`Te inscribiste a ${workshop.title} con exito!`, {variant: 'success'})
        setWorkshop(prevWorkshop => ({
          ...prevWorkshop,
          participants: [...prevWorkshop.participants, user._id]
        }));
      }
    }).catch(error => enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' }))
  }
  return (
    <>
      {user._id === workshop.instructorId ? (
        <p>Este workshop te pertenece, no puedes inscribirte</p>
      ) : (
        workshop.participants && !workshop.participants.includes(user._id) ? (
          <button onClick={handleInscription} className="btn btn-outline-info bg-tran">
            Inscribete al workshop!
          </button>
        ) : (
          <p>Ya estás inscripto en {workshop.title}</p>
        )
      )}
    </>
  );
}

export default AddParticipant;
