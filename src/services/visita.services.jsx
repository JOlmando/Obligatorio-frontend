import api from "../api/api";

// GET: obtener visitas paginadas y, opcionalmente, filtradas por fechas
export const obtenerVisitasAPI = async ({
    limit = 7,
    page = 1,
    min,
    max
} = {}) => {
    const params = { limit, page };

    if (min) params.min = min;
    if (max) params.max = max;

    const res = await api.get("/visitas", { params });

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
export const obtenerVisitasEntreFechasAPI = async (
    fechaInicio,
    fechaFin,
    limit = 7,
    page = 1
) => {
    return obtenerVisitasAPI({
        limit,
        page,
        min: fechaInicio,
        max: fechaFin
    });
};