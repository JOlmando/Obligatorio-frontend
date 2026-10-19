import { useId, useState } from "react";

const Campo = () => {
  const id = useId();
  const id2 = useId();
  const [texto, setTexto] = useState("");
    const actualizar = (e) => {
        console.log(e.target.value);
        setTexto(e.target.value);
    }

  return (
    <div>
        <label htmlFor={id}>Campo de texto:</label>
        <input type="text" id={id} onChange={actualizar} />
        <label htmlFor={id2}>Campo de texto:</label>
        <input type="text" id={id2} onChange={actualizar} />
        <p>Texto: {texto}</p>
        
        
    </div>
  )
}

export default Campo