const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(config, "---check config---");
  },
  (error) => {
    return Promise.reject(error);
  }
);



module.exports=axiosInstance
