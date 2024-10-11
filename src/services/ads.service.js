import { APIClient } from "../helpers/api_helper";

const baseUrl = `api/v1/ads`;
const api = new APIClient();

export const Get = (params) => api.get(baseUrl + "/get-all", params);
export const GetById = (id) => api.get(baseUrl + `/${id}`);
export const GetByUser = (userId) => api.get(baseUrl + `/user/${userId}`);
export const GetTrending = () => api.get(baseUrl + `/trending`);
export const Create = (params) => api.create(baseUrl + `/create`, params);
export const Update = (id, params) => api.update(baseUrl + `/update`, id, params);
export const Delete = (userId, id) => api.delete(baseUrl + `/delete/${id}/user`, userId);
export const DeleteAllByUser = (userId) => api.delete(baseUrl + `/delete-all/user/${userId}`);
