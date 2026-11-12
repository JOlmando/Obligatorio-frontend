import { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { loginSchema } from '../validators/auth.validators'
import { useDispatch } from 'react-redux';
import api from "../api/api";
import { guardarToken, guardarUsuario } from '../features/auth.slice';
import { setImagen } from '../features/uploads/uploads.slice'

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const usernameId = useId();
    const passwordId = useId();
    const { handleSubmit, register, formState: { errors, isSubmitting, isValid } } = useForm({resolver: joiResolver(loginSchema), mode: 'onChange'});
    const [errorLogin, setErrorLogin] = useState('');

    const iniciarSesion = async (data) => {
        try{
          const res = await api.post('/auth/login', data)
          dispatch(guardarToken(res.data.token));
          dispatch(guardarUsuario(res.data.usuario));
          dispatch(setImagen(res.data.usuario.fotoPerfil));
          navigate('/checkin');
        }catch(error){
          setErrorLogin(error.response?.data?.message || 'Ocurrió un error al iniciar sesión');
        } 
    }
  return (
    <section className="auth-form">
      <h2>Iniciar sesión</h2>
      <p>Ingresá a tu cuenta para continuar</p>
      <form onSubmit={handleSubmit(iniciarSesion)}>
        <div className="auth-form-group">
          <label htmlFor={usernameId}>Usuario</label>
          <div className="auth-input-shell">
            <span className="auth-input-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 20v-1.5a7 7 0 0 1 14 0V20z" />
              </svg>
            </span>
            <input
              type="text"
              id={usernameId}
              placeholder="Ingresá tu usuario"
              {...register('username')}
              required
            />
          </div>
          {errors.username && <span className="auth-field-error">{errors.username.message}</span>}
        </div>

        <div className="auth-form-group">
          <label htmlFor={passwordId}>Contraseña</label>
          <div className="auth-input-shell">
            <span className="auth-input-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3" />
              </svg>
            </span>
            <input
              type="password"
              id={passwordId}
              placeholder="Ingresá tu contraseña"
              {...register('password')}
              required
            />
          </div>
          {errors.password && <span className="auth-field-error">{errors.password.message}</span>}
        </div>

        <button className="auth-submit-button" type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? <i className="fas fa-spinner fa-spin" /> : 'Iniciar sesión'}
        </button>
      </form>
      {errorLogin && <p className="auth-api-error" role="alert">{errorLogin}</p>}
      <div className="auth-divider" aria-hidden="true"><span>o</span></div>
      <p className="auth-switch">
        ¿No tenés una cuenta? <Link to="/registro">Registrate</Link>
      </p>
    </section>
  )
}

export default Login