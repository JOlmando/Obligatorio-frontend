import api from "../api/api";

export const crearRutinaAPI = async (musculos) => {
    const res = await api.post(`/rutinas/crear`, musculos);
    return res.data;
};