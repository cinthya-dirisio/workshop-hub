import React, { useEffect, useState } from 'react'
import workshopQueries from '../services/workshopQueries';
import { useSelector } from 'react-redux';
import LinkNav from './LinkNav';

function ProfileWorkshops() {
  const user = useSelector((store) => store.user.user);
  const [userWorkshops, setUserWorkshops] = useState([]);
  useEffect(()=>{
    workshopQueries.getAll().then((workshops) => {
        const workshopsUser = workshops?.filter((workshop) => workshop.participants.includes(user._id));
        if (workshopsUser.length > 0) setUserWorkshops(workshopsUser);
      });
  }, [user])
  return (
    <div className="container-fluid bg-tran rounded w-100 text-light p-3">
        <h5 className="text-decoration-underline">Mis Workshops</h5>
        {userWorkshops.length > 0 ? (
          <div>
            {userWorkshops.map((workshop) => (
              <LinkNav key={workshop._id} content={workshop.title} path={`/workshops/${workshop._id}`} />
            ))}
          </div>
        ) : (
          <p>No estás inscripto en ningún workshop aún</p>
        )}
      </div>
  )
}

export default ProfileWorkshops