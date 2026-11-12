import api from "../api/api";

export const changePlanAPI = async () => {
    const res = await api.patch("/usuarios/change-plan");
    return res.data;
};