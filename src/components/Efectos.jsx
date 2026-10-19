import {  useEffect } from "react"

const Efectos = () => {
    //se ejecuta cada vez que el componente se renderiza
    useEffect(() => {
        console.log("Componente montado");
    })

    //se ejecuta cada vez que el componente se renderiza y cuando cambian las dependencias
    useEffect(() => {}, [/* dependencias */])

    //se ejecuta solo una vez cuando el componente se monta
    useEffect(() => {}, [])


  return (
    <div>Efectos</div>
  )
}

export default Efectos