import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { crearVisitaSchema } from '../../validators/visitas.validators'
//import { toast } from 'react-toastify'
//import { useDispatch } from 'react-redux';
import api from "../api/api";

const CategoriaSala = ({categoria}) => {

  const checkinSala = async () => {
    try{
      const res = await api.post('/visitas', data)
      
      //navigate('/checkin')
    }catch(error){
      setErrorLogin(error.response?.data?.message || 'Ocurrió un error al iniciar sesión');
    } 
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