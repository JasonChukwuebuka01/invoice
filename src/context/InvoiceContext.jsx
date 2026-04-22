import React, { createContext, useContext, useState, useEffect } from 'react';



const InvoiceContext = createContext();



// Helper to generate IDs like 'RT3080'
const generateId = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    let id = "";
    for (let i = 0; i < 2; i++) {
        id += letters.charAt(Math.floor(Math.random() * letters.length));
    };

    for (let i = 0; i < 4; i++) {
        id += numbers.charAt(Math.floor(Math.random() * numbers.length));
    };

    return id;
};





export const InvoiceProvider = ({ children }) => {
    //  Initial Load from LocalStorage or use default mock data
    const [invoices, setInvoices] = useState(() => {
        const savedInvoices = localStorage.getItem('invoices');
        return savedInvoices ? JSON.parse(savedInvoices) : []

    });






    //  Sync to LocalStorage whenever invoices change
    useEffect(() => {
        localStorage.setItem('invoices', JSON.stringify(invoices));
    }, [invoices]);





    const addInvoice = (newInvoice) => {
        const invoiceWithId = {
            ...newInvoice,
            id: generateId(),
            status: newInvoice.status || 'pending',
        };
        setInvoices((prev) => [invoiceWithId, ...prev]);
    };





    const deleteInvoice = (id) => {
        setInvoices((prev) => prev.filter(inv => inv.id !== id));
    };





    const markAsPaid = (id) => {
        setInvoices((prev) => prev.map(inv => {
            // Rule: Only Pending can be marked as Paid
            if (inv.id === id && inv.status === 'pending') {
                return { ...inv, status: 'paid' };
            }
            return inv;
        }));
    };



    const updateInvoice = (id, updatedInvoice) => {
        setInvoices((prev) =>
            prev.map((inv) => (inv.id === id ? { ...updatedInvoice, id } : inv))
        );
    };





    return (
        <InvoiceContext.Provider value={{ invoices, addInvoice, deleteInvoice, markAsPaid, updateInvoice}}>
            {children}
        </InvoiceContext.Provider>
    );
};



export const useInvoices = () => {
    const context = useContext(InvoiceContext);
    if (!context) throw new Error("useInvoices must be used within an InvoiceProvider");
    return context;
};