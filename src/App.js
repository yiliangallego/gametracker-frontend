import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import GameForm from "./components/GameForm";
import ReviewList from "./components/ReviewList";
import SearchGames from "./components/SearchGames";
import Stats from "./components/Stats";

function App() {
  const [juegos, setJuegos] = useState([]);

  // Cargar los juegos desde la base de datos
  const cargarJuegos = () => {
    axios
      .get("http://localhost:5000/api/games")
      .then((res) => setJuegos(res.data))
      .catch((err) => console.error("Error al cargar los juegos:", err));
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  // Agregar un nuevo juego (desde formulario o buscador)
  const handleGameAdded = (nuevoJuego) => {
    axios
      .post("http://localhost:5000/api/games", nuevoJuego)
      .then((res) => setJuegos([...juegos, res.data]))
      .catch((err) => console.error("Error al agregar el juego:", err));
  };

  // Eliminar un juego
  const eliminarJuego = (id) => {
    axios
      .delete(`http://localhost:5000/api/games/${id}`)
      .then(() => setJuegos(juegos.filter((j) => j._id !== id)))
      .catch((err) => console.error("Error al eliminar el juego:", err));
  };

  return (
    <div className="contenedor">
      <h1>🎮 GameTracker</h1>
      <p>Tu biblioteca personal de videojuegos</p>

      {/* 🔍 Buscador de juegos reales desde la API RAWG */}
      <SearchGames onAddGame={handleGameAdded} />

      {/* 🧾 Formulario manual (opcional) */}
      <GameForm onGameAdded={handleGameAdded} />

      {/* 📊 Estadísticas personales */}
      <Stats juegos={juegos} />

      {/* 📚 Lista de juegos guardados */}
      <div className="lista-juegos">
        {juegos.length > 0 ? (
          juegos.map((juego) => (
            <div key={juego._id} className="card">
              <h3>{juego.titulo}</h3>
              <p>🎮 {juego.genero}</p>
              <p>🕹️ {juego.plataforma}</p>
              <p>⏱️ {juego.horasJugadas} horas</p>
              <p>⭐ {juego.puntuacion}/5</p>

              {/* 📝 Reseñas */}
              <ReviewList juegoId={juego._id} />

              {/* 🗑️ Botón eliminar */}
              <button onClick={() => eliminarJuego(juego._id)}>Eliminar</button>
            </div>
          ))
        ) : (
          <p>No hay juegos guardados todavía.</p>
        )}
      </div>
    </div>
  );
}

export default App;
