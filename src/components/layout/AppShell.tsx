// src/components/layout/AppShell.tsx
'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Esta es la versión móvil del Sidebar
  const MobileSidebar = () => (
    <div
      className={`fixed inset-0 z-30 bg-gray-900 bg-opacity-50 transition-opacity md:hidden ${
        isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => setIsSidebarOpen(false)}
    >
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 z-40 transform transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()} // Evita que el clic se propague al fondo
      >
        <Sidebar />
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar para Desktop */}
      <Sidebar />
      
      {/* Sidebar para Móvil */}
      <MobileSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;