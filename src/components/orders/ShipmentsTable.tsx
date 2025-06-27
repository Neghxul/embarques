// src/components/embarques/ShipmentsTable.tsx
import { Order, OrderStatus } from "@/types";
import { MoreVertical } from "lucide-react";

// Componente para las "pastillas" de estado
const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const statusStyles: Record<OrderStatus, string> = {
    PENDIENTE: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
    EN_PREPARACION: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    LISTO_PARA_EMBARQUE: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300",
    EMBARCADO: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300",
    CONCLUIDO: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    CANCELADO: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  };

  return (
    <span
      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
};

interface ShipmentsTableProps {
  orders: Order[];
  onEdit: (order: Order) => void;
}

const ShipmentsTable = ({ orders, onEdit }: ShipmentsTableProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">#</th>
            <th scope="col" className="px-6 py-3">Cliente / OC</th>
            <th scope="col" className="px-6 py-3 hidden lg:table-cell">Factura</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell">Guía</th>
            <th scope="col" className="px-6 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{order.consecutive}</td>
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900 dark:text-white">{order.customer.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">OC: {order.purchaseOrder || 'N/A'}</div>
              </td>
              <td className="px-6 py-4 hidden lg:table-cell">{order.invoice || 'N/A'}</td>
              <td className="px-6 py-4">
                <StatusBadge status={order.status} />
              </td>
              <td className="px-6 py-4 hidden md:table-cell">
                <div className="font-medium">{order.shipment?.shippingProvider || 'N/A'}</div>
                <div className="text-xs">{order.shipment?.trackingNumber || 'Sin guía'}</div>
              </td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={() => onEdit(order)}
                  className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                  aria-label="Editar"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && <p className="text-center py-8 text-gray-500 dark:text-gray-400">No se encontraron embarques.</p>}
    </div>
  );
};

export default ShipmentsTable;