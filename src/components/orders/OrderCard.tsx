'use client';
import { Order } from "@/types";
import { MoreVertical } from 'lucide-react';
import { StatusBadge } from "./OrdersDisplay";

interface OrderCardProps { order: Order; onEdit: (order: Order) => void; }

const OrderCard = ({ order, onEdit }: OrderCardProps) => (
  <div className="bg-gemini-gray-800 rounded-lg p-4 border border-gemini-gray-700">
    <div className="flex justify-between items-start mb-3">
      <div>
        <p className="font-bold text-lg text-gemini-gray-300">{order.customer.name}</p>
        <p className="text-xs text-gemini-gray-500">Order #{order.consecutive}</p>
      </div>
      <button onClick={() => onEdit(order)} className="p-2 -mr-2 -mt-2 rounded-md hover:bg-gemini-gray-700"><MoreVertical className="h-5 w-5 text-gemini-gray-500" /></button>
    </div>
    <dl className="space-y-1 mb-4 text-sm">
      <div className="flex justify-between"><dt className="text-gemini-gray-500">PO:</dt><dd className="font-medium text-gemini-gray-400">{order.purchaseOrder || 'N/A'}</dd></div>
      <div className="flex justify-between"><dt className="text-gemini-gray-500">Invoice:</dt><dd className="font-medium text-gemini-gray-400">{order.invoice || 'N/A'}</dd></div>
    </dl>
    <div className="flex justify-end"><StatusBadge status={order.status} /></div>
  </div>
);

export default OrderCard;