import CurrentDateHour from "./CurrentDateHour";
import LinkNav from "./LinkNav";
import UserData from "./UserData";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";

function NavbarOffCanvas() {
  const user = useSelector((store) => store.user)
  const token = useSelector((store) => store.user.token);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand">
          <h1 className="kanit-semibold text-center">workshop hub</h1>
        </div>
        <button
          className="btn btn-outline-secondary justify-self-end"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>

        <div
          className="offcanvas offcanvas-end d-flex"
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header bg-dark text-light">
            <h5 className="kanit-semibold" id="offcanvasRightLabel">
              workshop hub
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body bg-dark text-light d-flex flex-column justify-content-between">
            {
              user && <UserData />
            }
            

            <div className="container d-flex flex-column flex-grow-1">
              <LinkNav content={"Home"} path={"/"} />
              <LinkNav content={"Workshops"} path={"/workshops"} />
              {!token ? (
                <>
                  <LinkNav content={"Registro"} path={"/auth/register"} />
                  <LinkNav content={"Entrar"} path={"/auth/login"} />
                </>
              ) : (
                <LogoutButton />
              )}
            </div>
            <CurrentDateHour />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarOffCanvas;
