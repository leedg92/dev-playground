import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { boardService } from '../../services/boardService';
import './Write.css';

const Write: React.FC = () => {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    title: '',
    content: '',
    writer: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!form.title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
    }
    
    if (!form.content.trim()) {
      newErrors.content = '내용을 입력해주세요.';
    }
    
    if (!form.writer.trim()) {
      newErrors.writer = '작성자를 입력해주세요.';
    }
    
    if (!form.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (form.password.length < 4) {
      newErrors.password = '비밀번호는 4자 이상 입력해주세요.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await boardService.insertBoard(form);
      alert('게시글이 등록되었습니다.');
      navigate(`/board/${response.result}`);
    } catch (err) {
      alert('게시글 등록에 실패했습니다.');
      console.error('Error inserting board:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    
    // 입력 시 해당 필드의 에러 제거
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleCancel = () => {
    if (form.title || form.content || form.writer) {
      if (confirm('작성 중인 내용이 있습니다. 정말 취소하시겠습니까?')) {
        navigate('/board');
      }
    } else {
      navigate('/board');
    }
  };

  return (
    <div className="board-write-container">
      <div className="board-header">
        <h1>게시글 작성</h1>
        <button onClick={handleCancel}>목록으로</button>
      </div>

      <form onSubmit={handleSubmit} className="write-form">
        <div className="form-group">
          <label htmlFor="title">제목 *</label>
          <input
            type="text"
            id="title"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="제목을 입력해주세요"
            disabled={loading}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <div className="error-message">{errors.title}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="writer">작성자 *</label>
          <input
            type="text"
            id="writer"
            value={form.writer}
            onChange={(e) => handleChange('writer', e.target.value)}
            placeholder="작성자명을 입력해주세요"
            disabled={loading}
            className={errors.writer ? 'error' : ''}
          />
          {errors.writer && <div className="error-message">{errors.writer}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호 *</label>
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="비밀번호를 입력해주세요 (4자 이상)"
            disabled={loading}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
          <div className="field-help">게시글 수정/삭제 시 사용됩니다.</div>
        </div>

        <div className="form-group">
          <label htmlFor="content">내용 *</label>
          <textarea
            id="content"
            value={form.content}
            onChange={(e) => handleChange('content', e.target.value)}
            placeholder="내용을 입력해주세요"
            rows={15}
            disabled={loading}
            className={errors.content ? 'error' : ''}
          />
          {errors.content && <div className="error-message">{errors.content}</div>}
        </div>

        <div className="form-buttons">
          <button type="button" onClick={handleCancel} disabled={loading}>
            취소
          </button>
          <button type="submit" disabled={loading}>
            {loading ? '등록 중...' : '등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write; 