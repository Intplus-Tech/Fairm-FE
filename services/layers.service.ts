import axios from "axios";

const BASE_URL = "https://fairm-be.onrender.com/api/v1/birds/layer";

export const layersService = {
  // Pass the token here
  getDashboard: async (token: string) => {
    const res = await axios.get(`${BASE_URL}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  getLayerById: async (id: number, token: string) => {
    const res = await axios.get(`${BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};