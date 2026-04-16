import Alumnos from "./components/Alumnos";
import Materias from "./components/Materias";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Sistema Colegio</h1>

      {/* 🔹 MATERIAS */}
      <Materias />

      <hr />

      {/* 🔹 ALUMNOS */}
      <Alumnos />
    </div>
  );
}

export default App;