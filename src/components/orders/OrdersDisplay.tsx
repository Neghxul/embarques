'use client';
import { Order, OrderStatus } from "@/types";
import { MoreVertical } from "lucide-react";
import OrderCard from "./OrderCard";

export const StatusBadge = ({ status }: { status: OrderStatus }) => {
    const statusStyles: Record<OrderStatus, string> = {
        PENDIENTE: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
        EN_PREPARACION: "bg-sky-400/10 text-sky-400 border-sky-400/20",
        LISTO_PARA_EMBARQUE: "bg-cyan-400/10 text-cyan-400 border-cyan-400/20",
        EMBARCADO: "bg-indigo-400/10 text-indigo-400 border-indigo-400/20",
        CONCLUIDO: "bg-green-400/10 text-green-400 border-green-400/20",
        CANCELADO: "bg-red-400/10 text-red-400 border-red-400/20",
    };
    return ( <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${statusStyles[status]}`}> {status.replace(/_/g, ' ')} </span> );
};

interface OrdersDisplayProps { orders: Order[]; onEdit: (order: Order) => void; }

const OrdersDisplay = ({ orders, onEdit }: OrdersDisplayProps) => (
  <div>
    <div className="hidden md:block bg-gemini-gray-800 rounded-lg border border-gemini-gray-700 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="text-xs text-gemini-gray-500 uppercase">
          <tr>
            <th className="px-6 py-4">#</th><th className="px-6 py-4">Customer / PO</th><th className="px-6 py-4">Invoice</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gemini-gray-700">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gemini-gray-900/50">
              <td className="px-6 py-3 font-bold text-gemini-gray-300">{order.consecutive}</td>
              <td className="px-6 py-3"><div className="font-medium text-gemini-gray-300">{order.customer.name}</div><div className="text-xs text-gemini-gray-500">PO: {order.purchaseOrder || 'N/A'}</div></td>
              <td className="px-6 py-3 text-gemini-gray-400">{order.invoice || 'N/A'}</td>
              <td className="px-6 py-3"><StatusBadge status={order.status} /></td>
              <td className="px-6 py-3 text-right"><button onClick={() => onEdit(order)} className="p-2 rounded-md hover:bg-gemini-gray-700"><MoreVertical className="h-5 w-5 text-gemini-gray-500" /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="md:hidden grid grid-cols-1 gap-4">{orders.map((order) => <OrderCard key={order.id} order={order} onEdit={onEdit} />)}</div>
    {orders.length === 0 && <div className="text-center py-16 text-gemini-gray-500">No orders found.</div>}
  </div>
);

export default OrdersDisplay;