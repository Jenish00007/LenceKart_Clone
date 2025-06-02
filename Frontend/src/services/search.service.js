import axios from 'axios';
import { API_BASE_URL } from '../config';

export const searchProducts = async (params) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/search/products`, {
            params
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};