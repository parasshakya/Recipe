import axios from "axios";

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

    const statusCode = error?.response?.status;
    const errorMessage = error?.response?.data?.message || 'An error occurred';

    switch(statusCode){
      case 401:
        console.log("Unauthorized Access");
        break;
      
      case 403:
        console.error('Forbidden:', errorMessage);
        break;

      case 404:
        console.error('Not Found:', errorMessage);
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
