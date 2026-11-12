import iconCalistenia from "../../../mockup/iconCalistenia.jpg";
import iconFuncional from "../../../mockup/iconfuncional.jpg";
import iconFuerza from "../../../mockup/iconApp_sala.jpg";
import iconYoga from "../../../mockup/iconYoga.jpg";

const iconosCategoria = {
    calistenia: iconCalistenia,
    crossfit: iconFuerza,
    funcional: iconFuncional,
    yoga: iconYoga
};

const IconoCategoria = ({ categoria, className }) => {
    const icono = iconosCategoria[categoria.nombre.toLowerCase()];

    return (
        <span className={className} aria-hidden="true">
            {icono ? (
                <img src={icono} alt="" />
            ) : (
                categoria.nombre.charAt(0).toUpperCase()
            )}
        </span>
    );
};

export default IconoCategoria;
