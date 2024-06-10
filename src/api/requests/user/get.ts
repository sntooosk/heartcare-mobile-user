import axios from "axios";
import { API } from "../..";

export async function get(id: number, token: string) {
  try {
    const response = await axios.get(`${API}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao obter usuário:", error);
    throw new Error("Erro ao obter usuário. Por favor, tente novamente.");
  }
}
