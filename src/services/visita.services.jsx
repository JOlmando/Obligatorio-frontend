import api from "../api/api";

// GET: obtener visitas 
export const obtenerVisitasAPI = async () => {
    const res = await api.get("/visitas?limit=10&page=1");

    if (!Array.isArray(res.data?.visitas)) {
        throw new Error("Formato de visitas inválido");
    }

    return res.data.visitas;
};

// POST: crear visitas
export const crearVisitaAPI = async (datos) => {
    const res = await api.post("/visitas", datos);
    return res.data;
};

// PUT: actualizar visitas
export const actualizarVisitaAPI = async (id, datos) => {
    const res = await api.put(`/visitas/${id}`, datos);
    return res.data;
};

// DELETE: eliminar visitas
export const eliminarVisitaAPI = async (id) => {
    await api.delete(`/visitas/${id}`);
    return id;
};

// GET: obtener visitas entre fechas
export const obtenerVisitasEntreFechasAPI = async (fechaInicio, fechaFin) => {
    const res = await api.get(`/visitas?min=${fechaInicio}&max=${fechaFin}`);

    if (!Array.isArray(res.data?.visitas)) {
        throw new Error("Formato de visitas inválido");
    }

    return res.data.visitas;
};