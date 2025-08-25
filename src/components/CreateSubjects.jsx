import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import workshopQueries from "../services/workshopQueries";
import subjectQueries from "../services/subjectQueries";
import Input from "./Input";
import { enqueueSnackbar } from "notistack";

function CreateSubjects() {
  const user = useSelector((store) => store.user.user);
  const [instructorWorkshops, setInstructorWorkshops] = useState([]);

  useEffect(() => {
    workshopQueries.getAll().then((workshops) => {
      const ownWorkshops = workshops.filter(
        (workshop) => workshop.instructorId === user._id
      );
      setInstructorWorkshops(ownWorkshops);
      console.log(ownWorkshops);
    });
  }, [user]);
  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    const data = {
      workshop: e.target[0].value,
      name: e.target[1].value,
      description: e.target[2].value,
    };
    console.log(data);
    subjectQueries
      .createSubject(data)
      .then((response) => {
        if (response) {
          enqueueSnackbar(`Materia creada con exito`, { variant: "success" });
        }
      })
      .catch((error) =>
        enqueueSnackbar(`Error: ${error.message}`, { variant: "error" })
      );
  };
  return (
    <form onSubmit={handleSubmit} className="border-info border-1">
      <div className="d-flex p-2 justify-content-between">
        <label htmlFor="workshop" className="form-label ">
          Tus workshops
        </label>
        <select
          name="workshop"
          id="workshop"
          className="form-control-sm rounded col-7"
        >
          {instructorWorkshops.map((workshop) => {
            return (
              <option key={workshop._id} value={workshop._id}>
                {workshop.title}
              </option>
            );
          })}
        </select>
      </div>
      <Input
        type={"text"}
        placeholder={"Nombre de materia"}
        label={"Nombre"}
        id={"name"}
      />
      <Input
        type={"text"}
        placeholder={"Descripción de materia"}
        label={"Descripción"}
        id={"description"}
      />
      <div className="d-flex gap-2">
        <button className="btn btn-outline-info" type="reset">Borrar</button>
        <button className="btn btn-outline-success">Guardar</button>
      </div>
    </form>
  );
}

export default CreateSubjects;
