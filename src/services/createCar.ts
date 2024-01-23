import axios from "axios";

export const createCar = async (formData: FormData, token: string) => {
  try {
    const response = await axios.post(`${process.env.API_URL}/cars`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Carro criado:', response.data);
    alert('Carro criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar carro:', error);
    alert('Erro ao criar carro. Por favor, tente novamente.');
  }
}