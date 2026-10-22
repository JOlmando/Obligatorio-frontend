import {useForm} from "react-hook-form"

const Register = () => {

    const {register, handleSubmit} = useForm();
    const procesarDatos = (data) => {
        console.log(data);
    }

  return (
    <>
    <section className="auth-form">
      <h2>Registrarse</h2>
      <p>Ingresá a tus datos para continuar</p>
      <form onSubmit={handleSubmit(procesarDatos)}>
        
        <label htmlFor="username">Ingresá tu usuario:</label>
        <input type="text" id="username" {...register("username")} required/>

        <label htmlFor="password">Ingresá tu contraseña:</label>
        <input type="password" id="password" {...register("password")} required/>

        <label htmlFor="passwordConfirm">Confirmá tu contraseña:</label>
        <input type="password" id="passwordConfirm" {...register("passwordConfirm")} required/>

        <label htmlFor="subir-img">Elige una foto de perfil:</label>
        <input type="file" id="subir-img" name="imagen" accept="image/*" {...register("subir-img")}></input>
        
        <input type="submit" value="Registrarse"  />
      </form>
    </section>
    </>
  )
}

export default Register