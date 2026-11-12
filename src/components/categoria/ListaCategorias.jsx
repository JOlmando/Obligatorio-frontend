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
        return <p>Cargando categorías...</p>;
    }

    if (status.cargar === "failed") {
        return <p role="alert">{error.cargar}</p>;
    }

    if (categorias.length === 0) {
        return <p>No hay categorías disponibles.</p>;
    }

    return (
        <div className="lista-categorias">

            {salaMusculacion && (
                <CategoriaSala
                    categoria={salaMusculacion}
                />
            )}

            {categoriasCard.map(categoria => (
                <Categoria
                    key={categoria._id}
                    categoria={categoria}
                />
            ))}

        </div>
    );
};

export default ListaCategorias;