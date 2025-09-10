'use client';
import '../styles/globals.css';
import '../styles/layout.css';
import React, { useState } from 'react';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
}
