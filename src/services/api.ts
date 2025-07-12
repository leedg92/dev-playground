import axios from 'axios';


export const setApiClient = (baseURL: string) => {
    const apiClient = axios.create({
        baseURL: baseURL,
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
    });
    return apiClient;
}
  