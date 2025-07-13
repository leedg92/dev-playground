import { useState } from 'react';
import './PasswordModal.css';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  title: string;
  loading?: boolean;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  loading = false,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('비밀번호를 입력해주세요.');
      return;
    }
    setError('');
    onConfirm(password);
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">비밀번호:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
              disabled={loading}
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={handleClose} disabled={loading}>
              취소
            </button>
            <button type="submit" disabled={loading}>
              {loading ? '확인 중...' : '확인'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal; 