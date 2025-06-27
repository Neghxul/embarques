// src/components/pedidos/OrderModal.tsx
'use client';
import { useState, useEffect } from "react";
import { X, PlusCircle, Trash2, UserPlus } from "lucide-react";
import AutocompleteSearch from "@/components/ui/AutocompleteSearch";
import { Customer } from "@/types";

interface OrderModalProps { 
    isOpen: boolean; 
    onClose: () => void; 
    onSave: (orderData: any) => void; 
    initialData: any; 
    sellers: { id: string, name: string | null }[];
    onOpenNewCustomer: () => void;
}

export default function OrderModal({ isOpen, onClose, onSave, initialData, sellers, onOpenNewCustomer }: OrderModalProps) {
    const [formData, setFormData] = useState<any>({ items: [] });
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    useEffect(() => {
      if (initialData?.id && initialData.customer) { setSelectedCustomer(initialData.customer); } 
      else { setSelectedCustomer(null); }
      setFormData(initialData || { status: 'PENDIENTE', items: [] });
    }, [initialData]);

    if (!isOpen) return null;

    const handleCustomerSelect = (customer: Customer | null) => { // Can be null if cleared
        setSelectedCustomer(customer);
        setFormData((prev: any) => ({ ...prev, customerId: customer?.id }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleItemChange = (index: number, field: string, value: string) => {
        const newItems = [...formData.items];
        if (field === 'quantity' || field === 'unitPrice') {
          newItems[index][field] = value === '' ? '' : parseFloat(value);
        } else { newItems[index][field] = value; }
        setFormData((prev: any) => ({ ...prev, items: newItems }));
    };
    
    const addItem = () => { setFormData((prev: any) => ({ ...prev, items: [...(prev.items || []), { productId: '', quantity: 1, unitPrice: 0, code: '', description: '' }] })); };
    const removeItem = (index: number) => { setFormData((prev: any) => ({ ...prev, items: formData.items.filter((_: any, i: number) => i !== index) })); };
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
            <div className="bg-gemini-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-gemini-gray-700">
                <div className="flex justify-between items-center p-4 border-b border-gemini-gray-700">
                     <h3 className="text-xl font-semibold text-gemini-gray-300">{initialData?.id ? 'Edit Order' : 'New Order'}</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gemini-gray-700"><X className="h-5 w-5 text-gemini-gray-500" /></button>
                </div>
                <form id="order-modal-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="sellerId" className="block mb-2 text-sm font-medium text-gemini-gray-500">Seller</label>
                            <select name="sellerId" id="sellerId" onChange={handleChange} value={formData.sellerId || ''} className="w-full bg-gemini-gray-900 border border-gemini-gray-700 text-gemini-gray-300 text-sm rounded-lg p-2.5">
                                <option value="">Select a Seller</option>
                                {sellers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="customer" className="block mb-2 text-sm font-medium text-gemini-gray-500">Customer</label>
                            <div className="flex gap-2">
                                <AutocompleteSearch onSelect={handleCustomerSelect} searchApiUrl="/api/customers/search" placeholder="Search by customer name..." initialName={selectedCustomer?.name} />
                                <button type="button" onClick={onOpenNewCustomer} className="p-2.5 bg-gemini-gray-700 rounded-lg hover:bg-gemini-gray-600"><UserPlus className="h-5 w-5 text-gemini-blue" /></button>
                            </div>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gemini-gray-900/50 rounded-lg">
                        <div><p className="text-sm text-gemini-gray-500">Address:</p><p className="text-gemini-gray-400 truncate">{selectedCustomer?.address || '...'}</p></div>
                        <div><p className="text-sm text-gemini-gray-500">Phone:</p><p className="text-gemini-gray-400">{selectedCustomer?.phone || '...'}</p></div>
                        <div><p className="text-sm text-gemini-gray-500">Contact:</p><p className="text-gemini-gray-400">{selectedCustomer?.contactName || '...'}</p></div>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="rev" onChange={handleChange} value={formData.rev || ''} placeholder="REV" className="bg-gemini-gray-900 border border-gemini-gray-700 text-gemini-gray-300 text-sm rounded-lg p-2.5" />
                        <input name="invoice" onChange={handleChange} value={formData.invoice || ''} placeholder="Invoice" className="bg-gemini-gray-900 border border-gemini-gray-700 text-gemini-gray-300 text-sm rounded-lg p-2.5" />
                     </div>
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gemini-gray-300 border-b border-gemini-gray-700 pb-2">Products</h4>
                        {(formData.items || []).map((item: any, index: number) => (
                            <div key={index} className="grid grid-cols-12 gap-2 items-center">
                                <input value={item.code} onChange={(e) => handleItemChange(index, 'code', e.target.value)} placeholder="Code" className="col-span-2 bg-gemini-gray-900 border border-gemini-gray-700 p-2 rounded-md" />
                                <input value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} placeholder="Description" className="col-span-4 bg-gemini-gray-900 border border-gemini-gray-700 p-2 rounded-md" />
                                <input placeholder="Stock" disabled className="col-span-1 bg-gemini-gray-700 border-none p-2 rounded-md text-center" />
                                <input type="number" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} placeholder="QTY" className="col-span-2 bg-gemini-gray-900 border border-gemini-gray-700 p-2 rounded-md text-center" />
                                <input type="number" value={item.unitPrice} onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)} placeholder="Cost" className="col-span-2 bg-gemini-gray-900 border border-gemini-gray-700 p-2 rounded-md text-right" />
                                <button type="button" onClick={() => removeItem(index)} className="col-span-1 text-red-400 hover:text-red-300 p-2"><Trash2 className="h-5 w-5" /></button>
                            </div>
                        ))}
                        <button type="button" onClick={addItem} className="flex items-center gap-2 text-sm text-gemini-blue hover:text-gemini-blue-dark"> <PlusCircle className="h-5 w-5" /> Add Product </button>
                    </div>
                </form>
                <div className="p-4 border-t border-gemini-gray-700 flex justify-end space-x-3">
                    <button type="button" onClick={onClose} className="bg-gemini-gray-700 hover:bg-gemini-gray-600 text-gemini-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">Cancel</button>
                    <button type="submit" form="order-modal-form" className="text-white bg-gemini-blue-dark hover:bg-gemini-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save Order</button>
                </div>
            </div>
        </div>
    );
}