import React, { useEffect, useState } from "react";
import workshopQueries from "../../services/workshopQueries";
import WorkshopCard from "../../components/WorkshopCardSM";
import Input from "../../components/Input";
import Loading from "../../components/Loading";

function Workshops() {
  const [ workshops, setWorkshops ] = useState([]);
  const [ searchText, setSearchText ] = useState("");
  const [ isFuture, setIsFuture ] = useState(false);
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    workshopQueries.getAll().then((data) =>{
      setWorkshops(data)
      setLoading(false)
  })
  }, []);

  if (loading){
    return <Loading />
  }

  const handleSeach = (e) => {
    setSearchText(e.target.value);
  };

  const handleIsFuture = (e) => {
    setIsFuture(e.target.checked);
  };

  const filteredWorkshops = workshops.filter((ws) => {
    const matchedBySearch = ws.title
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());
    const matchedByIsFuture = isFuture ? !ws.isPast : true;
    return matchedBySearch && matchedByIsFuture;
  });

  return (
    <>
      <div className="d-flex flex-column bg-tran container-fluid rounded text-light mt-1 p-2">
        <Input
          id={"search"}
          type={"text"}
          placeholder={"Buscar workshops"}
          value={searchText}
          onChange={handleSeach}
          label={"Busca por título"}
        />
        <div className="form-check form-switch ">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="future"
            onChange={handleIsFuture}
          />
          <label className="form-check-label" htmlFor="future">
            Mostrar sólo los workshops futuros
          </label>
        </div>
      </div>
      <section className="d-flex flex-wrap justify-content-center gap-2 p-2">
        {filteredWorkshops.length > 0 ? (
          filteredWorkshops.map((workshop) => (
            <WorkshopCard key={workshop._id} {...workshop} />
          ))
        ) : (
          <p> No hay workshops para mostrar </p>
        )}
      </section>
    </>
  );
}

export default Workshops;
