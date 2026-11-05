import { useEffect, useState } from "react";
import api from "../../api/api";
import Categoria from "./Categoria";
import { useDispatch } from 'react-redux';
import { guardarCategorias } from '../../features/categorias.slice';

const ListaCategorias = () => {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [categorias, setCategorias] = useState([]);

    useEffect(() => {
      api.get('/categorias?limit=10&page=1')
          .then((res) => {
              setCategorias(res.data.results);
              console.log("Categorias: " +res.data.results);
          })
    }, []);

    console.log("Categorias: " + categorias);

    dispatch(guardarCategorias(categorias));

  return (
    <div className="lista-categorias">
        {loading ? <p>Cargando categorías...</p> : (categorias.length > 0 ? categorias.map((c) => (<Categoria key={c._id} {...c} />)) : <p>No hay categorías disponibles.</p>)} 
    </div>
  )
  }

  export default ListaCategorias