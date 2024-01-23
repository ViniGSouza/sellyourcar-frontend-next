import axios from "axios";

export const updateCar = async (id: number, formData: FormData, token: string) => {
  try {
    const response = await axios.put(`${process.env.API_URL}/cars/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });
    console.log('Carro atualizado:', response.data);
    alert('Carro atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar carro:', error);
  }
}