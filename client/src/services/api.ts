import axios from "axios";
import { RegisterRequest, User } from "@/types/User";
import { CoursesResponse } from "@/types/Course";
import { Application } from "@/types/FormFields";

export const api = axios.create({
  baseURL: "http://localhost:3001/api", // Adjust this to match your backend URL
});

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

  createUser: async (user: RegisterRequest) => {
    console.log('API request is going...', user)
    const response = await api.post("/auth/register", user);
    console.log('API Response', response)
    return response.data;
  },

  getAvatar: async (): Promise<any> => {
    const response = await api.get("/request/getAllAvatars");
    return response.data;
  },

  updateUser: async (userId: number, user: Partial<User>) => {
    console.log("Calling updateUser API", userId, user);
    const response = await api.put(`/auth/user/update/${userId}`, user);
    return response.data;
  },

  getCourses: async (): Promise<CoursesResponse> => {
    const response = await api.get("/request/getAllCourses");
    return response.data;
  },

  saveApplication: async (application: Application): Promise<any> => {
    const response = await api.post("/application/saveApplication", application);
    return response.data;
  },

  getApplicationByUserId: async (userID: any): Promise<any> => {
    const response = await api.get(`/application/getApplicationByUserId/${userID}`);
    return response.data;
  },

  updateApplicationByID: async (application: any): Promise<any> => {
    const response = await api.put("/application/updateApplication", application);
    return response.data;
  },
  getCoursesByLecturerId: async (userID: number): Promise<any> => {
    const response = await api.get(`/request/getLecturerCourses/${userID}`);
    return response.data;
  },

  getApplicationByLecturerID: async (userID: any): Promise<any> => {
    const response = await api.get(`/application/getApplicationsByLecturer/${userID}`);
    return response.data;
  },

  getExistingRanking: async (userID: any): Promise<any> => {
    const response = await api.get(`/ranking/getExistingRanking/${userID}`);
    return response.data;
  },

  saveRanking: async (data: {
    userId: any;
    applicationId: string;
    rank: string;
    comment: string;
  }) => {
    const response = await api.post('/ranking/insertAndUpdate', data);
    return response.data;
  },

  deleteRanking: async (data: { userId: any; applicationId: string }) => {
    return await api.delete("/ranking/delete", { data });
  },

};
