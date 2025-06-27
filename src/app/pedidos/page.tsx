// src/app/pedidos/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { PlusCircle, LoaderCircle } from 'lucide-react';
import AppShell from "@/components/layout/AppShell";
import OrdersDisplay from "@/components/pedidos/OrdersDisplay"; // Importación actualizada
import OrderModal from '@/components/pedidos/OrderModal'; // Importación actualizada
import { Order } from '@/types';

export default function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Partial<Order> | null>(null);

  // La lógica de fetch, open/close modal, y save se mantiene muy similar
  // pero apuntará a las nuevas URLs si es necesario y manejará los nuevos datos.

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleOpenModal = (order: Order | null = null) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedOrder(null); };

  const handleSaveOrder = async (orderData: Partial<Order>) => {
      // La lógica de guardado necesita ser actualizada para manejar la nueva estructura de datos
      console.log("Saving order data:", orderData);
      handleCloseModal();
      // await fetchOrders(); // Recargar datos después de guardar
  };

  return (
    <AppShell>
      <OrderModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveOrder}
        initialData={selectedOrder}
      />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gemini-gray-300">
          Gestión de Pedidos
        </h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-gemini-blue-dark text-white px-4 py-2 rounded-lg shadow-md hover:bg-gemini-blue transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Nuevo Pedido</span>
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <LoaderCircle className="h-8 w-8 animate-spin text-gemini-blue" />
        </div>
      ) : (
        // Asegúrate de que OrdersDisplay exista y esté actualizado
        // <OrdersDisplay orders={orders} onEdit={handleOpenModal} />
        <p className="text-center text-gemini-gray-500">El componente OrdersDisplay se construirá a continuación.</p>
      )}
      
    </AppShell>
  );
}