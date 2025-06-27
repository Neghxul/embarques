// Basado en nuestro schema.prisma
export type OrderStatus = 
  | "PENDIENTE"
  | "EN_PREPARACION"
  | "LISTO_PARA_EMBARQUE"
  | "EMBARCADO"
  | "CONCLUIDO"
  | "CANCELADO";

export interface Order {
  id: string;
  consecutive: number;
  purchaseOrder?: string | null;
  invoice?: string | null;
  status: OrderStatus;
  customer: {
    name: string;
  };
  items: {
    product: {
      code: string;
    };
    quantity: number;
  }[];
  shipment?: {
    trackingNumber?: string | null;
    shippingProvider?: string | null;
  } | null;
}