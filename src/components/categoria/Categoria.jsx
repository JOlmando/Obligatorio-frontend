import { useState } from "react";
import ReservarActividad from "../visita/ReservarActividad";
import IconoCategoria from "./IconoCategoria";

const Categoria = ({ categoria }) => {
  const [mostrarReserva, setMostrarReserva] = useState(false);
  const horarios = categoria.horarios
    .split(";")
    .map((horario) => horario.trim())
    .filter(Boolean);

  return (
    <article className="actividad-card">
      <IconoCategoria className="actividad-icono" categoria={categoria} />
      <h3>{categoria.nombre}</h3>
      <div className="actividad-horarios">
        <span className="actividad-reloj" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        </span>
        <div>
          <span className="actividad-horarios-titulo">Horarios</span>
          <ul>
            {horarios.map((horario) => (
              <li key={horario}>{horario}</li>
            ))}
          </ul>
        </div>
      </div>
      <button
        className="actividad-reservar"
        type="button"
        onClick={() => setMostrarReserva(true)}
      >
        Reservar <span aria-hidden="true">›</span>
      </button>
      {mostrarReserva && (
        <ReservarActividad
          categoria={categoria}
          onCancelar={() => setMostrarReserva(false)}
        />
      )}
    </article>
  );
};

export default Categoria;