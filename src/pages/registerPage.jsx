import { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { registerSchema } from '../validators/auth.validators'
import { useDispatch } from 'react-redux';
import api from "../api/api";
import { guardarToken, guardarNombre } from '../features/auth.slice';
import { toast } from 'react-toastify'
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
          dispatch(guardarNombre(res.data.usuario.username));
          dispatch(setImagen(res.data.usuario.fotoPerfil));

          toast.success("Inicio de sesión exitoso!");
          toast("Bienvenida/o!");
          navigate('/checkin');

        }catch(error){
          console.error('Falló la petición de registro:', error.response?.status, error.response?.data?.message || error.message);
          setErrorRegister(error.response?.data?.message || 'Ocurrió un error al intentar registrarse');
        } 
    }

  return (
    <>
    <section className="auth-form">
      <h2>Registrarse</h2>
      <p>Ingresá a tus datos para continuar</p>
      <form onSubmit={handleSubmit(Registrar)}>
        
        <div className="form-group">
            <label htmlFor={usernameId}>Usuario:</label>
            <input type="text" id={usernameId} {...register('username')} required />
            {errors.username && <span className="error">{errors.username.message}</span>}
        </div>

        <div className="form-group">
            <label htmlFor={passwordId}>Contraseña:</label>
            <input type="password" id={passwordId} {...register('password')} required/>
            {errors.password && <span className="error">{errors.password.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor={passwordConfirmId}>Confirmá tu contraseña:</label>
          <input type="password" id={passwordConfirmId} {...register("confirmPassword")} />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
        </div>

        <label htmlFor="subir-img">Elige una foto de perfil:</label>
        <input type="file" id="subir-img" accept="image/*" {...register("imagen")}></input>
        
        <button type="submit" disabled={!isValid || isSubmitting}> {isSubmitting ? <i className="fas fa-spinner fa-spin" /> : 'Registrarse'}</button>
      </form>
      {errorRegister && <p role="alert">{errorRegister}</p>}
      <p>
          ¿Ya tenés una cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
      
    </section>
    </>
  )
}

export default Register