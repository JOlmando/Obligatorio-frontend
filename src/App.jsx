
import './App.css'
import Bienvenida from './components/Bienvenida'
import Saludar from './components/Saludar'
import Pais from './components/Pais'
import Campo from './components/Campo'
import Botones from './components/Botones'
import ListaPersonas from './components/ListaPersonas'
const App = () => {

  let persona = "Juan";
  let paises = [{nombre: "Argentina", id: 1, capital: "Buenos Aires"}, {nombre: "Brasil", id: 2, capital: "Brasilia"}, {nombre: "Chile", id: 3, capital: "Santiago"}, {nombre: "Uruguay", id: 4, capital: "Montevideo"}, {nombre: "Paraguay", id: 5, capital: "Asunción"}];

  return (
    <div>
      <h1>Hola!</h1>
      <ListaPersonas />
      <Bienvenida />
      <Saludar nombre={persona} />
      {paises.map((pais) => (
        <Pais key={pais.id} nombre={pais.nombre} capital={pais.capital} />
      ))}
      <Campo />
      <Botones />

    </div>
    
  )
}

export default App
