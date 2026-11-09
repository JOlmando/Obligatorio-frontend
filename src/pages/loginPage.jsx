import { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { loginSchema } from '../validators/auth.validators'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import api from "../api/api";
import { guardarToken } from '../features/login.slice';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const usernameId = useId();
    const passwordId = useId();
    const { handleSubmit, register, formState: { errors, isSubmitting, isValid, isDirty } } = useForm({resolver: joiResolver(loginSchema), mode: 'onChange'});
    const [errorLogin, setErrorLogin] = useState('');

    const iniciarSesion = async (data) => {
        try{
          const res = await api.post('/auth/login', data)
          dispatch(guardarToken(res.data.token));
          toast.success("Inicio de sesión exitoso!");
          toast("Bienvenida/o!");
          navigate('/checkin')
        }catch(error){
          setErrorLogin(error.response?.data?.message || 'Ocurrió un error al iniciar sesión');
        } 
    }
  return (
    <>
    <section className="auth-form">
      <h2>Iniciar sesión</h2>
      <p>Ingresá a tu cuenta para continuar</p>
      <form onSubmit={handleSubmit(iniciarSesion)}>
          <div className="form-group">
                <label htmlFor={usernameId}>Usuario:</label>
                <input type="text" id={usernameId} {...register('username')} required/>
                {errors.username && <span className="error">{errors.username.message}</span>}
          </div>

          <div className="form-group">
                <label htmlFor={passwordId}>Contraseña:</label>
                <input type="password" id={passwordId} {...register('password')} required/>
                {errors.password && <span className="error">{errors.password.message}</span>}
          </div>
          <button type="submit" disabled={!isValid || isSubmitting}> {isSubmitting ? <i className="fas fa-spinner fa-spin" /> : 'Iniciar sesión'}</button>
      </form>
      {errorLogin && <p role="alert">{errorLogin}</p>} 
      <p>
        ¿No tenés una cuenta? <Link to="/registro">Registrate</Link>
      </p>
    </section>
    </>
  )
}

export default Login