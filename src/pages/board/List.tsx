import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListType, BoardListResponse } from "../../types/board";
import { boardService } from "../../services/boardService";
import './List.css';

const List: React.FC = () => {
  const [boardList, setBoardList] = useState<ListType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');

  const navigate = useNavigate();

  const fetchBoardList = async (pageNum: number, search?: string) => {
    setLoading(true);
    setError('');
    
    try {
      const response: BoardListResponse = await boardService.getBoardList({
        pageNum,
        rowsPerPage,
        search: search || null,
      });
      
      setBoardList(response.result);
      setTotalPages(response.totalPages);
      setTotalCount(response.totalCount);
    } catch (err) {
      setError('게시판 목록을 불러오는데 실패했습니다.');
      console.error('Error fetching board list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoardList(currentPage, currentSearch);
  }, [currentPage, currentSearch]);

  const handleSearch = () => {
    setCurrentSearch(searchTerm);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleSearchReset = () => {
    setSearchTerm('');
    setCurrentSearch('');
    setCurrentPage(1);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (id: number) => {
    navigate(`/board/${id}`);
  };

  const handleWriteClick = () => {
    navigate('/board/write');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      pages.push(
        <button key="first" onClick={() => handlePageChange(1)}>
          처음
        </button>
      );
    }

    if (currentPage > 1) {
      pages.push(
        <button key="prev" onClick={() => handlePageChange(currentPage - 1)}>
          이전
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <button key="next" onClick={() => handlePageChange(currentPage + 1)}>
          다음
        </button>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <button key="last" onClick={() => handlePageChange(totalPages)}>
          마지막
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="board-list-container">
      <div className="board-header">
        <h1>게시판</h1>
        <button className="write-btn" onClick={handleWriteClick}>
          글쓰기
        </button>
      </div>

      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="제목, 내용, 작성자로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleSearchKeyPress}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">
            검색
          </button>
          {currentSearch && (
            <button onClick={handleSearchReset} className="reset-btn">
              초기화
            </button>
          )}
        </div>
        {currentSearch && (
          <div className="search-info">
            '<span className="search-keyword">{currentSearch}</span>' 검색 결과
          </div>
        )}
      </div>
      
      <div className="board-info">
        총 {totalCount}개의 게시글
      </div>

      {loading && <div className="loading">로딩 중...</div>}
      
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <>
          <div className="board-table">
            <div className="table-header">
              <div className="col-num">번호</div>
              <div className="col-title">제목</div>
              <div className="col-writer">작성자</div>
              <div className="col-date">작성일</div>
            </div>
            
            {boardList.length === 0 ? (
              <div className="no-data">
                {currentSearch ? '검색 결과가 없습니다.' : '등록된 게시글이 없습니다.'}
              </div>
            ) : (
              boardList.map((board) => (
                <div
                  key={board.id}
                  className="table-row"
                  onClick={() => handleRowClick(board.id)}
                >
                  <div className="col-num">{board.id}</div>
                  <div className="col-title">{board.title}</div>
                  <div className="col-writer">{board.writer}</div>
                  <div className="col-date">{formatDate(board.createdAt)}</div>
                </div>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              {renderPagination()}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default List;
