import { useState } from "react";
//rafce
const Botones = () => {

    const [contador, setContador] = useState(0);
   
    const aumentar = () => {
        setContador(contador + 1);
        
        console.log(contador);
    }

  return (
    <div>
        <h1>Botones</h1>

        <input type="button" value="aumentar" onClick={aumentar} />
        <p>Contador: {contador}</p>

    </div>
  )
}

export default Botones