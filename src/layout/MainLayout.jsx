import { Outlet, useLocation } from "react-router-dom";
import NavbarOffCanvas from "../components/NavbarOffCanvas";

function MainLayout() {
  const location = useLocation();
  return (
    <>
      <header>
        <NavbarOffCanvas />
      </header>
      {location.pathname === "/" ? (
        <main className="container-fluid d-flex flex-column align-items-center purpleBlocks p-2">
          <Outlet />
        </main>
      ) : (
        <main className="container-fluid d-flex flex-column align-items-center  p-2">
          <Outlet />
        </main>
      )}
      <footer className="bg-dark container-fluid text-light text-center p-1">
        <div className="container">
          <p className="kanit-regular">
            Hecho con ❤ y React para el CodeUp MERN 2024
          </p>
          <p className="kanit-regular">Cinthya Di Risio</p>
        </div>
      </footer>
    </>
  );
}

export default MainLayout;
