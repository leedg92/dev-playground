import { setApiClient } from './api';
import config from '../config';

const apiClient = setApiClient(`${config.api.boardUrl}/api/v1`);

export const boardService = {
    getBoardList: async() => {
        const response = await apiClient.get('/board');
        return response.data;
    },
}
