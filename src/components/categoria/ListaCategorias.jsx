import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cargarCategorias } from "../../features/categorias.slice";

import Categoria from "./Categoria";
import CategoriaSala from "./CategoriaSala";

const ListaCategorias = () => {

    const dispatch = useDispatch();

    const { categorias, status, error } = useSelector(
        state => state.categorias
    );

    useEffect(() => {
        dispatch(cargarCategorias());
    }, [dispatch]);

    const categoriasCard = categorias.filter(
        categoria => categoria.nombre !== "Sala de musculación"
    );

    const salaMusculacion = categorias.find(
        categoria => categoria.nombre === "Sala de musculación"
    );

    if (status.cargar === "loading") {
        return <p className="checkin-estado">Cargando categorías...</p>;
    }

    if (status.cargar === "failed") {
        return <p className="checkin-estado" role="alert">{error.cargar}</p>;
    }

    if (categorias.length === 0) {
        return <p className="checkin-estado">No hay categorías disponibles.</p>;
    }

    return (
        <div className="checkin-content">
            {salaMusculacion && (
                <CategoriaSala
                    categoria={salaMusculacion}
                />
            )}

            {categoriasCard.length > 0 && (
                <section className="otras-actividades">
                    <header className="otras-actividades-header">
                        <h2>Otras categorías</h2>
                        <p>Seleccioná la actividad que querés realizar y reservá tu horario.</p>
                    </header>
                    <div className="actividades-grid">
                        {categoriasCard.map(categoria => (
                            <Categoria
                                key={categoria._id}
                                categoria={categoria}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ListaCategorias;