import React from 'react';
import styles from './MainLayout.css';
import Header from './Header'


function MainLayout({children,location}) {
  return (
    <div className={styles.normal}>
      <Header location={location}></Header>
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
        </div>
      </div>
      Component: MainLayout
    </div>
  );
}

export default MainLayout;