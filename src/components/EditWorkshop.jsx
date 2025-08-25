import { useState } from "react";
import Input from "./Input";
import { useSelector } from "react-redux";
import workshopQueries from "../services/workshopQueries";
import { enqueueSnackbar } from "notistack";
import Swal from "sweetalert2";
import LinkNav from "./LinkNav";

function EditWorkshop({
  _id,
  title,
  description,
  startDate,
  endDate,
  duration,
  representativePhoto,
  schedule,
  instructorId,
}) {
  const user = useSelector(store => store.user.user)
  const [isEditing, setIsEditing] = useState(false);
  const formattedDate = (date) =>{
    return new Date(date).toISOString().split('T')[0];
  } 

  const formFields = [
    {
      id: "title",
      label: "Título",
      type: "text",
      placeholder: "Título",
      name: "title",
      defaultValue: title,
    },
    {
      id: "description",
      label: "Descripción",
      type: "text",
      placeholder: "Descripción",
      name: "description",
      defaultValue: description,
    },
    {
      id: "startDate",
      label: "Fecha de inicio",
      type: "date",
      placeholder: "Fecha de inicio",
      name: "startDate",
      defaultValue: formattedDate(startDate),
    },
    {
      id: "endDate",
      label: "Fecha de fin",
      type: "date",
      placeholder: "Fecha de fin",
      name: "endDate",
      defaultValue:  formattedDate(endDate),
    },
    {
      id: "duration",
      label: "Duración en días",
      type: "number",
      placeholder: "Duración en días",
      name: "duration",
      defaultValue: duration,
    },
    {
      id: "representativePhoto",
      label: "Foto representativa",
      type: "url",
      placeholder: "Foto representativa",
      name: "representativePhoto",
      defaultValue: representativePhoto,
    },
    {
      id: "schedule",
      label: "Horario",
      type: "text",
      placeholder: "Horario",
      name: "schedule",
      defaultValue: schedule,
    },
  ];

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleDelete = (_id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
      background: '#2f2f2f',
      toast: true,
      position: 'center'
    }).then((result) => {
      if (result.isConfirmed) {
        workshopQueries.deleteWorkshop(_id).then(response => {
          if (response) {
            setIsEditing(false);
            enqueueSnackbar(`${title} ha sido borrado con éxito`, { variant: 'success' });
          }
        }).catch(error => 
          enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' })
        );
      }
    });
  };
  
  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefault();
    const data = {
      title: e.target[0].value,
      description: e.target[1].value,
      startDate: e.target[2].value,
      endDate: e.target[3].value,
      duration: e.target[4].value,
      representativePhoto: e.target[5].value,
      schedule: e.target[6].value,
      instructorId: user._id
    }
    console.log(data)
    workshopQueries.updateWorkshop(_id, data).then( response =>{
      if(response){
        setIsEditing(false)
        enqueueSnackbar(`${title} ha sido actualizado con exito`, {variant:'success'})
      }
    }).catch(error=> enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' }))
  };
  return (
    <>
      {!isEditing ? (
        <article key={_id} className='border-1 border-bottom py-2'>
          <h5>{title}</h5>

          <div className="d-flex gap-2 p-2">
          <button onClick={handleEdit} className="btn btn-outline-secondary">
            Editar
          </button>
          <button onClick={handleDelete} className="btn btn-outline-danger">
            Borrar
          </button>
          </div>
          <LinkNav content={'Ir al workshop'} path={`/workshops/${_id}`}/>
        </article>
      ) : (
        <form onSubmit={handleSubmit} className='border-info border-1'>
          {formFields.map((field) => (
            <Input
              key={field.id}
              id={field.id}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              defaultValue={field.defaultValue}
            />
          ))}
          <div className="d-flex justify-content-around">
            <button className="btn btn-outline-danger" type="reset">Reset</button>
            <button className="btn btn-outline-success">Guardar</button>
            <button onClick={handleEdit} className="btn btn-outline-secondary">Cancelar</button>
          </div>
        </form>
      )}
    </>
  );
}

export default EditWorkshop;
