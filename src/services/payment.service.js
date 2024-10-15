import axios from "axios";
import { APIClient } from "../helpers/api_helper";
const api = new APIClient();

const baseCassoUrl = `https://oauth.casso.vn/v2`;
const baseUrl = "api/v1/payment-casso"

const API_KEY = import.meta.env.VITE_APP_CASSO_API_KEY;
const GG_APP_SCRIPT_API_KEY = import.meta.env.VITE_APP_GG_APP_SCRIPT_API_KEY;

export const GetUserPaid = () => api.get(baseUrl + "/users-paid");
export const GetAllTransaction = async () => {
  const response = await axios(baseCassoUrl + '/transactions', {
    headers: {
      Authorization: `apiKey ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    params: {
        page: 0,
        pageSize: 10,
        sort: 'ASC',
        fromDate: new Date().toISOString().slice(0, 10),
      },
  });
  const data = await response.data;
  return data;
};

