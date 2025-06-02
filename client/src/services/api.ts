import axios from "axios";
import { User } from "@/types/User";
import { Avatar } from "@/types/Avatar";

export const api = axios.create({
  baseURL: "http://localhost:3001/api", // Adjust this to match your backend URL
});

// export interface User {
//   userId: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   role: string;
// }

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user?: User;
}

export const userApi = {

  getUser: async (user: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", user);
    return response.data;
  },

  createUser: async (user: User) => {
    const response = await api.post("/auth/register", user);
    return response.data;
  },

  getAvatar: async (): Promise<any> => {
    const response = await api.get("/request/getAllAvatars");
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
