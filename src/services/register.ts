import axios from "axios";


export const registerUser = async (name: string, email: string, password: string, phone: string) => {
  try {
    const response = await axios.post(`${process.env.API_URL}/users`, {
      name,
      email,
      password,
      phone
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    return response.data;
  } catch (error) {
    return error;
  }
}