import React, { useState } from "react";
import axios from "axios";

function GameForm({ onAdd }) {
  const [form, setForm] = useState({
    titulo: "",
    genero: "",
    plataforma: "",
    horasJugadas: "",
    puntuacion: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/games", form);
    onAdd(res.data);
    setForm({
      titulo: "",
      genero: "",
      plataforma: "",
      horasJugadas: "",
      puntuacion: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <h3>Agregar nuevo juego</h3>
      <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
      <input name="genero" placeholder="Género" value={form.genero} onChange={handleChange} required />
      <input name="plataforma" placeholder="Plataforma" value={form.plataforma} onChange={handleChange} required />
      <input name="horasJugadas" type="number" placeholder="Horas jugadas" value={form.horasJugadas} onChange={handleChange} required />
      <input name="puntuacion" type="number" placeholder="Puntuación (1-5)" min="1" max="5" value={form.puntuacion} onChange={handleChange} required />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default GameForm;
