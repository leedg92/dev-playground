import React from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <button className={styles.menuBtn} onClick={onToggleSidebar}>
        ☰
      </button>
      <span className={styles.logo} onClick={() => navigate('/')}>
        개인 개발 실험실
      </span>
    </header>
  );
};

export default Header;
