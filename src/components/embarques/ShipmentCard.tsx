// src/components/embarques/ShipmentCard.tsx
import { Order } from "@/types";
import { MoreVertical, User, Hash, FileText, Truck } from 'lucide-react';
import { StatusBadge } from "./ShipmentsDisplay"; // Importaremos StatusBadge desde el display

interface ShipmentCardProps {
  order: Order;
  onEdit: (order: Order) => void;
}

import { ComponentType } from "react";

interface CardRowProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string | undefined | null;
}

const CardRow = ({ icon: Icon, label, value }: CardRowProps) => (
  <div className="flex items-center justify-between text-sm">
    <dt className="flex items-center gap-2 text-foreground-secondary">
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </dt>
    <dd className="font-medium text-foreground">{value || 'N/A'}</dd>
  </div>
);

const ShipmentCard = ({ order, onEdit }: ShipmentCardProps) => {
  return (
    <div className="bg-background-light rounded-lg shadow-md p-4 border border-border">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-bold text-lg text-foreground">{order.customer.name}</p>
          <p className="text-xs text-foreground-secondary">Pedido #{order.consecutive}</p>
        </div>
        <button
          onClick={() => onEdit(order)}
          className="p-2 -mr-2 -mt-2 rounded-md hover:bg-border"
          aria-label="Editar"
        >
          <MoreVertical className="h-5 w-5 text-foreground-secondary" />
        </button>
      </div>
      <dl className="space-y-2 mb-4">
        <CardRow icon={User} label="OC Cliente" value={order.purchaseOrder} />
        <CardRow icon={FileText} label="Factura" value={order.invoice} />
        <CardRow icon={Truck} label="Guía" value={order.shipment?.trackingNumber} />
      </dl>
      <div className="flex justify-end">
        <StatusBadge status={order.status} />
      </div>
    </div>
  );
};

export default ShipmentCard;