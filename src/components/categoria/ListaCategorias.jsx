import { useEffect, useState } from "react";
import api from "../api/api";
import Categoria from "./Categoria";

const ListaCategorias = () => {
  const [categorias, setCategorias] = useState([]);

    useEffect(() => {
      api.get("?results=10")
          .then((res) => {
              setCategorias(res.data.results);
              console.log(res.data.results);
          })
            
    }, []);
  return (
    <div>
        <h1>Categorias</h1>
        
            {categorias.map((categoria) => (
                <Categoria key={categoria._id} categoria={categoria} />
            ))}
        
    </div>
  )
}

export default ListaCategorias