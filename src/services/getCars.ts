import axios from "axios";

export const getCars = async () => {
  try {
    const response = await axios.get(`${process.env.API_URL}/cars`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getMyCars = async (token: string) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/cars/mycars`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}