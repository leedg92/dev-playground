import React from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const menuItems = [
    { id: 'dashboard', name: '대시보드', icon: '📊' },
    { id: 'board', name: '게시판', icon: '📝' },
    { id: 'news-learning', name: '뉴스 학습기', icon: '📰' },
    { id: 'bookmark', name: '북마크 관리', icon: '🔖' },
    { id: 'elasticsearch', name: '엘라스틱서치', icon: '🔍' },
  ];

  return (
    <aside className={open ? styles.sidebar : styles.sidebarClosed}>
      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.id} className={styles.menuItem}>
              <a href={`/${item.id}`} className={styles.menuLink}>
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.menuText}>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
