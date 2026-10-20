import {useForm} from "react-hook-form"

const Login = () => {

    const {register, handleSubmit} = useForm();
    const procesarDatos = (data) => {
        console.log(data);
    }

  return (
    
    <form onSubmit={handleSubmit(procesarDatos)}>
        <label htmlFor="username">Ingrese username:</label>
        <input type="text" id="username" {...register("username")} />
        <label htmlFor="password">Ingrese password:</label>
        <input type="password" id="password" {...register("password")} />
        <input type="submit" value="Iniciar Sesion" />
    </form>
  )
}

export default Login