
const CategoriaSala = ({categoria}) => {

  const checkinSala = async () => {
    console.log("Check-in realizado para la categoría:", categoria.nombre);
  }

  return (
    <form>
          <label htmlFor="nameCat">{categoria.nombre}</label>
          <label htmlFor="hrCat">{categoria.horarios}</label>
          <input type="button" defaultValue="Check-in >" onClick ={checkinSala}/>
    </form>
  )
}

export default CategoriaSala