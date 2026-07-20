import type RegisterData from "@/models/registerData";
import apiClient from "@/config/ApiClient";
import type LoginData from "@/models/LoginData";
import type User from "@/models/User";
import type LoginResponseData from "@/models/LoginResponseData";

//register function to send data to backend
export const registerUser =async (signupData: RegisterData) => {
    //api call to server to save data
   const response = await apiClient.post(`/auth/register`, signupData);
   return response.data;
};

//login function to send data to backend
export const loginUser = async (loginData: LoginData) => {
  const response = await apiClient.post("/auth/login", loginData);
  return response.data;
};

export const logoutUser= async ()=>{
    const response = await apiClient.post(`/auth/logout`)
    return  response.data;
}




//get current login user 
export const getCurrentUser = async(emailId:string|undefined)=>{

const response = await apiClient.get<User>(`/users/email/${emailId}`);
return response.data;

}



//refresh token function to send data to backend

export const refreshToken = async()=>{
  const response = await apiClient.post<LoginResponseData>(`/auth/refresh`)
  return response.data;
}


//apis

