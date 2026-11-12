import api from "../api/api";

const validarRespuestaVisitas = (res) => {
    const visitas = Array.isArray(res.data)
        ? res.data
        : res.data?.visitas;

    if (!Array.isArray(visitas)) {
        throw new Error("Formato de visitas inválido");
    }
    console.log(visitas)
    return visitas;
};

// GET: obtener visitas paginadas
export const obtenerVisitasAPI = async ({
    limit = 7,
    page = 1
} = {}) => {
    const params = { limit, page };

    const res = await api.get("/visitas", { params });
    return validarRespuestaVisitas(res);
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
    fechaFin
) => {
    const res = await api.get("/visitas/fechas", {
        params: {
            min: fechaInicio,
            max: fechaFin
        }
    });
    return validarRespuestaVisitas(res);
};