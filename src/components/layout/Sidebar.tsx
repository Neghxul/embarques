// src/components/layout/Sidebar.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Ship, Package, Users, Home, FileText } from 'lucide-react';

// Componente de navegación individual para reutilizar
type NavItemProps = {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  isActive?: boolean;
};

const NavItem = ({ href, icon: Icon, label, isActive = false }: NavItemProps) => (
  <li>
    <Link href={href}>
      <div
        className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
          isActive
            ? 'bg-accent text-accent-foreground font-semibold'
            : 'text-foreground-secondary hover:bg-background-light hover:text-foreground'
        }`}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </div>
    </Link>
  </li>
);

const Sidebar = () => {
  // En un futuro, el `pathname` determinará cuál está activo
  // const pathname = usePathname();
  return (
    <aside className="h-full w-64 bg-gemini-gray-800 border-r border-gemini-gray-700 flex-col hidden md:flex">
      <div className="h-16 flex items-center px-5">
        <Link href="/" className="flex items-center gap-2">
          <Ship className="h-7 w-7 text-gemini-blue" />
          <span className="text-xl font-bold text-gemini-gray-300">
            Gestión
          </span>
        </Link>
      </div>
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          <NavItem href="/orders" icon={FileText} label="Pedidos" />
          <NavItem href="/embarques" icon={Ship} label="Embarques" />
          <NavItem href="/clientes" icon={Users} label="Clientes" />
          <NavItem href="/productos" icon={Package} label="Productos" />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;