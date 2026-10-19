

const Persona = ({persona}) => {
  return (
    <div>
        <p>{persona.name.first} {persona.name.last}</p>
        <img src={persona.picture.thumbnail} alt={`${persona.name.first} ${persona.name.last}`} />

    </div>
  )
}

export default Persona