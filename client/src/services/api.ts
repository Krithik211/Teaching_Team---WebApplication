import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api", // Adjust this to match your backend URL
});

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const userApi = {

  getUser: async (user: LoginRequest) => {
    const response = await api.post("/login", user);
    return response.data;
  },

  createUser: async (user: Partial<User>) => {
    const response = await api.post("/tutorials", user);
    return response.data;
  },

  updateTutorial: async (id: number, user: Partial<User>) => {
    const response = await api.put(`/tutorials/${id}`, user);
    return response.data;
  },

  deleteTutorial: async (id: number) => {
    const response = await api.delete(`/tutorials/${id}`);
    return response.data;
  },
};
