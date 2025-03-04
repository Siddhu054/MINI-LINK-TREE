import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://mini-link-ddch.onrender.com/api', // Add /api to the base URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Request Config:', config); // Debug request
  return config;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
    return Promise.reject(error);
  }
);

export const auth = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  register: async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      return response;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const links = {
  create: (linkData: {
    title: string;
    url: string;
    backgroundColor?: string;
    textColor?: string;
  }) => api.post('/links', linkData),
  
  getAll: () => api.get('/links'),
  delete: (id: string) => api.delete(`/links/${id}`),
  incrementClicks: (id: string) => api.post(`/links/${id}/clicks`),
  reorder: (linkIds: string[]) => api.post('/links/reorder', { linkIds })
};

export default api; 