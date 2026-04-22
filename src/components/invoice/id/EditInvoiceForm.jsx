import React, { useEffect, useRef, useState } from 'react';
import { FormInput } from '../../helper/FormInput';
import { useInvoices } from '../../../context/InvoiceContext';

export default function EditInvoiceForm({ isOpen, setIsOpen, initialData, onItemAdded }) {
    const { updateInvoice } = useInvoices();
    const [formData, setFormData] = useState(initialData);
    const [scrollTrigger, setScrollTrigger] = useState(0);
    const [errors, setErrors] = useState({});

    // NEW: Track the ID of the most recently added item to focus it
    const [lastAddedItemId, setLastAddedItemId] = useState(null);
    const newItemRef = useRef(null);
    const sidePanelRef = useRef(null);




    useEffect(() => {
        if (initialData) setFormData(initialData);
    }, [initialData, isOpen]);




    useEffect(() => {
        if (isOpen && sidePanelRef.current) {
            sidePanelRef.current.scrollTo(0, 0);
        }
    }, [isOpen]);




    // Combined Scroll and Auto-Focus Logic
    useEffect(() => {
        if (scrollTrigger > 0 && sidePanelRef.current) {
            // 1. Scroll to bottom
            sidePanelRef.current.scrollTo({
                top: sidePanelRef.current.scrollHeight,
                behavior: 'smooth'
            });

            // 2. Focus the new input
            // We use a tiny timeout to wait for the smooth scroll to finish/DOM to settle
            const focusTimeout = setTimeout(() => {
                if (newItemRef.current) {
                    newItemRef.current.focus();
                }
            }, 100);

            return () => clearTimeout(focusTimeout);
        }
    }, [scrollTrigger, lastAddedItemId]); // Trigger when count or ID changes




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleItemChange = (id, e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === id ? { ...item, [name]: name === 'name' ? value : Number(value) } : item
            )
        }));
        if (errors.itemErrors) {
            setErrors(prev => ({ ...prev, itemErrors: null }));
        }
    };

    const addNewItem = () => {
        const newId = Math.random(); // Generate ID first
        setScrollTrigger(prev => prev + 1);
        setLastAddedItemId(newId); // Save ID for the Ref logic

        const newItem = {
            id: newId,
            name: '',
            qty: 1,
            price: 0
        };

        setFormData(prev => ({
            ...prev,
            items: [...prev.items, newItem]
        }));

        if (onItemAdded) onItemAdded();
    };

    const deleteItem = (id) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id)
        }));
    };

    const validateForm = () => {
        let tempErrors = {};
        const requiredFields = [
            'senderStreet', 'senderCity', 'senderPostCode', 'senderCountry',
            'clientName', 'clientEmail', 'clientStreet', 'clientCity',
            'clientPostCode', 'clientCountry', 'projectDescription'
        ];

        requiredFields.forEach(field => {
            if (!formData[field] || String(formData[field]).trim() === "") {
                tempErrors[field] = "can't be empty";
            }
        });

        if (formData.items.length === 0) {
            tempErrors.items = "An item must be added";
        } else {
            const itemErrors = [];
            formData.items.forEach((item, index) => {
                const errorObj = {};
                if (!item.name.trim()) errorObj.name = "can't be empty";
                if (item.qty <= 0) errorObj.qty = "error";
                if (item.price <= 0) errorObj.price = "error";
                if (Object.keys(errorObj).length > 0) itemErrors[index] = errorObj;
            });
            if (itemErrors.length > 0) tempErrors.itemErrors = itemErrors;
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const newTotal = formData.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
            const finalData = { ...formData, total: newTotal };
            updateInvoice(formData.id, finalData);
            setIsOpen(false);
        }
    };

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />

            <aside
                ref={sidePanelRef}
                className={`fixed top-0 left-0 h-full lg:left-[103px] w-full max-w-[719px] bg-white dark:bg-[#141625] z-50 transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto custom-scrollbar`}
            >
                <div className="p-8 md:p-14 pb-32">
                    <h2 className="text-2xl font-bold text-[#0C0E17] dark:text-white mb-12 uppercase">
                        Edit <span className="text-[#888EB0]">#</span>{formData?.id}
                    </h2>

                    <form className="flex flex-col gap-12" noValidate onSubmit={handleSaveChanges}>
                        {/* Bill From & To Sections (Condensed for brevity, same as yours) */}
                        <fieldset className="flex flex-col gap-6 border-none p-0">
                            <legend className="text-purple-main font-bold text-[13px] mb-6 uppercase tracking-wider">Bill From</legend>
                            <FormInput label="Street Address" name="senderStreet" value={formData?.senderStreet} onChange={handleChange} error={errors.senderStreet} />
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <FormInput label="City" name="senderCity" value={formData?.senderCity} onChange={handleChange} error={errors.senderCity} />
                                <FormInput label="Post Code" name="senderPostCode" value={formData?.senderPostCode} onChange={handleChange} error={errors.senderPostCode} />
                                <FormInput label="Country" name="senderCountry" value={formData?.senderCountry} onChange={handleChange} error={errors.senderCountry} gridClass="col-span-2 md:col-span-1" />
                            </div>
                        </fieldset>

                        {/* Item List Section */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[#777f98] font-bold text-lg tracking-tighter">Item List</h3>
                            <div className="flex flex-col gap-12 md:gap-4">
                                {formData?.items?.map((item, index) => (
                                    <div key={item.id} className="grid grid-cols-2 md:grid-cols-[3fr_1fr_2fr_1fr_auto] gap-4 items-end animate-fadeIn">
                                        <div className="col-span-2 md:col-span-1">
                                            <FormInput
                                                // ATTACH REF HERE ONLY IF IT MATCHES LAST ADDED ID
                                                ref={item.id === lastAddedItemId ? newItemRef : null}
                                                label="Item Name"
                                                hideLabelOnDesktop
                                                value={item.name}
                                                onChange={(e) => handleItemChange(item.id, e)}
                                                name="name"
                                                error={errors.itemErrors?.[index]?.name}
                                            />
                                        </div>
                                        <FormInput label="Qty." hideLabelOnDesktop value={item.qty} onChange={(e) => handleItemChange(item.id, e)} name="qty" type="number" error={errors.itemErrors?.[index]?.qty} />
                                        <FormInput label="Price" hideLabelOnDesktop value={item.price} onChange={(e) => handleItemChange(item.id, e)} name="price" type="number" error={errors.itemErrors?.[index]?.price} />

                                        <div className="flex flex-col gap-2">
                                            <label className="md:hidden text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]">Total</label>
                                            <p className="p-4 font-bold text-[#7E88C3] dark:text-[#DFE3FA] text-[15px]">
                                                {(item.qty * item.price).toFixed(2)}
                                            </p>
                                        </div>

                                        <button type="button" onClick={() => deleteItem(item.id)} className="p-4 mb-1 group flex justify-center items-center">
                                            <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg" className="fill-[#888EB0] group-hover:fill-[#EC5757] transition-colors">
                                                <path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.027 0h4.446z" fillRule="nonzero" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={addNewItem}
                                className="w-full mt-4 bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] font-bold py-4 rounded-full hover:bg-[#DFE3FA] dark:hover:bg-white dark:hover:text-[#7E88C3] transition-all duration-300"
                            >
                                + Add New Item
                            </button>
                        </div>
                    </form>
                </div>

                <div className="sticky bottom-0 w-full p-8 bg-white dark:bg-[#141625] flex justify-end items-center gap-2 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
                    <button type="button" onClick={() => setIsOpen(false)} className="bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] px-6 py-4 rounded-full font-bold text-[15px] hover:bg-[#DFE3FA] dark:hover:bg-white dark:hover:text-[#7E88C3] transition-all">Cancel</button>
                    <button type="submit" onClick={handleSaveChanges} className="bg-purple-main text-white px-6 py-4 rounded-full font-bold text-[15px] hover:bg-purple-hover transition-all">Save Changes</button>
                </div>
            </aside>
        </>
    );
}