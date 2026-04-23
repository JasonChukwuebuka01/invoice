import React, { useState, useEffect, useRef } from 'react';
import InvoiceItemInput from './InvoiceItemInput';
import { FormInput } from '../helper/FormInput';
import { CustomSelect } from '../helper/CustomSelect';
import { useInvoices } from '../../context/InvoiceContext';

const FormComponent = ({ setIsFormOpen }) => {
    const { addInvoice } = useInvoices();

    const [formData, setFormData] = useState({
        senderStreet: '', senderCity: '', senderPostCode: '', senderCountry: '',
        clientName: '', clientEmail: '', clientStreet: '', clientCity: '',
        clientPostCode: '', clientCountry: '', invoiceDate: '', paymentTerms: '30',
        projectDescription: '',
        items: [{ id: Date.now(), name: '', qty: 1, price: 0 }]
    });

    const [errors, setErrors] = useState({});
    const [number, setNumber] = useState(0);
    const [lastAddedItemId, setLastAddedItemId] = useState(null);

    const addItemBtnRef = useRef(null); // This is your scroll container
    const newItemRef = useRef(null);   // This is the auto-focus target

    // Handle Scroll + Focus Logic
    useEffect(() => {
        if (number > 0 && addItemBtnRef.current) {
            // 1. Scroll to the bottom of the container
            addItemBtnRef.current.scrollTo({
                top: addItemBtnRef.current.scrollHeight,
                behavior: 'smooth'
            });

            // 2. Focus the input after scroll finishes
            const focusTimeout = setTimeout(() => {
                if (newItemRef.current) {
                    newItemRef.current.focus();
                }
            }, 100);

            return () => clearTimeout(focusTimeout);
        }
    }, [number, lastAddedItemId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleItemChange = (idx, e) => {
        const { name, value } = e.target;
        const newItems = [...formData.items];
        newItems[idx] = { ...newItems[idx], [name]: name === 'name' ? value : Number(value) };
        setFormData(prev => ({ ...prev, items: newItems }));
    };

    const handleNewItemButtonClick = () => {
        const newId = Date.now();
        setNumber(prev => prev + 1);
        setLastAddedItemId(newId);
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { id: newId, name: '', qty: 1, price: 0 }]
        }));
    };

    const validateForm = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const fields = [
            'senderStreet', 'senderCity', 'senderPostCode', 'senderCountry',
            'clientName', 'clientStreet', 'clientCity', 'clientPostCode', 'clientCountry',
            'invoiceDate', 'projectDescription'
        ];

        fields.forEach(field => {
            if (!formData[field]?.toString().trim()) {
                newErrors[field] = "can't be empty";
            }
        });

        if (!formData.clientEmail.trim()) {
            newErrors.clientEmail = "can't be empty";
        } else if (!emailRegex.test(formData.clientEmail)) {
            newErrors.clientEmail = "invalid format";
        }

        if (formData.items.length === 0) {
            newErrors.items = "An item must be added";
        } else {
            const itemErrors = [];
            formData.items.forEach((item, index) => {
                const errorObj = {};
                if (!item.name.trim()) errorObj.name = "can't be empty";
                if (item.qty <= 0) errorObj.qty = "must be > 0";
                if (item.price <= 0) errorObj.price = "must be > 0";
                if (Object.keys(errorObj).length > 0) itemErrors[index] = errorObj;
            });
            if (itemErrors.length > 0) newErrors.itemErrors = itemErrors;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const calculateTotal = () => {
        return formData.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const finalData = {
                ...formData,
                total: calculateTotal(),
                status: 'pending'
            };
            addInvoice(finalData);
            setIsFormOpen(false);
        }
    };

    const handleSaveDraft = () => {
        const finalData = {
            ...formData,
            total: calculateTotal(),
            status: 'draft'
        };
        addInvoice(finalData);
        setIsFormOpen(false);
    };

    return (
        <div className="relative flex flex-col h-full -m-10 md:-m-14 overflow-hidden bg-white dark:bg-[#141625]">
            <div ref={addItemBtnRef} className="flex-1 overflow-y-auto p-8 md:p-14 custom-scrollbar">
                <form className="flex flex-col gap-12 pb-32">
                    {/* Bill From */}
                    <fieldset className="flex flex-col gap-6">
                        <legend className="text-purple-main font-bold text-[13px] mb-6">Bill From</legend>
                        <FormInput label="Street Address" name="senderStreet" value={formData.senderStreet} error={errors.senderStreet} onChange={handleInputChange} />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            <FormInput label="City" name="senderCity" value={formData.senderCity} error={errors.senderCity} onChange={handleInputChange} />
                            <FormInput label="Post Code" name="senderPostCode" value={formData.senderPostCode} error={errors.senderPostCode} onChange={handleInputChange} />
                            <FormInput label="Country" name="senderCountry" value={formData.senderCountry} error={errors.senderCountry} onChange={handleInputChange} gridClass="col-span-2 md:col-span-1" />
                        </div>
                    </fieldset>

                    {/* Bill To */}
                    <fieldset className="flex flex-col gap-6">
                        <legend className="text-purple-main font-bold text-[13px]">Bill To</legend>
                        <FormInput label="Client's Name" name="clientName" value={formData.clientName} error={errors.clientName} onChange={handleInputChange} />
                        <FormInput label="Client's Email" name="clientEmail" placeholder="e.g. email@example.com" value={formData.clientEmail} error={errors.clientEmail} onChange={handleInputChange} />
                        <FormInput label="Street Address" name="clientStreet" value={formData.clientStreet} error={errors.clientStreet} onChange={handleInputChange} />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            <FormInput label="City" name="clientCity" value={formData.clientCity} error={errors.clientCity} onChange={handleInputChange} />
                            <FormInput label="Post Code" name="clientPostCode" value={formData.clientPostCode} error={errors.clientPostCode} onChange={handleInputChange} />
                            <FormInput label="Country" name="clientCountry" value={formData.clientCountry} error={errors.clientCountry} onChange={handleInputChange} gridClass="col-span-2 md:col-span-1" />
                        </div>
                    </fieldset>

                    {/* Dates/Terms */}
                    <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                        <FormInput label="Invoice Date" name="invoiceDate" type="date" value={formData.invoiceDate} error={errors.invoiceDate} onChange={handleInputChange} />
                        <div className="flex flex-col gap-2 relative">
                            <label className="text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]">Payment Terms</label>
                            <CustomSelect
                                value={formData.paymentTerms}
                                onChange={handleInputChange}
                                options={[
                                    { label: 'Net 1 Day', value: '1' },
                                    { label: 'Net 7 Days', value: '7' },
                                    { label: 'Net 14 Days', value: '14' },
                                    { label: 'Net 30 Days', value: '30' }
                                ]}
                            />
                            <svg width="11" height="7" className="absolute right-4 bottom-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1l4.225 4.225L9.45 1" stroke="#7C5DFA" strokeWidth="2" fill="none" />
                            </svg>
                        </div>
                        <FormInput label="Project Description" name="projectDescription" placeholder="e.g. Graphic Design Service" value={formData.projectDescription} error={errors.projectDescription} onChange={handleInputChange} gridClass="md:col-span-2" />
                    </fieldset>

                    {/* Item List */}
                    <fieldset className="flex flex-col gap-4">
                        <h3 className="text-xl font-bold text-[#777F98] dark:text-white tracking-tight mb-4">Item List</h3>
                        {formData.items.map((item, index) => (
                            <InvoiceItemInput
                                key={item.id}
                                ref={item.id === lastAddedItemId ? newItemRef : null}
                                item={item}
                                index={index}
                                errors={errors.itemErrors?.[index]}
                                handleItemChange={handleItemChange}
                                removeItem={(idx) => setFormData(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }))}
                            />
                        ))}
                        <button
                            type="button"
                            onClick={handleNewItemButtonClick}
                            className="w-full py-4 rounded-full bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] font-bold text-[13px] transition-all mt-4 hover:bg-[#DFE3FA] dark:hover:bg-white dark:hover:text-[#7E88C3]"
                        >
                            + Add New Item
                        </button>
                    </fieldset>
                </form>
            </div>

            {/* Footer Buttons */}
            <div className="absolute lg:fixed bottom-0 left-0 w-full px-8 pb-7 pt-7 lg:pb-4 md:p-7 md:px-14 bg-white dark:bg-[#141625] flex justify-between items-center z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.1)] transition-colors duration-300">

                {/* Updated Discard Button */}
                <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] px-4 md:px-8 py-4 rounded-full font-bold text-[12px] md:text-[13px] hover:bg-[#DFE3FA] dark:hover:bg-white dark:hover:text-[#7E88C3] transition-all whitespace-nowrap"
                >
                    Discard
                </button>

                <div className="flex gap-2 md:gap-3">
                    {/* Save as Draft */}
                    <button
                        type="button"
                        onClick={handleSaveDraft}
                        className="bg-[#373B53] text-[#888EB0] dark:text-[#DFE3FA] px-4 md:px-8 py-4 rounded-full font-bold text-[12px] md:text-[13px] hover:bg-[#0C0E17] transition-all whitespace-nowrap"
                    >
                        Save as Draft
                    </button>

                    {/* Save & Send */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-purple-main text-white px-4 md:px-8 py-4 rounded-full font-bold text-[12px] md:text-[13px] hover:bg-purple-hover transition-all whitespace-nowrap"
                    >
                        Save & Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormComponent;