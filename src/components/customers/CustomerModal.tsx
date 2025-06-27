'use client';
import { useState } from "react";
import { X } from "lucide-react";

interface CustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (customerData: any) => Promise<void>;
    sellers: { id: string, name: string | null }[];
}

const CustomerModal = ({ isOpen, onClose, onSave, sellers }: CustomerModalProps) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', vendedorId: '' });
    const [error, setError] = useState('');

    if (!isOpen) return null;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setError('');
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.vendedorId) {
            setError('Customer name and seller are required.');
            return;
        }
        await onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-[60] flex justify-center items-center p-4 backdrop-blur-sm">
            <div className="bg-gemini-gray-800 rounded-lg shadow-xl w-full max-w-lg flex flex-col border border-gemini-gray-700">
                <div className="flex justify-between items-center p-4 border-b border-gemini-gray-700">
                    <h3 className="text-xl font-semibold text-gemini-gray-300">New Customer</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gemini-gray-700"><X className="h-5 w-5 text-gemini-gray-500" /></button>
                </div>
                <form id="customer-modal-form" onSubmit={handleSubmit} className="p-6 space-y-4">
                     <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gemini-gray-500">Customer / Company Name</label>
                        <input type="text" name="name" id="name" onChange={handleChange} required className="w-full bg-gemini-gray-900 border border-gemini-gray-700 text-gemini-gray-300 text-sm rounded-lg p-2.5"/>
                    </div>
                     <div>
                        <label htmlFor="vendedorId" className="block mb-2 text-sm font-medium text-gemini-gray-500">Assign to Seller</label>
                        <select name="vendedorId" id="vendedorId" onChange={handleChange} required className="w-full bg-gemini-gray-900 border border-gemini-gray-700 text-gemini-gray-300 text-sm rounded-lg p-2.5">
                           <option value="">-- Select a Seller --</option>
                           {sellers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input name="email" onChange={handleChange} placeholder="Contact Email" className="bg-gemini-gray-900 border border-gemini-gray-700 text-gemini-gray-300 text-sm rounded-lg p-2.5"/>
                        <input name="phone" onChange={handleChange} placeholder="Phone Number" className="bg-gemini-gray-900 border border-gemini-gray-700 text-gemini-gray-300 text-sm rounded-lg p-2.5"/>
                    </div>
                    <input name="address" onChange={handleChange} placeholder="Full Address" className="w-full bg-gemini-gray-900 border border-gemini-gray-700 text-gemini-gray-300 text-sm rounded-lg p-2.5"/>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                </form>
                <div className="p-4 border-t border-gemini-gray-700 flex justify-end">
                    <button type="submit" form="customer-modal-form" className="text-white bg-gemini-blue-dark hover:bg-gemini-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save Customer</button>
                </div>
            </div>
        </div>
    );
};

export default CustomerModal;