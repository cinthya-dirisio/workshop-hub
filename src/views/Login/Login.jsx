import React, { useState } from "react";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import authQueries from "../../services/authQueries";
import { useDispatch } from "react-redux";
import userActions from "../../redux/actions/userActions";
import { useSnackbar } from "notistack";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const formFields = [
    {
      id: "email",
      label: "Correo Electrónico",
      type: "email",
      placeholder: "Ingresa tu correo electrónico",
    },
    {
      id: "password",
      label: "Contraseña",
      type: "password",
      placeholder: "Ingresa tu contraseña",
    },
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: e.target[0].value,
      password: e.target[1].value
    };
    
    authQueries.login(data)
      .then(response => {
        if (response) {
          dispatch(userActions.login(response))
          console.log(response)
          enqueueSnackbar(`Bienvenidx ${response.data.firstName}`, { variant: 'success' });
          setTimeout(() => {
            navigate('/workshops');
          }, 2000);
        }
      })
      .catch(error => {
        enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' });
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="col-sm-12 col-md-8 col-lg-6 bg-dark p-3 text-light rounded"
      >
        {formFields.map((field) => (
          <Input
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            options={field.options}
          />
        ))}

        <div className="d-flex p-2 justify-content-between">
          <input
            className="btn btn-outline-danger"
            type="reset"
            value="Borrar"
          />
          <input
            className="btn btn-outline-success"
            type="submit"
            value="Enviar"
          />
        </div>
      </form>
    </>
  );
}

export default Login;
