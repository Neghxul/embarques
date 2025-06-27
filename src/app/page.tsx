// src/app/page.tsx
import AppShell from "@/components/layout/AppShell";

export default function HomePage() {
  return (
    <AppShell>
      {/* El contenido específico de la página va aquí */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Bienvenido al Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aquí verás un resumen de los embarques pendientes, estadísticas clave y accesos directos.
        </p>
        {/* Próximamente: Gráficas y KPIs */}
      </div>
    </AppShell>
  );
}