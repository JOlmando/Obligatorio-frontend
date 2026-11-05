import { Provider } from 'react-redux';
import { store } from "./store/store";
import './App.css';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router";

function App(){

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  )
}

export default App
