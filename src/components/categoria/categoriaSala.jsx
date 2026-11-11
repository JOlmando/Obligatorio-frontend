import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import { crearVisita } from "../../features/visitas.slices";
import { crearVisitaSchema } from "../../validators/visitas.validators";

const CategoriaSala = ({categoria}) => {
  const dispatch = useDispatch();
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
    <form onSubmit={handleSubmit(checkinSala)}>
          <label htmlFor="nameCat">{categoria.nombre}</label>
          <label htmlFor="hrCat">{categoria.horarios}</label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <i className="fas fa-spinner fa-spin" /> : "Check-in >"}
          </button>
          {errorCheckin && <p role="alert">{errorCheckin}</p>}
    </form>
  )
}

export default CategoriaSala