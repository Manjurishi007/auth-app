import useAuth from "@/auth/store";
import { refreshToken } from "@/services/authService";
import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8086/api/v1",

    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Include cookies in requests
    timeout: 10000, // Set a timeout for requests (in milliseconds)
});


// every request : before every request

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = useAuth.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


let isRefreshing = false;
let pending: any[] = [];


function queueRequest(cb: any) {
    pending.push(cb)
}

function resolveQueue(newToken: string) {
    pending.forEach(cb => cb(newToken));
    pending = []


};


//response interceptors

apiClient.interceptors.response.use(response => response, async (error) => {
    
    const is401 = error.response.status === 401;
    const original = error.config;
    console.log(original);
console.log("original retry", original._retry);

    if (!is401 || original._retry) {
        // message
        return Promise.reject(error);
    }

    original._retry = true;
    //we will try to refresh the token

    if (isRefreshing) {
        console.log("Added to queue ......");
        
        return new Promise((resolve, reject) => {

            queueRequest((newToken: string) => {
                if (!newToken) reject();
                original.headers.Authorization = `Bearer ${newToken}`;
                resolve(apiClient(original));
            })
        })
    }


    //start refresh

    isRefreshing = true
    try {
        console.log("start refreshing");
        
        const loginResponse = await refreshToken()
        const newToken = loginResponse.accessToken;
        if (!newToken) throw new Error("no access token received");

        useAuth.getState().changeLocalLoginData(loginResponse.accessToken, loginResponse.user, true);


        resolveQueue(newToken);

        original.headers.Authorization = `Bearer ${newToken}`
        return apiClient(original)

    } catch (error) {

        resolveQueue('null');
        useAuth.getState().logout()
        return Promise.reject(error)

    }
    finally {
        isRefreshing = false;
    }

})

export default apiClient;