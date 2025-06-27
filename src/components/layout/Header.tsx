// src/components/layout/Header.tsx
'use client';
import { Menu, Bell, User } from 'lucide-react';

interface HeaderProps { onMenuClick: () => void; }

const Header = ({ onMenuClick }: HeaderProps) => (
  <header className="h-16 bg-background border-b border-border flex items-center justify-between px-4 md:px-6">
    <div className="flex items-center gap-4">
      <button onClick={onMenuClick} className="md:hidden text-foreground-secondary" aria-label="Abrir menú">
        <Menu className="h-6 w-6" />
      </button>
    </div>
    <div className="flex items-center gap-4">
      <button className="relative text-foreground-secondary hover:text-foreground">
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-background"></span>
        <span className="sr-only">Notificaciones</span>
      </button>
      <button className="flex items-center gap-2 text-foreground-secondary hover:text-foreground">
        <User className="h-6 w-6 p-1 bg-background-light rounded-full" />
        <span className="sr-only">Perfil de usuario</span>
      </button>
    </div>
  </header>
);

export default Header;