import { APIClient } from "../helpers/api_helper";

const baseUrl = `api/v1/user`;
const api = new APIClient();

export const Get = (params) => api.get(baseUrl, params);
export const GetById = (id) => api.get(baseUrl + `/${id}`);
export const Create = (params) => api.create(baseUrl, params);
export const Delete = (params) => api.delete(baseUrl + '/delete', params);
export const UpdateInfo = (params) => api.update(baseUrl + `/update/${params.userId}`, '', params);
export const AllUsers = (query) => api.getAll(baseUrl + '/all-users', query);
export const UpdateAvatar = (params) => api.create(baseUrl + '/change-avatar', params);
export const ChangePassword = (params) => api.create(baseUrl + '/change-password', params);
export const GetCurrentUser = () => {
  return api.get(baseUrl + '/get-current-user');
};
