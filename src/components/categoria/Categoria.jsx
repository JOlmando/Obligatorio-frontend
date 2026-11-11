import { useState } from "react";
import ReservarActividad from "../visita/ReservarActividad";

const Categoria = ({ categoria }) => {
  const [mostrarReserva, setMostrarReserva] = useState(false);

  return (
    <>
      <div>
        <label>{categoria.nombre}</label>
        <label>{categoria.horarios}</label>
        <button type="button" onClick={() => setMostrarReserva(true)}>
          Reservar &gt;
        </button>
      </div>
      {mostrarReserva && <ReservarActividad categoria={categoria} onCancelar={() => setMostrarReserva(false)} />}
    </>
  );
};

export default Categoria;