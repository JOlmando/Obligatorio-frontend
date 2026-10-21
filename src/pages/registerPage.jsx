import {useForm} from "react-hook-form"

const Register = () => {

    const {register, handleSubmit} = useForm();
    const procesarDatos = (data) => {
        console.log(data);
    }

  return (
    <>
    <form onSubmit={handleSubmit(procesarDatos)}>
      
        <label htmlFor="username">Ingresá tu usuario:</label>
        <input type="text" id="username" {...register("username")} />

        <label htmlFor="password">Ingresá tu contraseña:</label>
        <input type="password" id="password" {...register("password")} />

        <label htmlFor="passwpasswordConfirmord">Confirmá tu contraseña:</label>
        <input type="passwordConfirm" id="passwordConfirm" {...register("passwordConfirm")} />
        
        <input type="submit" value="Registrarse" />
    </form>
    </>
  )
}

export default Register