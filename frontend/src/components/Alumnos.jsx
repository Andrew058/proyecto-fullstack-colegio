import { useEffect, useState } from "react";
import api from "../api";

function Alumnos() {

  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [notas, setNotas] = useState([]);

  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    fechaNacimiento: ""
  });

  const [notaForm, setNotaForm] = useState({
    valor: "",
    materiaId: ""
  });

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  // 🔹 CARGAR
  const cargar = async () => {
    const res = await api.get("/alumnos");
    setAlumnos(res.data);
  };

  const cargarMaterias = async () => {
    const res = await api.get("/materias");
    setMaterias(res.data);
  };

  const cargarNotas = async (id) => {
    const res = await api.get(`/notas/alumno/${id}`);
    setNotas(res.data);
  };

  useEffect(() => {
    cargar();
    cargarMaterias();
  }, []);

  useEffect(() => {
    if (alumnoSeleccionado) {
      cargarNotas(alumnoSeleccionado.id);
    }
  }, [alumnoSeleccionado]);

  // 🔹 GUARDAR ALUMNO
  const guardarAlumno = async () => {

    if (!form.nombre || !form.apellido || !form.email) {
      alert("Completa todos los campos");
      return;
    }

    if (editando) {
      await api.put(`/alumnos/${idEditar}`, form);
      alert("Alumno actualizado");
    } else {
      await api.post("/alumnos", form);
      alert("Alumno creado");
    }

    setForm({
      nombre: "",
      apellido: "",
      email: "",
      fechaNacimiento: ""
    });

    setEditando(false);
    setIdEditar(null);

    cargar();
  };

  // 🔹 EDITAR
  const editarAlumno = (a) => {
    setForm({
      nombre: a.nombre,
      apellido: a.apellido,
      email: a.email,
      fechaNacimiento: a.fechaNacimiento
    });

    setEditando(true);
    setIdEditar(a.id);
  };

  // 🔹 ELIMINAR
  const eliminarAlumno = async (id) => {
    if (confirm("¿Eliminar alumno?")) {
      await api.delete(`/alumnos/${id}`);
      cargar();
    }
  };

  // 🔹 SELECCIONAR
  const seleccionarAlumno = (a) => {
    setAlumnoSeleccionado(a);
  };

  // 🔹 CREAR NOTA
  const crearNota = async () => {

    if (!notaForm.valor || !notaForm.materiaId) {
      alert("Completa los datos de la nota");
      return;
    }

    if (notaForm.valor < 0 || notaForm.valor > 5) {
      alert("La nota debe estar entre 0 y 5");
      return;
    }

    await api.post("/notas", {
      valor: parseFloat(notaForm.valor),
      alumno: { id: alumnoSeleccionado.id },
      materia: { id: notaForm.materiaId }
    });

    alert("Nota creada");

    setNotaForm({
      valor: "",
      materiaId: ""
    });

    cargarNotas(alumnoSeleccionado.id);
  };

  // 🔹 PROMEDIO
  const promedio = notas.length
    ? (notas.reduce((acc, n) => acc + n.valor, 0) / notas.length).toFixed(2)
    : 0;

  return (
    <div>

      <h2>Alumnos</h2>

      <input placeholder="Nombre"
        value={form.nombre}
        onChange={e => setForm({ ...form, nombre: e.target.value })}
      />

      <input placeholder="Apellido"
        value={form.apellido}
        onChange={e => setForm({ ...form, apellido: e.target.value })}
      />

      <input placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input type="date"
        value={form.fechaNacimiento}
        onChange={e => setForm({ ...form, fechaNacimiento: e.target.value })}
      />

      <button onClick={guardarAlumno}>
        {editando ? "Actualizar" : "Crear"}
      </button>

      <ul>
        {alumnos.map(a => (
          <li key={a.id}>
            {a.nombre} {a.apellido}

            <button onClick={() => seleccionarAlumno(a)}>Ver notas</button>
            <button onClick={() => editarAlumno(a)}>Editar</button>
            <button onClick={() => eliminarAlumno(a.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {alumnoSeleccionado && (
        <div>

          <h3>Notas de {alumnoSeleccionado.nombre}</h3>

          <input placeholder="Valor (0-5)"
            value={notaForm.valor}
            onChange={e => setNotaForm({ ...notaForm, valor: e.target.value })}
          />

          <select
            value={notaForm.materiaId}
            onChange={e => setNotaForm({ ...notaForm, materiaId: e.target.value })}
          >
            <option value="">Seleccionar materia</option>
            {materias.map(m => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>

          <button onClick={crearNota}>Crear Nota</button>

          <p><strong>Promedio:</strong> {promedio}</p>

          <table border="1" style={{ marginTop: "10px" }}>
            <thead>
              <tr>
                <th>Materia</th>
                <th>Nota</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {notas.map(n => (
                <tr key={n.id}>
                  <td>{n.materia?.nombre}</td>
                  <td>{n.valor}</td>
                  <td>{n.fechaRegistro}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}

    </div>
  );
}

export default Alumnos;