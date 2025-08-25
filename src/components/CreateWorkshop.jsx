import { useSelector } from "react-redux";
import workshopQueries from "../services/workshopQueries";
import { enqueueSnackbar } from "notistack";
import Input from "./Input";

function CreateWorkshop() {
    const user = useSelector(store => store.user.user)
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
      },
      {
        id: "description",
        label: "Descripción",
        type: "text",
        placeholder: "Descripción",
        name: "description",
      },
      {
        id: "startDate",
        label: "Fecha de inicio",
        type: "date",
        placeholder: "Fecha de inicio",
        name: "startDate",
      },
      {
        id: "endDate",
        label: "Fecha de fin",
        type: "date",
        placeholder: "Fecha de fin",
        name: "endDate",
      },
      {
        id: "duration",
        label: "Duración en días",
        type: "number",
        placeholder: "Duración en días",
        name: "duration",
      },
      {
        id: "representativePhoto",
        label: "Foto representativa",
        type: "url",
        placeholder: "Foto representativa",
        name: "representativePhoto",
      },
      {
        id: "schedule",
        label: "Horario",
        type: "text",
        placeholder: "Horario",
        name: "schedule",
      }
    ];

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
        workshopQueries.createWorkshop(data).then( response =>{
          if(response){
            enqueueSnackbar(`Workshop creado con exito`, {variant:'success'})
          }
        }).catch(error=> enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' }))
      };
  return (
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
          <div className="d-flex gap-2">
            <button className="btn btn-outline-danger" type="reset">Borrar</button>
            <button className="btn btn-outline-success">Guardar</button>
          </div>
        </form>
  )
}

export default CreateWorkshop