import { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { registerSchema } from '../validators/auth.validators'
import { useDispatch } from 'react-redux';
import api from "../api/api";
import { guardarToken, guardarUsuario } from '../features/auth.slice';
import { setImagen } from '../features/uploads/uploads.slice'

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const usernameId = useId();
    const passwordId = useId();
    const passwordConfirmId = useId();
    const { handleSubmit, register, formState: { errors, isValid, isSubmitting } } = useForm({resolver: joiResolver(registerSchema), mode: 'onChange'});
    const [errorRegister, setErrorRegister] = useState('');

    const Registrar = async (data) => {

        const archivo = data.imagen?.[0];
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('password', data.password);
        formData.append('confirmPassword', data.confirmPassword);
        if (archivo) {
          formData.append('imagen', archivo);
        }
        try{
          const res = await api.post('/auth/register', formData)

          dispatch(guardarToken(res.data.token));
          dispatch(guardarUsuario(res.data.usuario));
          dispatch(setImagen(res.data.usuario.fotoPerfil));
          navigate('/checkin');

        }catch(error){
          console.error('Falló la petición de registro:', error.response?.status, error.response?.data?.message || error.message);
          setErrorRegister(error.response?.data?.message || 'Ocurrió un error al intentar registrarse');
        } 
    }

  return (
    <section className="auth-form">
      <h2>Crear cuenta</h2>
      <p>Completá los datos para registrarte</p>
      <form onSubmit={handleSubmit(Registrar)}>
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

        <div className="auth-form-group">
          <label htmlFor={passwordConfirmId}>Confirmar contraseña</label>
          <div className="auth-input-shell">
            <span className="auth-input-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3" />
              </svg>
            </span>
            <input
              type="password"
              id={passwordConfirmId}
              placeholder="Confirmá tu contraseña"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && <span className="auth-field-error">{errors.confirmPassword.message}</span>}
        </div>

        <div className="auth-photo-group">
          <span className="auth-photo-label">Foto de perfil (opcional)</span>
          <div className="auth-photo-control">
            <span className="auth-photo-placeholder" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21a8 8 0 0 1 16 0z" />
              </svg>
            </span>
            <label className="auth-file-button" htmlFor="subir-img">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
              Seleccionar imagen
            </label>
            <input
              className="auth-file-input"
              type="file"
              id="subir-img"
              accept="image/*"
              {...register("imagen")}
            />
          </div>
        </div>

        <button className="auth-submit-button" type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? <i className="fas fa-spinner fa-spin" /> : 'Registrarse'}
        </button>
      </form>
      {errorRegister && <p className="auth-api-error" role="alert">{errorRegister}</p>}
      <div className="auth-divider" aria-hidden="true"><span>o</span></div>
      <p className="auth-switch">
        ¿Ya tenés una cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </section>
  )
}

export default Register