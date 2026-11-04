import { useEffect, useState } from "react";
import api from "../../api/api";
import Categoria from "./Categoria";

const ListaCategorias = () => {

  const [loading, setLoading] = useState(true);

  const [categorias, setCategorias] = useState([]);


    useEffect(() => {
      api.get("?results=10")
          .then((res) => {
              setCategorias(res.data.results);
              console.log(res.data.results);
          })
            
    }, []);
  return (
    <div className="lista-categorias">
        {loading ? <p>Cargando categorías...</p> : (categorias.length > 0 ? categorias.map((c) => (<Categoria key={c._id} {...c} />)) : <p>No hay categorías disponibles.</p>)} 
    </div>
  )
  }

  export default ListaCategorias