const CategoriaSala = ({categoria}) => {
//{categoria.nombre} {categoria.horarios}
  return (
    <form onSubmit={handleSubmit(procesarDatos)}>
            <label htmlFor="nameCat">{categoria.nombre}</label>
            <input type="text" id="nameCat" {...register("nameCat")} required/>

            <label htmlFor="hrCat">{categoria.horarios}</label>
            <input type="text" id="hrCat" {...register("hrCat")} required/>

          <input type="submit" value="Check-in"/>
      </form>
  )
}

export default CategoriaSala