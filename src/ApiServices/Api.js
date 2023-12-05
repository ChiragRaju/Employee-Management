import axios from 'axios';

const BASE_URL = "https://localhost:7103/api/Employee";

const Api = {
  getAllEmployeesApi: () => {
    return axios.get(BASE_URL);
  },
  getEmployeeByCodeApi: (code) => {
    return axios.get(`${BASE_URL}/${code}`);
  },
  createEmployeeApi: (data) => {
    return axios.post(BASE_URL, data);
  },
  updateEmployeeApi: (data) => {
    return axios.put(`${BASE_URL}/${data.id}`, data);
  },
  removeEmployeeApi: (code) => {
    return axios.delete(`${BASE_URL}/${code}`);
  },
};

export default Api;

  
