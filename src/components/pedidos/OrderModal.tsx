// src/components/pedidos/OrderModal.tsx
'use client';
import { Order, OrderStatus, OrderItem as OrderItemType } from "@/types";
import { useEffect, useState } from "react";
import { X, PlusCircle, Trash2, UserPlus } from "lucide-react";

interface OrderModalProps { isOpen: boolean; onClose: () => void; onSave: (orderData: any) => void; initialData: Partial<Order> | null; }

const OrderModal = ({ isOpen, onClose, onSave, initialData }: OrderModalProps) => {
    const [formData, setFormData] = useState<any>({ items: [] });

    useEffect(() => {
        setFormData(initialData || { status: 'PENDIENTE', items: [] });
    }, [initialData]);

    if (!isOpen) return null;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [name]: e.target.value }));
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;
        setFormData(prev => ({ ...prev, items: newItems }));
    };
    
    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { productId: '', quantity: 1, unitPrice: 0, code: '', description: '' }]
        }));
    };
    
    const removeItem = (index) => {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, items: newItems }));
    };

    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
            <div className="bg-gemini-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-gemini-gray-700">
                <div className="flex justify-between items-center p-4 border-b border-gemini-gray-700">
                    <h3 className="text-xl font-semibold text-gemini-gray-300">{initialData?.id ? 'Editar Pedido' : 'Nuevo Pedido'}</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gemini-gray-700"><X className="h-5 w-5 text-gemini-gray-500" /></button>
                </div>
                
                <form id="order-modal-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Sección de Cliente y Vendedor */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="vendedor" className="block mb-2 text-sm font-medium text-gemini-gray-500">Vendedor</label>
                            <select name="vendedorId" id="vendedor" onChange={handleChange} className="w-full bg-gemini-gray-900 border border-gemini-gray-700 text-gemini-gray-300 text-sm rounded-lg p-2.5">
                                {/* Opciones de Vendedores se cargarán aquí */}
                                <option value="">Seleccionar Vendedor</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="cliente" className="block mb-2 text-sm font-medium text-gemini-gray-500">Cliente</label>
                            <div className="flex gap-2">
                                <input type="text" placeholder="Buscar cliente por nombre..." className="w-full bg-gemini-gray-900 border border-gemini-gray-700 text-gemini-gray-300 text-sm rounded-lg p-2.5" />
                                <button type="button" className="p-2.5 bg-gemini-gray-700 rounded-lg hover:bg-gemini-gray-600"><UserPlus className="h-5 w-5 text-gemini-blue" /></button>
                            </div>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gemini-gray-900/50 rounded-lg">
                        <div><p className="text-sm text-gemini-gray-500">Dirección:</p><p className="text-gemini-gray-400">...</p></div>
                        <div><p className="text-sm text-gemini-gray-500">Teléfono:</p><p className="text-gemini-gray-400">...</p></div>
                        <div><p className="text-sm text-gemini-gray-500">Contacto:</p><p className="text-gemini-gray-400">...</p></div>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="rev" onChange={handleChange} placeholder="REV" className="bg-gemini-gray-900 border border-gemini-gray-700 text-gemini-gray-300 text-sm rounded-lg p-2.5" />
                        <input name="invoice" onChange={handleChange} placeholder="Factura" className="bg-gemini-gray-900 border border-gemini-gray-700 text-gemini-gray-300 text-sm rounded-lg p-2.5" />
                     </div>
                    
                    {/* Sección de Productos */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gemini-gray-300 border-b border-gemini-gray-700 pb-2">Productos</h4>
                        {formData.items.map((item, index) => (
                            <div key={index} className="grid grid-cols-12 gap-2 items-center">
                                <input placeholder="Código" className="col-span-3 bg-gemini-gray-900 border border-gemini-gray-700 p-2 rounded-md" />
                                <input placeholder="Descripción" disabled className="col-span-4 bg-gemini-gray-700 border-none p-2 rounded-md" />
                                <input placeholder="Stock" disabled className="col-span-1 bg-gemini-gray-700 border-none p-2 rounded-md text-center" />
                                <input type="number" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} placeholder="QTY" className="col-span-1 bg-gemini-gray-900 border border-gemini-gray-700 p-2 rounded-md text-center" />
                                <input type="number" value={item.unitPrice} onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)} placeholder="Costo" className="col-span-2 bg-gemini-gray-900 border border-gemini-gray-700 p-2 rounded-md text-right" />
                                <button type="button" onClick={() => removeItem(index)} className="col-span-1 text-red-400 hover:text-red-300 p-2"><Trash2 className="h-5 w-5" /></button>
                            </div>
                        ))}
                        <button type="button" onClick={addItem} className="flex items-center gap-2 text-sm text-gemini-blue hover:text-gemini-blue-dark">
                            <PlusCircle className="h-5 w-5" /> Agregar Producto
                        </button>
                    </div>

                </form>
                <div className="p-4 border-t border-gemini-gray-700 flex justify-end space-x-3">
                    <button type="button" onClick={onClose} className="bg-gemini-gray-700 hover:bg-gemini-gray-600 text-gemini-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">Cancelar</button>
                    <button type="submit" form="order-modal-form" className="text-white bg-gemini-blue-dark hover:bg-gemini-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center">Guardar Pedido</button>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;