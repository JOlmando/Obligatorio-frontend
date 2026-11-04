
const Categoria = ({categoria}) => {

  const reservarCategoria = () => {
        console.log("A");
  }

  return (
    <form>
          <label htmlFor="nameCat">{categoria.nombre}</label>
          <input type="text" id="nameCat"  required/>

          <label htmlFor="hrCat">{categoria.horarios}</label>
          <input type="text" id="hrCat" required/>

          <input type="button" defaultValue="Reservar >" onClick ={reservarCategoria}/>
    </form>
  )
}

export default Categoria