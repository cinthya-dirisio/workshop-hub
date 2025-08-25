import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="bg-tran text-light p-2 d-flex flex-column align-items-center rounded text-center">
      <h2>Bienvenidx a <span className="kanit-semibold">workshop hub</span>!</h2>
      <p>¿Eres <span className="kanit-semibold">Instructor</span>?</p> 
      <p>Comparte tu conocimiento y experiencia con una comunidad ávida de aprender</p>
      <p>¿Eres <span className="kanit-semibold">Estudiante</span>?</p> 
      <p>Aprende nuevas habilidades tecnológicas y conéctate con expertos en la industria.</p>
      <h5>¿Qué estás esperando?</h5>
      <Link to="/workshops" className="btn btn-outline-success">¡Vamos!</Link>
    </section>
  );
}

export default Home;
