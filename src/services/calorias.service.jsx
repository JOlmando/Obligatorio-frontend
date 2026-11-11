import api from "../api/api";

export const calcularCaloriasAPI = async (datos) => {
    const res = await api.post(`/calorias`, datos);
    return res.data;
};
