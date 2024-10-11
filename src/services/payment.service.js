import axios from "axios";

const baseUrl = `https://oauth.casso.vn/v2`;
const API_KEY = import.meta.env.VITE_APP_CASSO_API_KEY;

export const GetAllTransaction = async () => {
  const response = await axios(baseUrl + '/transactions', {
    headers: {
      Authorization: `apiKey ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    params: {
        page: 0,
        pageSize: 10,
        sort: 'ASC',
      },
  });
  const data = await response.data;
  return data;
};

