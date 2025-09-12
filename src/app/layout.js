'use client';
import '../styles/globals.css';
import '../styles/layout.css';
import React, { useState, useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { store } from '../redux/store';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

// Component to monitor auth state (no redirect on refresh)
function AuthMonitor() {
  const user = useSelector((state) => state.login.user);

  return null; // This component doesn't render anything
}

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <AuthMonitor />
          <Header />
          <div className="layout" style={{ display: 'flex', paddingTop: 64 }}>
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
            <main
              className="main-content"
              style={{
                flexGrow: 1,
                padding: 0,
                marginLeft: sidebarOpen ? 10 : 10,
                transition: 'margin-left 0.3s ease',
              }}
            >
              {children}
            </main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
