import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ListType } from '../../types/board';
import { boardService } from '../../services/boardService';
import PasswordModal from '../../components/common/PasswordModal';
import './Detail.css';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [board, setBoard] = useState<ListType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<'edit' | 'delete'>('edit');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState<string>(''); // 확인된 패스워드 저장
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
  });

  const fetchBoardDetail = async () => {
    if (!id) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await boardService.getBoardDetail({ id: parseInt(id) });
      setBoard(response.result);
      setEditForm({
        title: response.result.title,
        content: response.result.content,
      });
    } catch (err) {
      setError('게시글을 불러오는데 실패했습니다.');
      console.error('Error fetching board detail:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoardDetail();
  }, [id]);

  const handlePasswordConfirm = async (password: string) => {
    if (!board) return;
    
    setPasswordLoading(true);
    
    try {
      const response = await boardService.checkPassword({
        id: board.id,
        password,
      });
      
      if (response.result) {
        setConfirmedPassword(password); // 확인된 패스워드 저장
        setIsModalOpen(false);
        
        if (modalAction === 'delete') {
          await handleDelete(password);
        } else {
          // 수정 모드로 전환
          setIsEditing(true);
        }
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      alert('비밀번호 확인에 실패했습니다.');
      console.error('Error checking password:', err);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDelete = async (password: string) => {
    if (!board) return;
    
    try {
      await boardService.deleteBoard({
        id: board.id,
        password,
      });
      
      alert('게시글이 삭제되었습니다.');
      navigate('/board');
    } catch (err) {
      alert('게시글 삭제에 실패했습니다.');
      console.error('Error deleting board:', err);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!board) return;
    
    if (!editForm.title.trim() || !editForm.content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    
    // 이미 확인한 패스워드를 사용하여 바로 업데이트
    await handleUpdateSubmit();
  };

  const handleUpdateSubmit = async () => {
    if (!board || !confirmedPassword) return;
    
    setLoading(true);
    
    try {
      await boardService.updateBoard({
        id: board.id,
        title: editForm.title,
        content: editForm.content,
        password: confirmedPassword,
      });
      
      alert('게시글이 수정되었습니다.');
      setIsEditing(false);
      setConfirmedPassword(''); // 패스워드 초기화
      fetchBoardDetail(); // 수정된 내용 다시 불러오기
    } catch (err) {
      alert('게시글 수정에 실패했습니다.');
      console.error('Error updating board:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setConfirmedPassword(''); // 패스워드 초기화
    if (board) {
      setEditForm({
        title: board.title,
        content: board.content,
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR');
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/board')}>목록으로</button>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="error-container">
        <div className="error-message">게시글을 찾을 수 없습니다.</div>
        <button onClick={() => navigate('/board')}>목록으로</button>
      </div>
    );
  }

  return (
    <div className="board-detail-container">
      <div className="board-header">
        <h1>게시글 상세</h1>
        <button onClick={() => navigate('/board')}>목록으로</button>
      </div>

      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <div className="form-group">
            <label htmlFor="title">제목:</label>
            <input
              type="text"
              id="title"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content">내용:</label>
            <textarea
              id="content"
              value={editForm.content}
              onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
              rows={10}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-buttons">
            <button type="button" onClick={handleEditCancel} disabled={loading}>
              취소
            </button>
            <button type="submit" disabled={loading}>
              {loading ? '수정 중...' : '수정완료'}
            </button>
          </div>
        </form>
      ) : (
        <div className="board-content">
          <div className="board-info">
            <h2>{board.title}</h2>
            <div className="board-meta">
              <span>작성자: {board.writer}</span>
              <span>작성일: {formatDate(board.createdAt)}</span>
              {board.createdAt !== board.updatedAt && (
                <span>수정일: {formatDate(board.updatedAt)}</span>
              )}
            </div>
          </div>
          
          <div className="board-body">
            <div className="content">{board.content}</div>
          </div>
          
          <div className="board-actions">
            <button
              onClick={() => {
                setModalAction('edit');
                setIsModalOpen(true);
              }}
            >
              수정
            </button>
            <button
              onClick={() => {
                setModalAction('delete');
                setIsModalOpen(true);
              }}
              className="delete-btn"
            >
              삭제
            </button>
          </div>
        </div>
      )}

      <PasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handlePasswordConfirm}
        title={modalAction === 'delete' ? '게시글 삭제' : '게시글 수정'}
        loading={passwordLoading}
      />
    </div>
  );
};

export default Detail; 