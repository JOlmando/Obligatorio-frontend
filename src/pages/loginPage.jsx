import { useId } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { loginSchema } from '../../validators/auth.validators'
import { toast } from 'react-toastify'

const Login = () => {

    const navigate = useNavigate()
    const usernameId = useId()
    const passwordId = useId()
    const { handleSubmit, register, formState: { errors } } = useForm({resolver: joiResolver(loginSchema), mode: 'onChange'})
  
    const procesarDatos = (data) => {
        localStorage.setItem('usuario', data.username)
        console.log(data)
        toast("Bienvenida/o!");
        toast.success("Inicio de sesión exitoso!");
        toast.warning("Por favor espera...");
        toast.error("Error al iniciar sesión");
        navigate('/checkin')
    }

  return (
    <>
    <section className="auth-form">
      <h2>Iniciar sesión</h2>
      <p>Ingresá a tu cuenta para continuar</p>
      <form onSubmit={handleSubmit(procesarDatos)}>
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

          <input type="submit" value="Iniciar sesión" disabled/>
      </form>
      <p>
        ¿No tenés una cuenta? <Link to="/registro">Registrate</Link>
      </p>
    </section>
    </>
  )
}

export default Login