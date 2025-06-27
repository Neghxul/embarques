'use client';
import { Order, OrderStatus } from "@/types";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ShipmentModalProps { isOpen: boolean; onClose: () => void; onSave: (orderData: Partial<Order>) => void; initialData: Partial<Order> | null; }

const ShipmentModal = ({ isOpen, onClose, onSave, initialData }: ShipmentModalProps) => {
    // El código de estado y manejo de formulario es el mismo
    const [formData, setFormData] = useState<Partial<Order>>({});
    useEffect(() => { setFormData(initialData || { status: 'PENDIENTE' }); }, [initialData]);
    if (!isOpen) return null;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
            <div className="bg-background rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-border">
                <div className="flex justify-between items-center p-4 border-b border-border">
                    <h3 className="text-xl font-semibold text-foreground">{initialData?.id ? 'Editar Embarque' : 'Nuevo Embarque'}</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-background-light"><X className="h-5 w-5 text-foreground-secondary" /></button>
                </div>
                <form id="modal-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Inputs */}
                        <div>
                            <label htmlFor="purchaseOrder" className="block mb-2 text-sm font-medium text-foreground-secondary">Orden de Compra (OC)</label>
                            <input type="text" name="purchaseOrder" id="purchaseOrder" onChange={handleChange} value={formData.purchaseOrder || ''} className="bg-background-light border border-border text-foreground text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5"/>
                        </div>
                        <div>
                            <label htmlFor="invoice" className="block mb-2 text-sm font-medium text-foreground-secondary">Factura</label>
                            <input type="text" name="invoice" id="invoice" onChange={handleChange} value={formData.invoice || ''} className="bg-background-light border border-border text-foreground text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5"/>
                        </div>
                         <div>
                            <label htmlFor="status" className="block mb-2 text-sm font-medium text-foreground-secondary">Status</label>
                            <select name="status" id="status" onChange={handleChange} value={formData.status || 'PENDIENTE'} className="bg-background-light border border-border text-foreground text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5">
                                {(Object.keys({ PENDIENTE: "", EN_PREPARACION: "", LISTO_PARA_EMBARQUE: "", EMBARCADO: "", CONCLUIDO: "", CANCELADO: "" }) as OrderStatus[]).map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                            </select>
                         </div>
                    </div>
                </form>
                <div className="p-4 border-t border-border flex justify-end space-x-3 bg-background-light/50 rounded-b-lg">
                    <button type="button" onClick={onClose} className="bg-background-light hover:bg-border text-foreground font-medium rounded-lg text-sm px-5 py-2.5">Cancelar</button>
                    <button type="submit" form="modal-form" className="text-white bg-accent hover:bg-accent/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Guardar Cambios</button>
                </div>
            </div>
        </div>
    );
};
export default ShipmentModal;