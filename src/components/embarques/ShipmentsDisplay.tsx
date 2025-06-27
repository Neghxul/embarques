// src/components/embarques/ShipmentsDisplay.tsx
import { Order, OrderStatus } from "@/types";
import { MoreVertical } from "lucide-react";
import ShipmentCard from "./ShipmentCard";

export const StatusBadge = ({ status }: { status: OrderStatus }) => {
    // Mismos estilos que antes, pero con la nueva paleta
    const statusStyles: Record<OrderStatus, string> = {
        PENDIENTE: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
        EN_PREPARACION: "bg-sky-400/10 text-sky-400 border-sky-400/20",
        LISTO_PARA_EMBARQUE: "bg-cyan-400/10 text-cyan-400 border-cyan-400/20",
        EMBARCADO: "bg-indigo-400/10 text-indigo-400 border-indigo-400/20",
        CONCLUIDO: "bg-green-400/10 text-green-400 border-green-400/20",
        CANCELADO: "bg-red-400/10 text-red-400 border-red-400/20",
    };
    return ( <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${statusStyles[status]}`}> {status.replace(/_/g, ' ')} </span> );
};

interface ShipmentsDisplayProps {
  orders: Order[];
  onEdit: (order: Order) => void;
}

const ShipmentsDisplay = ({ orders, onEdit }: ShipmentsDisplayProps) => {
  return (
    <div>
      {/* Vista de Tabla para Desktop */}
      <div className="hidden md:block bg-background-light rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-foreground-secondary uppercase">
            <tr>
              <th scope="col" className="px-6 py-4">#</th>
              <th scope="col" className="px-6 py-4">Cliente / OC</th>
              <th scope="col" className="px-6 py-4">Factura</th>
              <th scope="col" className="px-6 py-4">Status</th>
              <th scope="col" className="px-6 py-4">Guía</th>
              <th scope="col" className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-background">
                <td className="px-6 py-4 font-bold text-foreground">{order.consecutive}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground">{order.customer.name}</div>
                  <div className="text-xs text-foreground-secondary">OC: {order.purchaseOrder || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 text-foreground-secondary">{order.invoice || 'N/A'}</td>
                <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                <td className="px-6 py-4">
                    <div className="font-medium text-foreground-secondary">{order.shipment?.shippingProvider || 'N/A'}</div>
                    <div className="text-xs text-foreground-secondary">{order.shipment?.trackingNumber || 'Sin guía'}</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => onEdit(order)} className="p-2 rounded-md hover:bg-border"><MoreVertical className="h-5 w-5 text-foreground-secondary" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista de Cards para Móvil */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <ShipmentCard key={order.id} order={order} onEdit={onEdit} />
        ))}
      </div>

       {orders.length === 0 && <div className="text-center py-16 text-foreground-secondary">No se encontraron embarques.</div>}
    </div>
  );
};

export default ShipmentsDisplay;