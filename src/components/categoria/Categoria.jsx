
const Categoria = ({categoria}) => {

  const reservarCategoria = () => {
        console.log("Reserva realizada para la categoría:", categoria.nombre);
  }

  return (
    <form>
          <label htmlFor="nameCat">{categoria.nombre}</label>
          <label htmlFor="hrCat">{categoria.horarios}</label>
          <input type="button" defaultValue="Reservar >" onClick ={reservarCategoria}/>
    </form>
  )
}

export default Categoria