import React, { useState } from "react";
import axios from "axios";

function SearchGames({ onAddGame }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const buscarJuegos = async (e) => {
    e.preventDefault();
    const res = await axios.get(`https://api.rawg.io/api/games`, {
      params: {
        key: "da40717bf0d94886a51bbf29b58f9764", 
        search: query,
      },
    });
    setResults(res.data.results);
  };

  return (
    <div className="buscador">
      <h2>🔍 Buscar juegos</h2>
      <form onSubmit={buscarJuegos}>
        <input
          type="text"
          placeholder="Escribe el nombre del juego..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <div className="resultados">
        {results.map((juego) => (
          <div key={juego.id} className="card">
            <img
              src={juego.background_image}
              alt={juego.name}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3>{juego.name}</h3>
            <p>🎮 {juego.genres.map((g) => g.name).join(", ")}</p>
            <p>🕹️ {juego.platforms?.map((p) => p.platform.name).join(", ")}</p>
            <button
              onClick={() =>
                onAddGame({
                  titulo: juego.name,
                  genero: juego.genres[0]?.name || "Desconocido",
                  plataforma: juego.platforms
                    ?.map((p) => p.platform.name)
                    .join(", ") || "Desconocido",
                  horasJugadas: 0,
                  puntuacion: 0,
                })
              }
            >
              ➕ Añadir a mi biblioteca
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchGames;
