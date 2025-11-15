import React from "react";
import "./GameCard.css";

function GameCard({ juego }) {
  return (
    <div className="card">
      <h3>{juego.titulo}</h3>
      <p>🎮 {juego.genero}</p>
      <p>🕹️ {juego.plataforma}</p>
      <p>⏱️ {juego.horasJugadas} horas</p>
      <p>⭐ {juego.puntuacion}/5</p>
    </div>
  );
}

export default GameCard;
