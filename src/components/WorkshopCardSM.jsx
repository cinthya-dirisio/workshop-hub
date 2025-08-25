import LinkNav from "./LinkNav"

function WorkshopCard({ _id, title, description, representativePhoto, isPast }) {
  return (
    <div key={_id} className='bg-tran workshop_card p-2 text-light rounded d-flex flex-column justify-content-between' >
        <img src={representativePhoto} className="card-img-top" alt="representative photo of workshop" />
        <span className={ isPast? 'badge text-info' : 'badge text-success'}>
            {
                isPast ? 'Terminado' : 'Futuro'
            }
        </span>
        <h5>{title}</h5>
        <p>{description}</p>
        <LinkNav path={`/workshops/${_id}`} content={'(+) Detalles'} />
    </div>
  )
}

export default WorkshopCard