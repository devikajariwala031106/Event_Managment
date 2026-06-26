import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';

export const getEvents = async (keyword = '') => {
    const { data } = await axios.get(`${API_URL}?keyword=${keyword}`);
    return data;
};

export const getEventById = async (id) => {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
};

export const createEvent = async (eventData) => {
    const { data } = await axios.post(API_URL, eventData);
    return data;
};

export const updateEvent = async (id, eventData) => {
    const { data } = await axios.put(`${API_URL}/${id}`, eventData);
    return data;
};

export const deleteEvent = async (id) => {
    const { data } = await axios.delete(`${API_URL}/${id}`);
    return data;
};
