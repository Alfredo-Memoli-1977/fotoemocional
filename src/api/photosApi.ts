import axios from "axios";

const photosApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptores permite agregar modificaciones a la request o a la response
// photoApi.interceptors.request.use((config)=>{
//     const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// })

export { photosApi };
