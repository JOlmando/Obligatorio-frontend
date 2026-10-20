
import './App.css'
import AuthLayout from './components/auth/AuthLayout'
const App = () => {

  let persona = "Juan";
  let paises = [{nombre: "Argentina", id: 1, capital: "Buenos Aires"}, {nombre: "Brasil", id: 2, capital: "Brasilia"}, {nombre: "Chile", id: 3, capital: "Santiago"}, {nombre: "Uruguay", id: 4, capital: "Montevideo"}, {nombre: "Paraguay", id: 5, capital: "Asunción"}];

  return (
    <>
      <AuthLayout />
    </>
  )
}

export default App
