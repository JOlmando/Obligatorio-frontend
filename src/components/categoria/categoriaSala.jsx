import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router'
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import { crearVisita } from "../../features/visitas.slices";
import { crearVisitaSchema } from "../../validators/visitas.validators";

const CategoriaSala = ({categoria}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const [errorCheckin, setErrorCheckin] = useState("");
    const {
        handleSubmit,
        formState: { isSubmitting }
    } = useForm({
        resolver: joiResolver(crearVisitaSchema),
        mode: "onChange",
        defaultValues: { categoriaId: categoria._id }
    });

  const checkinSala = async () => {
    setErrorCheckin("");
        try {
            const visita = { categoriaId: categoria._id, fecha: new Date().toISOString().split("T")[0], hora: "07:00-23:00"};
            console.log("Intentando realizar check-in para la categoría:", visita);
            await dispatch(crearVisita(visita)).unwrap();
            toast.success("Check-in realizado correctamente");
            navigate('/visitas');
        } catch (error) {
            setErrorCheckin(
                typeof error === "string"
                    ? error
                    : error?.message ?? error?.data?.message ?? "No se pudo realizar el check-in"
            );
            toast.error(
                typeof error === "string"
                    ? error
                    : error?.message ?? error?.data?.message ?? "No se pudo realizar el check-in"
            );
        }
  }

  return (
    <form className="checkin-sala-card" onSubmit={handleSubmit(checkinSala)}>
      <div className="checkin-sala-hero">
        <h1 className="checkin-visually-hidden">{categoria.nombre}</h1>
      </div>
      <div className="checkin-sala-detalles">
        <section className="checkin-sala-bloque">
          <span className="checkin-sala-icono" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </span>
          <div className="checkin-sala-texto">
            <h2>Horarios disponibles</h2>
            <p>Todos los días</p>
            <span className="checkin-sala-horario">{categoria.horarios}</span>
          </div>
        </section>
        <section className="checkin-sala-bloque checkin-sala-accion">
          <span className="checkin-sala-icono" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <circle cx="12" cy="12" r="9" />
              <path d="m8 12 2.5 2.5L16 9" />
            </svg>
          </span>
          <div className="checkin-sala-texto">
            <h2>¿Cómo funciona?</h2>
            <p>Realizá tu check-in al ingresar y comenzá tu entrenamiento.</p>
            <button
              className="checkin-sala-boton"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Procesando..." : "Hacer check-in"}
            </button>
            {errorCheckin && <p className="checkin-sala-error" role="alert">{errorCheckin}</p>}
          </div>
        </section>
      </div>
    </form>
  )
}

export default CategoriaSala