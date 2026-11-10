// import { useEffect, useState } from "react";
// import api from "../../api/api";
// import Categoria from "./Categoria";
// import CategoriaSala from "./categoriaSala";
// import { useDispatch, useSelector } from 'react-redux';
// import { guardarCategorias } from '../../features/categorias.slice';

// const ListaCategorias = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   //const [categorias, setCategorias] = useState([]);

//   useEffect(() => {
//     const cargarCategorias = async () => {
//       try {
//         const res = await api.get("/categorias?limit=10&page=1");
//         if (!Array.isArray(res.data?.categorias)) {
//           throw new Error("La respuesta de categorías no tiene el formato esperado.");
//         }
//         // setCategorias(res.data.categorias);
//         // dispatch(guardarCategorias(categorias))
//         dispatch(guardarCategorias(res.data.categorias))

//       } catch (error) {
//         setError(
//           error.response?.data?.message ??
//             error.message ??
//             "No se pudieron cargar las categorías."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
//     cargarCategorias();
    
//   }, []);

//   const categorias = useSelector((state) => state.categorias.categorias);

//   const categoriasCard = categorias.filter((categoria) => categoria.nombre !== "Sala de musculación");

//   const salaMusculacion = categorias.find((categoria) => categoria.nombre === "Sala de musculación");

//   return (
//     <div className="lista-categorias">
//       { 
//         loading ? ( <p>Cargando categorías...</p> ) : 
//         error ? ( <p role="alert">{error}</p> ) : 
//         (categorias.length > 0) ? 
//           <>
//           {salaMusculacion && <CategoriaSala key={salaMusculacion._id} categoria={salaMusculacion} />}
//           {categoriasCard.map((categoria) => (<Categoria key={categoria._id} categoria={categoria} />))}
//           </>
//           : 
//           <p>No hay categorías disponibles.</p>
//       }
//     </div>
//   )
// };

// export default ListaCategorias;

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