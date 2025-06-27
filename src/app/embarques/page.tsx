// src/app/embarques/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, LoaderCircle } from 'lucide-react';
import AppShell from "@/components/layout/AppShell";
import ShipmentsDisplay from "@/components/embarques/ShipmentsDisplay";
import ShipmentModal from '@/components/embarques/ShipmentModal';
import { Order } from '@/types';

export default function EmbarquesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Partial<Order> | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
      // Aquí podrías mostrar una notificación de error al usuario
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOpenModal = (order: Order | null = null) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleSaveOrder = async (orderData: Partial<Order>) => {
    const isNew = !orderData.id;
    const url = isNew ? '/api/orders' : `/api/orders/${orderData.id}`;
    const method = isNew ? 'POST' : 'PUT';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) throw new Error('Failed to save');
      
      handleCloseModal();
      await fetchOrders(); // Recargar los datos para ver los cambios
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppShell>
      <ShipmentModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveOrder}
        initialData={selectedOrder}
      />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          Gestión de Embarques
        </h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-md hover:bg-accent/90 transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Nuevo Embarque</span>
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <LoaderCircle className="h-8 w-8 animate-spin text-accent" />
        </div>
      ) : (
        <ShipmentsDisplay orders={orders} onEdit={handleOpenModal} />
      )}
      
    </AppShell>
  );
}