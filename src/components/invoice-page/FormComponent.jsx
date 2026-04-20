import React, { useState } from 'react'
import InvoiceItemInput from './InvoiceItemInput';

const FormComponent = () => {

    const [formData, setFormData] = useState({
        senderStreet: '', senderCity: '', senderPostCode: '', senderCountry: '',
        clientName: '', clientEmail: '', clientStreet: '', clientCity: '',
        clientPostCode: '', clientCountry: '', invoiceDate: '', paymentTerms: '30',
        projectDescription: '',
        items: [{ id: Date.now(), name: '', qty: 1, price: 0 }] // Initial item
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.senderStreet) newErrors.senderStreet = "can't be empty";
        if (!formData.clientName) newErrors.clientName = "can't be empty";
        if (!formData.clientEmail?.includes('@')) newErrors.clientEmail = "invalid email";
        // Check items list
        if (formData.items.length === 0) newErrors.items = "at least one item required";
        formData.items.forEach((item, index) => {
            if (!item.name) {
                if (!newErrors.itemErrors) newErrors.itemErrors = [];
                newErrors.itemErrors[index] = { name: "can't be empty" };
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0 && !newErrors.itemErrors;
    };



    return (

        <form className="flex flex-col gap-10 pb-32">
            {/* 1. Bill From */}
            <fieldset className="flex flex-col gap-6">
                <legend className="text-purple-main font-bold text-[13px] mb-6">Bill From</legend>
                {/* Street */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <label className={`text-[13px] font-medium ${errors.senderStreet ? 'text-red-500' : 'text-[#7E88C3] dark:text-[#DFE3FA]'}`}>Street Address</label>
                        {errors.senderStreet && <span className="text-red-500 text-[10px] font-semibold">{errors.senderStreet}</span>}
                    </div>
                    <input name="senderStreet" value={formData.senderStreet} onChange={handleInputChange} className={`w-full p-4 rounded-md border bg-transparent dark:text-white font-bold text-[13px] focus:border-purple-main transition-all ${errors.senderStreet ? 'border-red-500' : 'border-[#DFE3FA] dark:border-[#252945]'}`} />
                </div>
                {/* City/PostCode/Country */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {/* City */}
                    <div className="flex flex-col gap-2 col-span-1">
                        <label className="text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]">City</label>
                        <input name="senderCity" onChange={handleInputChange} className="w-full p-4 rounded-md border border-[#DFE3FA] dark:border-[#252945] bg-transparent dark:text-white font-bold text-[13px] focus:border-purple-main transition-colors" />
                    </div>
                    {/* PostCode */}
                    <div className="flex flex-col gap-2 col-span-1">
                        <label className="text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]">Post Code</label>
                        <input name="senderPostCode" onChange={handleInputChange} className="w-full p-4 rounded-md border border-[#DFE3FA] dark:border-[#252945] bg-transparent dark:text-white font-bold text-[13px] focus:border-purple-main transition-colors" />
                    </div>
                    {/* Country */}
                    <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                        <label className="text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]">Country</label>
                        <input name="senderCountry" onChange={handleInputChange} className="w-full p-4 rounded-md border border-[#DFE3FA] dark:border-[#252945] bg-transparent dark:text-white font-bold text-[13px] focus:border-purple-main transition-colors" />
                    </div>
                </div>
            </fieldset>

            {/* 2. Bill To */}
            <fieldset className="flex flex-col gap-6">
                <legend className="text-purple-main font-bold text-[13px]">Bill To</legend>
                {/* Client Info */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <label className={`text-[13px] font-medium ${errors.clientName ? 'text-red-500' : 'text-[#7E88C3] dark:text-[#DFE3FA]'}`}>Client's Name</label>
                        {errors.clientName && <span className="text-red-500 text-[10px] font-semibold">{errors.clientName}</span>}
                    </div>
                    <input name="clientName" onChange={handleInputChange} className={`w-full p-4 rounded-md border bg-transparent dark:text-white font-bold text-[13px] focus:border-purple-main transition-all ${errors.clientName ? 'border-red-500' : 'border-[#DFE3FA] dark:border-[#252945]'}`} />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <label className={`text-[13px] font-medium ${errors.clientEmail ? 'text-red-500' : 'text-[#7E88C3] dark:text-[#DFE3FA]'}`}>Client's Email</label>
                        {errors.clientEmail && <span className="text-red-500 text-[10px] font-semibold">{errors.clientEmail}</span>}
                    </div>
                    <input name="clientEmail" placeholder="e.g. email@example.com" onChange={handleInputChange} className={`w-full p-4 rounded-md border bg-transparent dark:text-white font-bold text-[13px] focus:border-purple-main transition-all ${errors.clientEmail ? 'border-red-500' : 'border-[#DFE3FA] dark:border-[#252945]'}`} />
                </div>
                {/* Client Address */}
                <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]">Street Address</label>
                    <input name="clientStreet" onChange={handleInputChange} className="w-full p-4 rounded-md border border-[#DFE3FA] dark:border-[#252945] bg-transparent dark:text-white font-bold text-[13px] focus:border-purple-main transition-colors" />
                </div>
                {/* Client City/PostCode/Country (Grid) */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2"><label className="text-[13px] text-[#7E88C3] dark:text-[#DFE3FA]">City</label><input name="clientCity" onChange={handleInputChange} className="w-full p-4 rounded-md border border-[#DFE3FA] dark:border-[#252945] bg-transparent dark:text-white font-bold text-[13px]" /></div>
                    <div className="flex flex-col gap-2"><label className="text-[13px] text-[#7E88C3] dark:text-[#DFE3FA]">Post Code</label><input name="clientPostCode" onChange={handleInputChange} className="w-full p-4 rounded-md border border-[#DFE3FA] dark:border-[#252945] bg-transparent dark:text-white font-bold text-[13px]" /></div>
                    <div className="flex flex-col gap-2 col-span-2 md:col-span-1"><label className="text-[13px] text-[#7E88C3] dark:text-[#DFE3FA]">Country</label><input name="clientCountry" onChange={handleInputChange} className="w-full p-4 rounded-md border border-[#DFE3FA] dark:border-[#252945] bg-transparent dark:text-white font-bold text-[13px]" /></div>
                </div>
            </fieldset>

            {/* 3. Invoice Dates & Description */}
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                {/* DatePicker placeholder - in pro projects, use a real DatePicker library */}
                <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]">Invoice Date</label>
                    <input name="invoiceDate" type="date" onChange={handleInputChange} className="w-full p-4 rounded-md border border-[#DFE3FA] dark:border-[#252945] bg-transparent dark:text-white font-bold text-[13px] accent-purple-main" />
                </div>
                {/* Payment Terms Select */}
                <div className="flex flex-col gap-2 relative">
                    <label className="text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]">Payment Terms</label>
                    <select name="paymentTerms" value={formData.paymentTerms} onChange={handleInputChange} className="w-full p-4 rounded-md border border-[#DFE3FA] dark:border-[#252945] bg-transparent dark:text-white font-bold text-[13px] appearance-none focus:border-purple-main transition-colors">
                        <option value="1">Net 1 Day</option>
                        <option value="7">Net 7 Days</option>
                        <option value="14">Net 14 Days</option>
                        <option value="30">Net 30 Days</option>
                    </select>
                    <svg width="11" height="7" className="absolute right-4 bottom-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4.225 4.225L9.45 1" stroke="#7C5DFA" strokeWidth="2" fill="none" /></svg>
                </div>
                {/* Description */}
                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]">Project Description</label>
                    <input name="projectDescription" placeholder="e.g. Graphic Design Service" onChange={handleInputChange} className="w-full p-4 rounded-md border border-[#DFE3FA] dark:border-[#252945] bg-transparent dark:text-white font-bold text-[13px] focus:border-purple-main" />
                </div>
            </fieldset>

            {/* 4. ITEM LIST SECTION - Figma Pixel Perfect */}
            <fieldset className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-[#777F98] dark:text-white tracking-tight mb-4 lg:text-[23px]">Item List</h3>

                {/* Table Headers (Hidden on Mobile) */}
                <div className="hidden sm:grid grid-cols-[2fr_1fr_1.5fr_1fr_auto] gap-4 mb-4 font-bold text-[13px] text-[#7E88C3] dark:text-[#DFE3FA]">
                    <label>Item Name</label><label>Qty.</label><label>Price</label><label>Total</label><div></div>
                </div>

                {/* Dynamic Item Inputs */}
                {formData.items.map((item, index) => (
                    <InvoiceItemInput
                        key={item.id}
                        item={item}
                        index={index}
                        errors={errors.itemErrors?.[index]}
                        handleItemChange={(idx, e) => {
                            const { name, value } = e.target;
                            const newItems = [...formData.items];
                            newItems[idx] = { ...newItems[idx], [name]: name === 'name' ? value : Number(value) };
                            setFormData(prev => ({ ...prev, items: newItems }));
                            if (errors.itemErrors?.[index]?.[name]) setErrors(prev => ({ ...prev, itemErrors: prev.itemErrors.map((err, i) => i === index ? { ...err, [name]: '' } : err) }));
                        }}
                        removeItem={(idx) => {
                            const newItems = formData.items.filter((_, i) => i !== idx);
                            setFormData(prev => ({ ...prev, items: newItems }));
                        }}
                    />
                ))}

                {/* Add New Item Button */}
                <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, items: [...prev.items, { id: Date.now(), name: '', qty: 1, price: 0 }] }))}
                    className="w-full py-4 rounded-full bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] font-bold text-[13px] hover:bg-[#DFE3FA] transition-colors shadow-sm"
                >
                    + Add New Item
                </button>
                {errors.items && <span className="text-red-500 text-sm mt-2 font-bold">{errors.items}</span>}
            </fieldset>

            {/* Sticky Action Buttons */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:px-14 bg-white dark:bg-[#141625] flex justify-between items-center shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-10">
                <button type="button" onClick={() => setIsFormOpen(false)} className="bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] px-6 py-4 rounded-full font-bold text-[13px] hover:bg-[#DFE3FA] transition-colors outline-none focus:ring-2 focus:ring-purple-main">Discard</button>
                <div className="flex gap-2">
                    <button type="button" className="bg-[#373B53] text-[#888EB0] dark:text-[#DFE3FA] px-6 py-4 rounded-full font-bold text-[13px] hover:bg-[#0C0E17] transition-colors outline-none focus:ring-2 focus:ring-[#888EB0]">Save as Draft</button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            if (validateForm()) {
                                console.log("Invoice Submitted", formData);
                                setIsFormOpen(false);
                            }
                        }}
                        className="bg-purple-main text-white px-6 py-4 rounded-full font-bold text-[13px] hover:bg-purple-hover transition-colors shadow-lg shadow-purple-main/20 outline-none focus:ring-2 focus:ring-purple-main"
                    >
                        Save & Send
                    </button>
                </div>
            </div>
        </form>
    )
}

export default FormComponent