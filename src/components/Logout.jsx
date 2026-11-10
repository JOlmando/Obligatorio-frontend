import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { limpiarToken } from '../features/auth.slice'

export const Logout = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        // Limpiar el token del estado global (Redux) del store
        dispatch(limpiarToken())
        // Redirigir al usuario a la página de inicio de sesión
        navigate('/login')
    }
    return (
    <>
        <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
            title="Cerrar sesión"
            >
            <i className="fas fa-right-from-bracket" aria-hidden="true"></i>
            <span>Cerrar sesión</span>
        </button>
    </>
    )
}