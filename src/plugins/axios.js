import axios from "axios";
import toast from "react-hot-toast";

const baseAxios = axios.create();

baseAxios.defaults.baseURL = "http://localhost:3002";

// Add a request interceptor
baseAxios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "bearer " + token;
    }
    return config;
  }, // function(config)
  function (error) {
    console.error('Request error:', error);
    return Promise.reject(error);
  } // function(error)
);

baseAxios.interceptors.response.use(
  function (response) {
   
    return response.data;
  }, // function(response)
  function (error) {

    if(!error.response){
            // Network error or server is not reachable
            console.error('Network Error or Server Unreachable:', error.message);
            toast.error('Server is not reachable. Please try again later.');
            return Promise.reject(error);
      
    }

    const statusCode = error?.response?.status;
    const errorMessage = error?.response?.data?.message || 'An error occurred';

    switch(statusCode){
      case 401:
        console.error("Unauthorized Access");
        toast.error(errorMessage);
        break;
      
      case 403:
        console.error('Forbidden:', errorMessage);
        break;

      case 404:
        console.error('Not Found:', errorMessage);
        toast.error(errorMessage);
        break;

      case 500:
        console.error('Server Error:', errorMessage);
        break;

      default:
        console.error('Error:', errorMessage);
        break;



    }
    return Promise.reject(error);
  } // function(error)
); // baseAxios.interceptors.response.use

export default baseAxios;
