import './App.css'
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router";


const App = () => {

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
