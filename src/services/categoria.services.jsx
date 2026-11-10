import api from "../api/api";

// GET: obtener categorías
export const obtenerCategoriasAPI = async () => {
    const res = await api.get("/categorias?limit=10&page=1");

    if (!Array.isArray(res.data?.categorias)) {
        throw new Error("Formato de categorías inválido");
    }

    return res.data.categorias;
};

// POST: crear categoría
export const crearCategoriaAPI = async (datos) => {
    const res = await api.post("/categorias", datos);
    return res.data;
};

// PUT: actualizar categoría
export const actualizarCategoriaAPI = async (id, datos) => {
    const res = await api.put(`/categorias/${id}`, datos);
    return res.data;
};

// DELETE: eliminar categoría
export const eliminarCategoriaAPI = async (id) => {
    await api.delete(`/categorias/${id}`);
    return id;
};