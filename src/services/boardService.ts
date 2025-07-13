import { setApiClient } from './api';
import config from '../config';
import {
  BoardListRequest,
  BoardListResponse,
  BoardDetailRequest,
  BoardDetailResponse,
  BoardInsertRequest,
  BoardInsertResponse,
  BoardCheckPasswordRequest,
  BoardCheckPasswordResponse,
  BoardDeleteRequest,
  BoardDeleteResponse,
  BoardUpdateRequest,
  BoardUpdateResponse,
} from '../types/board';

const apiClient = setApiClient(`${config.api.boardUrl}`);

export const boardService = {
  // 게시판 목록 조회
  getBoardList: async (params: BoardListRequest): Promise<BoardListResponse> => {
    const response = await apiClient.post('/board/v1/list', params);
    return response.data;
  },

  // 게시판 상세 조회
  getBoardDetail: async (params: BoardDetailRequest): Promise<BoardDetailResponse> => {
    const response = await apiClient.post('/board/v1/detail', params);
    return response.data;
  },

  // 게시판 등록
  insertBoard: async (params: BoardInsertRequest): Promise<BoardInsertResponse> => {
    const response = await apiClient.post('/board/v1/insert', params);
    return response.data;
  },

  // 게시판 비밀번호 확인
  checkPassword: async (params: BoardCheckPasswordRequest): Promise<BoardCheckPasswordResponse> => {
    const response = await apiClient.post('/board/v1/checkPassword', params);
    return response.data;
  },

  // 게시판 삭제
  deleteBoard: async (params: BoardDeleteRequest): Promise<BoardDeleteResponse> => {
    const response = await apiClient.post('/board/v1/delete', params);
    return response.data;
  },

  // 게시판 수정
  updateBoard: async (params: BoardUpdateRequest): Promise<BoardUpdateResponse> => {
    const response = await apiClient.post('/board/v1/update', params);
    return response.data;
  },
};
