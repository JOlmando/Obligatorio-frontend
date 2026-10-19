import Capital from "./Capital"
const Pais = (props) => {
  return (
    <div>
      <h2>{props.nombre}</h2>
      <Capital capital={props.capital} />
    </div>
  )
}

export default Pais