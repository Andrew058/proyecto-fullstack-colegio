import { useEffect, useState } from "react";
import api from "../api";

function Materias() {

  const [materias, setMaterias] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    codigo: "",
    creditos: ""
  });

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const cargar = async () => {
    const res = await api.get("/materias");
    setMaterias(res.data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardar = async () => {

    if (!form.nombre || !form.codigo || !form.creditos) {
      alert("Completa todos los campos");
      return;
    }

    if (editando) {
      await api.put(`/materias/${idEditar}`, form);
      alert("Materia actualizada");
    } else {
      await api.post("/materias", form);
      alert("Materia creada");
    }

    setForm({
      nombre: "",
      codigo: "",
      creditos: ""
    });

    setEditando(false);
    setIdEditar(null);

    cargar();
  };

  const editar = (m) => {
    setForm({
      nombre: m.nombre,
      codigo: m.codigo,
      creditos: m.creditos
    });

    setEditando(true);
    setIdEditar(m.id);
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar materia?")) return;

    try {
      const res = await api.delete(`/materias/${id}`);
      alert(res.data.message);
      cargar();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div>

      <h2>Materias</h2>

      <input placeholder="Nombre"
        value={form.nombre}
        onChange={e => setForm({ ...form, nombre: e.target.value })}
      />

      <input placeholder="Código"
        value={form.codigo}
        onChange={e => setForm({ ...form, codigo: e.target.value })}
      />

      <input type="number" placeholder="Créditos"
        value={form.creditos}
        onChange={e => setForm({ ...form, creditos: e.target.value })}
      />

      <button onClick={guardar}>
        {editando ? "Actualizar" : "Crear"}
      </button>

      <ul>
        {materias.map(m => (
          <li key={m.id}>
            {m.nombre} ({m.codigo}) - {m.creditos}

            <button onClick={() => editar(m)}>Editar</button>
            <button onClick={() => eliminar(m.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Materias;