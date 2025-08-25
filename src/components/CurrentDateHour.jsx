import React, { useState, useEffect } from "react";

function CurrentDateHour() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);
    return (
      <div className="container">
        <p className="text-black kanit-regular">Fecha y Hora Actuales</p>
        <p className="text-black kanit-regular">{currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}</p>
      </div>
    );
}
export default CurrentDateHour