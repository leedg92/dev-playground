import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.layout + (sidebarOpen ? '' : ' ' + styles.sidebarClosed)}>
      <Header onToggleSidebar={() => setSidebarOpen((x) => !x)} />
      <Sidebar open={sidebarOpen} />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
