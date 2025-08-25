import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import workshopQueries from "../services/workshopQueries";
import EditWorkshop from "./EditWorkshop";
import LinkNav from "./LinkNav";

function InstructorPanel() {
  const user = useSelector((store) => store.user.user);
  const [instructorWorkshops, setInstructorWorkshops] = useState([]);

  useEffect(() => {
    workshopQueries.getAll().then((workshops) => {
      const ownWorkshops = workshops.filter(
        (workshop) => workshop.instructorId === user._id
      );
      setInstructorWorkshops(ownWorkshops);
      console.log(ownWorkshops)
    });
  }, [user]);


  

  return (
    <section className="container-fluid bg-tran rounded w-100 text-light p-3">
      <h5 className="text-decoration-underline">Panel Instructor</h5>
      {
        instructorWorkshops.length > 0 ? (
          instructorWorkshops.map( (workshop) => (
            <EditWorkshop key={workshop._id} {...workshop} />
          ))
        ) : (
          <p>Aún no creaste ningún workshop. ¡Empieza ahora!</p>
        )
      }
      <div>
        <LinkNav content={"Crear un workshop nuevo"} path={"/private/instructor"} />
      </div>
    </section>
  );
  
}

export default InstructorPanel;
