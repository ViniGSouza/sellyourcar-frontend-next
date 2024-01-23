import axios from "axios";

export const deleteCar = async (id: number, userToken: string) => {
  try {
    await axios.delete(`${process.env.API_URL}/cars/${id}`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
  } catch(error) {
    console.error('Erro ao deletar carro:', error);
  }
}