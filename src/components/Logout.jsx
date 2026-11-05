import { useNavigate } from 'react-router'

export const Logout = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        // Limpiar el token del estado global (Redux) del store
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