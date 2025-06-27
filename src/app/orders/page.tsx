'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, LoaderCircle } from 'lucide-react';
import AppShell from "@/components/layout/AppShell";
import OrderModal from '@/components/orders/OrderModal'; 
import CustomerModal from '@/components/customers/CustomerModal';
import OrdersDisplay from "@/components/orders/OrdersDisplay";
import { Order, CustomerFormData } from '@/types';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [sellers, setSellers] = useState<{ id: string, name: string | null }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Partial<Order> | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [ordersRes, sellersRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/users?role=VENDEDOR')
      ]);
      const ordersData = await ordersRes.json();
      const sellersData = await sellersRes.json();
      setOrders(ordersData);
      setSellers(sellersData);
    } catch (error) { console.error("Fetch data error:", error);
    } finally { setIsLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenOrderModal = (order: Order | null = null) => { setSelectedOrder(order); setIsOrderModalOpen(true); };
  const handleCloseOrderModal = () => { setIsOrderModalOpen(false); setSelectedOrder(null); };

  const handleSaveCustomer = async (customerData: CustomerFormData) => {
    try {
      const response = await fetch('/api/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customerData),
      });
      if (response.status === 409) { throw new Error(await response.text()); }
      if (!response.ok) { throw new Error('Failed to save customer. Please try again.'); }
      console.log('Customer saved successfully!');
      setIsCustomerModalOpen(false);
    } catch (error: any) {
      console.error("Save customer error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleSaveOrder = async (orderData: any) => {
      const isNew = !orderData.id;
      if (!isNew) {
          alert("Editing is not yet implemented.");
          return;
      }
      
      try {
          if (!orderData.customerId || !orderData.sellerId || !orderData.items || orderData.items.length === 0) {
              throw new Error("Please select a customer, a seller, and add at least one product.");
          }

          // Prepare the payload. We are now sending the full item object
          // including 'code' and 'description' for the backend to process.
          const payload = {
              customerId: orderData.customerId,
              vendedorId: orderData.sellerId,
              purchaseOrder: orderData.purchaseOrder,
              invoice: orderData.invoice,
              rev: orderData.rev,
              status: orderData.status,
              items: orderData.items.map((item: any) => ({
                  code: item.code,
                  description: item.description,
                  quantity: item.quantity,
                  unitPrice: item.unitPrice,
              }))
          };

          const response = await fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
          });

          if (!response.ok) {
              const errorText = await response.text();
              throw new Error(errorText || 'Failed to save order.');
          }

          console.log('Order saved successfully!');
          handleCloseOrderModal();
          await fetchData(); // Refresh data to see the new order
      } catch (error: any) {
          console.error("Save order error:", error);
          alert(`Error: ${error.message}`);
      }
  };


  return (
    <AppShell>
      <OrderModal isOpen={isOrderModalOpen} onClose={handleCloseOrderModal} onSave={handleSaveOrder} initialData={selectedOrder} sellers={sellers} onOpenNewCustomer={() => setIsCustomerModalOpen(true)} />
      <CustomerModal isOpen={isCustomerModalOpen} onClose={() => setIsCustomerModalOpen(false)} onSave={handleSaveCustomer} sellers={sellers} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gemini-gray-300">Gestión de Pedidos</h1>
        <button onClick={() => handleOpenOrderModal()} className="flex items-center gap-2 bg-gemini-blue-dark text-white px-4 py-2 rounded-lg shadow-md hover:bg-gemini-blue transition-colors">
          <PlusCircle className="h-5 w-5" />
          <span>Nuevo Pedido</span>
        </button>
      </div>
      {isLoading ? ( <div className="flex justify-center items-center py-16"><LoaderCircle className="h-8 w-8 animate-spin text-gemini-blue" /></div> ) : ( <OrdersDisplay orders={orders} onEdit={handleOpenOrderModal} /> )}
    </AppShell>
  );
}
