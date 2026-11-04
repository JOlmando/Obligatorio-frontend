import { useId, useState } from 'react'
import { Link, /*useNavigate*/ } from 'react-router'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { loginSchema } from '../../validators/auth.validators'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import api from "../api/api";
import { guardarToken } from '../features/login.slice';

const Login = () => {

    const dispatch = useDispatch();
    //const navigate = useNavigate()
    const usernameId = useId();
    const passwordId = useId();
    const { handleSubmit, register, formState: { errors } } = useForm({resolver: joiResolver(loginSchema), mode: 'onChange'});
    const [errorLogin, setErrorLogin] = useState('');

    const iniciarSesion = async (data) => {
        try{
          const res = await api.post('/v1/auth/login', data)

          dispatch(guardarToken(res.data.token));

          //console.log(res.data);
          
          const token = useSelector((state) => state.login.token);

          console.log(token);


        }catch(error){
          setErrorLogin(error.response?.data?.message || 'Ocurrió un error al iniciar sesión');
        }

        
        toast("Bienvenida/o!");
        toast.success("Inicio de sesión exitoso!");
        toast.warning("Por favor espera...");

        
        
        //navigate('/checkin')
    }

  return (
    <>
    <section className="auth-form">
      <h2>Iniciar sesión</h2>
      <p>Ingresá a tu cuenta para continuar</p>
      <form onSubmit={handleSubmit(iniciarSesion)}>
          <div className="form-group">
                <label htmlFor={usernameId}>Usuario:</label>
                <input type="text" id={usernameId} {...register('username')} />
                {errors.username && <span className="error">{errors.username.message}</span>}
          </div>

          <div className="form-group">
                <label htmlFor={passwordId}>Contraseña:</label>
                <input type="password" id={passwordId} {...register('password')} />
                {errors.password && <span className="error">{errors.password.message}</span>}
          </div>
          <input type="submit" value="Iniciar sesión" />
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