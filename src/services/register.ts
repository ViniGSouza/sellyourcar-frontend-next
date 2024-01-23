import axios from "axios";

export const registerUser = async (name: string, email: string, password: string, phone: string) => {
  try {
    const response = await axios.post(`${process.env.API_URL}/users`, {
      name,
      email,
      password,
      phone
    })
    return response.data;
  } catch (error) {
    return error;
  }
}