// src/services/api.js
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = (page = 2, limit = 101) => 
  axios.get(`${API_URL}?_page=${page}&_limit=${limit}`);

export const addUser = (user) => axios.post(API_URL, user);
export const updateUser = (id, user) => axios.put(`${API_URL}/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
