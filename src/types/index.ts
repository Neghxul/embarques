// This file defines the core data structures for the application.

export type OrderStatus = "PENDIENTE" | "EN_PREPARACION" | "LISTO_PARA_EMBARQUE" | "EMBARCADO" | "CONCLUIDO" | "CANCELADO";

// The Customer interface is now correctly defined and exported.
export interface Customer { 
  id: string; 
  name: string; 
  address?: string | null; 
  phone?: string | null; 
  contactName?: string | null;
}

export interface OrderItem { 
  id: string; 
  quantity: number; 
  unitPrice: number; 
  productId: string; 
  product: { 
    code: string; 
    description: string; 
  };
}

export interface Order { 
  id: string; 
  consecutive: number; 
  purchaseOrder?: string | null; 
  invoice?: string | null; 
  status: OrderStatus; 
  customer: Customer; 
  items: OrderItem[]; 
  shipment?: { 
    trackingNumber?: string | null; 
    shippingProvider?: string | null; 
  } | null;
}

export interface CustomerFormData { 
  name: string; 
  email: string | null; 
  phone: string | null; 
  address: string | null; 
  vendedorId: string;
}
