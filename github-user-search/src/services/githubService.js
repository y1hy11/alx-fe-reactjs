import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const searchUsers = async (username, location, minRepos) => {
  try {
    let query = username;
    
    if (location) {
      query += `+location:${location}`;
    }
    
    if (minRepos) {
      query += `+repos:>=${minRepos}`;
    }
    
    const response = await axios.get(`${BASE_URL}/search/users?q=${query}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error searching users: ${error.message}`);
  }
};

export const getUserDetails = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error(`User not found: ${error.message}`);
  }
};

export const fetchUserData = async (username) => {
  try {
    const userDetails = await getUserDetails(username);
    return userDetails;
  } catch (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
};
