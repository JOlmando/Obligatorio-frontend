import api from "../api/api";

export const changePlanAPI = async () => {
    await api.patch(`/usuarios/change-plan`);
    return id;
};