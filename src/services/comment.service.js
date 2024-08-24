import { APIClient } from "../helpers/api_helper";

const baseUrl = `api/v1/comment`;
const api = new APIClient();

export const Get = (params) => api.get(baseUrl, params);
export const GetById = (id) => api.get(baseUrl + `/get-comment/${id}`);
export const GetByUserId = (id) => api.get(baseUrl + `/all-comments/user/${id}`);
export const GetByPostId = (id) => api.get(baseUrl + `/all-comments/post/${id}`);
export const Create = (params) => api.create(baseUrl, params);
export const Delete = (params) => api.delete(baseUrl + '/delete-comment', params);
export const Update = (params) => api.update(baseUrl + `/update/${params.commentID}`, '', params);



