export type ListType = {
  id: number;
  title: string;
  content: string;
  writer: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

// 게시판 목록 조회 요청 타입
export type BoardListRequest = {
  pageNum: number;
  rowsPerPage: number;
};

// 게시판 목록 조회 응답 타입
export type BoardListResponse = {
  result: ListType[];
  totalCount: number;
  totalPages: number;
};

// 게시판 상세 조회 요청 타입
export type BoardDetailRequest = {
  id: number;
};

// 게시판 상세 조회 응답 타입
export type BoardDetailResponse = {
  result: ListType;
};

// 게시판 등록 요청 타입
export type BoardInsertRequest = {
  title: string;
  content: string;
  writer: string;
  password: string;
};

// 게시판 등록 응답 타입
export type BoardInsertResponse = {
  result: number;
};

// 게시판 비밀번호 확인 요청 타입
export type BoardCheckPasswordRequest = {
  id: number;
  password: string;
};

// 게시판 비밀번호 확인 응답 타입
export type BoardCheckPasswordResponse = {
  result: boolean;
};

// 게시판 삭제 요청 타입
export type BoardDeleteRequest = {
  id: number;
  password: string;
};

// 게시판 삭제 응답 타입
export type BoardDeleteResponse = {
  result: number;
};

// 게시판 수정 요청 타입
export type BoardUpdateRequest = {
  id: number;
  title: string;
  content: string;
  password: string;
};

// 게시판 수정 응답 타입
export type BoardUpdateResponse = {
  result: number;
};

// 에러 응답 타입
export type ErrorResponse = {
  error: string;
};