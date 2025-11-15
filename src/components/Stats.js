import React from "react";

function Stats({ juegos }) {
  const total = juegos.length;
  const horasTotales = juegos.reduce((sum, j) => sum + (j.horasJugadas || 0), 0);
  const promedio = juegos.length ? (horasTotales / total).toFixed(1) : 0;

  return (
    <div className="stats">
      <h2>📊 Estadísticas Personales</h2>
      <p>🎮 Juegos registrados: {total}</p>
      <p>⏱️ Horas jugadas totales: {horasTotales}</p>
      <p>⚡ Promedio de horas por juego: {promedio}</p>
    </div>
  );
}

export default Stats;
