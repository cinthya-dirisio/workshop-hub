import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import workshopQueries from "../services/workshopQueries";
import subjectQueries from "../services/subjectQueries";
import { enqueueSnackbar } from "notistack";
import Input from "./Input";
import Swal from "sweetalert2";

function EditSubjects() {
  const user = useSelector((store) => store.user.user);
  const [instructorWorkshops, setInstructorWorkshops] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [workshopId, setWorkshopId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [subject, setSubject] = useState({});
 const fetchInfo = () =>{
  workshopQueries.getAll().then((workshops) => {
      const ownWorkshops = workshops.filter(
        (workshop) => workshop.instructorId === user._id
      );
      setInstructorWorkshops(ownWorkshops);
      console.log(ownWorkshops);})
 }
  useEffect(() => {
    fetchInfo()}, [user]);

  const handleChange = (e) => {
    const workshopId = e.target.value;
    setIsEditing(false);
    if (workshopId) {
      subjectQueries.getSubjects().then((subjects) => {
        const workshopSubjects = subjects.filter(
          (subject) => subject.workshop === workshopId
        );
        setSubjects(workshopSubjects);
        fetchInfo()
      });
    }
  };
  const handleEdit = (subjectId, workshopId) => {
    setWorkshopId(workshopId);
    setSubjectId(subjectId);
    subjectQueries
      .getOneSubject(subjectId)
      .then(setSubject)
      .catch((error) => console.log(error));
    console.log(subject);
    setIsEditing(!isEditing);
    fetchInfo()
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: e.target[0].value,
      description: e.target[1].value,
      workshop: workshopId,
    };

    subjectQueries
      .updateSubject(subjectId, data)
      .then((response) => {
        if (response) {
          setIsEditing(false);
          fetchInfo()
          enqueueSnackbar(`La materia ha sido actualizada con exito`, {
            variant: "success",
          });
        }
      })
      .catch((error) =>
        enqueueSnackbar(`Error: ${error.message}`, { variant: "error" })
      );
  };
  const handleDelete = (subjectId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, bórralo!",
      background: "#2f2f2f",
      toast: true,
      position: "center",
    }).then((result) => {
      if (result.isConfirmed) {
        subjectQueries
          .deleteSubject(subjectId)
          .then((response) => {
            if (response) {
              setIsEditing(false);
              fetchInfo()
              enqueueSnackbar(`${title} ha sido borrado con éxito`, {
                variant: "success",
              });
            }
          })
          .catch((error) =>
            enqueueSnackbar(`Error: ${error.message}`, { variant: "error" })
          );
      }
    });
  };
  return (
    <>
      <div className="d-flex p-2 justify-content-between border-info border-1">
        <label htmlFor="workshop" className="form-label ">
          Tus workshops
        </label>
        <select
          name="workshop"
          id="workshop"
          className="form-control-sm rounded col-7"
          onChange={handleChange}
        >
          <option defaultValue={null}>Elige uno de tus workshops</option>
          {instructorWorkshops.map((workshop) => {
            return (
              <option key={workshop._id} value={workshop._id}>
                {workshop.title}
              </option>
            );
          })}
        </select>
      </div>
      {!isEditing ? (
        <div className="d-flex flex-column">
          {subjects.map((subject) => {
            return (
              <div className="card bg-tran my-1" key={subject._id}>
                <ul className="list-group list-group-flush ">
                  <li className="list-group-item bg-tran text-light">
                    {subject.name}
                  </li>
                  <li className="list-group-item bg-tran text-light">
                    {subject.description}
                  </li>
                </ul>
                <div className="d-flex gap-2 p-1">
                  <button
                    onClick={() => handleEdit(subject._id, subject.workshop)}
                    className="btn btn-outline-info"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(subject._id)}
                    className="btn btn-outline-danger"
                  >
                    Borrar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            id={"name"}
            label={"Nombre de Materia"}
            type={"text"}
            name={"name"}
            defaultValue={subject.name}
          />
          <Input
            id={"description"}
            label={"Descripción de Materia"}
            type={"text"}
            name={"descriptiom"}
            defaultValue={subject.description}
          />
          <div className="d-flex justify-content-around">
            <button className="btn btn-outline-danger" type="reset">
              Reset
            </button>
            <button className="btn btn-outline-success">Guardar</button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-outline-secondary"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default EditSubjects;
