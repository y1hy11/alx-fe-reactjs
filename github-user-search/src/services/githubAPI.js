import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const searchUsers = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/users?q=${username}`);
    return response.data;
  } catch (error) {
    throw new Error('Error searching users');
  }
};

export const getUserDetails = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error('User not found');
  }
};
