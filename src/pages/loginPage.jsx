import {useForm} from "react-hook-form"
import { Link } from "react-router";

const Login = () => {

    const {register, handleSubmit} = useForm();
    const procesarDatos = (data) => {
        console.log(data);
    }

  return (
    <>
    <section className="auth-form">
        <h2>Iniciar sesión</h2>
        <p>Ingresá a tu cuenta para continuar</p>
      <form onSubmit={handleSubmit(procesarDatos)}>
          <label htmlFor="username">Usuario</label>
          <input type="text" id="username" {...register("username")} required/>

          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" {...register("password")} required/>

          <input type="checkbox" id="remember" name="remember" value="remember"></input>
          <label htmlFor="remember"> Recordarme</label><br></br>


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