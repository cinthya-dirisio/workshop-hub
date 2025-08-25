import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import workshopQueries from "../../services/workshopQueries";
import EditWorkshop from "../../components/EditWorkshop";
import CreateWorkshop from "../../components/CreateWorkshop";
import CreateSubjects from "../../components/CreateSubjects";
import EditSubjects from "../../components/EditSubjects";

function Instructor() {
  const user = useSelector((store) => store.user.user);
  const [instructorWorkshops, setInstructorWorkshops] = useState([]);

  useEffect(() => {
    workshopQueries.getAll().then((workshops) => {
      const ownWorkshops = workshops.filter(
        (workshop) => workshop.instructorId === user._id
      );
      setInstructorWorkshops(ownWorkshops);
    });
  }, [user]);

  return (
    <section className="container-fluid bg-tran rounded w-100 text-light p-3">
      <h5 className="kanit-semibold text-center">Panel Instructor</h5>
      {
        <div className="accordion" id="accordionExample">
          <div className="accordion-item bg-tran">
            <h2 className="accordion-header">
              <button
                className="kanit-semibold accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Edita y borra tus workshops
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                {instructorWorkshops.length > 0 ? (
                  instructorWorkshops.map((workshop) => (
                    <EditWorkshop key={workshop._id} {...workshop} />
                  ))
                ) : (
                  <p>Aún no creaste ningún workshop. ¡Empieza ahora!</p>
                )}
              </div>
            </div>
          </div>
          <div className="accordion-item bg-tran">
            <h2 className="accordion-header">
              <button
                className="kanit-semibold accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Crear un workshop nuevo
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <CreateWorkshop />
              </div>
            </div>
          </div>
          <div className="accordion-item bg-tran">
            <h2 className="accordion-header">
              <button
                className="kanit-semibold accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Agrega Materias a tus workshops
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <CreateSubjects />
              </div>
            </div>
          </div>
          <div className="accordion-item bg-tran">
            <h2 className="accordion-header">
              <button
                className="kanit-semibold accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Edita y borra las materias de tus workshops
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <EditSubjects />
              </div>
            </div>
          </div>
        </div>
      }
    </section>
  );
}

export default Instructor;
