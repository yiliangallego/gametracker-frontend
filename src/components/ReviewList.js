import React, { useState, useEffect } from "react";
import axios from "axios";

function ReviewList({ juegoId }) {
  const [reviews, setReviews] = useState([]);
  const [autor, setAutor] = useState("");
  const [comentario, setComentario] = useState("");
  const [puntuacion, setPuntuacion] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/reviews/${juegoId}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error al cargar reseñas:", err));
  }, [juegoId]);

  const agregarReview = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/reviews", {
        juegoId,
        autor,
        comentario,
        puntuacion: Number(puntuacion),
      });
      setReviews([...reviews, res.data]);
      setAutor("");
      setComentario("");
      setPuntuacion("");
    } catch (err) {
      console.error("Error al agregar reseña:", err);
    }
  };

  return (
    <div className="reseñas">
      <h4>📝 Reseñas</h4>
      {reviews.length > 0 ? (
        reviews.map((r, i) => (
          <p key={i}>
            <strong>{r.autor}:</strong> {r.comentario} ({r.puntuacion}/5)
          </p>
        ))
      ) : (
        <p>No hay reseñas todavía.</p>
      )}

      <form onSubmit={agregarReview}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Comentario"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Puntuación"
          min="1"
          max="5"
          value={puntuacion}
          onChange={(e) => setPuntuacion(e.target.value)}
          required
        />
        <button type="submit">Agregar reseña</button>
      </form>
    </div>
  );
}

export default ReviewList;
