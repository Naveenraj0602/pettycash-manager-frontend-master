import axios from "axios";
// import {config} from "dotenv";



const backendInstance = axios.create({
  
    baseURL: "https://petty-6j9h.onrender.com"
    
})

// Request Interceptor
backendInstance.interceptors.request.use(function (config) {
    const { accessToken } = JSON.parse(localStorage.getItem('user') || '{}');
    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        'Authorization': accessToken
      }
    }
    return newConfig;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  
  // Add a response interceptor
  backendInstance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default backendInstance;
