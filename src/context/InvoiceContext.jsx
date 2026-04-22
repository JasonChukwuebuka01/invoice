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





    //  Add New Invoice Function
    const addInvoice = (newInvoice) => {
        const invoiceWithId = {
            ...newInvoice,
            id: generateId(),
            status: newInvoice.status || 'pending',
        };
        setInvoices((prev) => [invoiceWithId, ...prev]);
    };



    return (
        <InvoiceContext.Provider value={{ invoices, addInvoice }}>
            {children}
        </InvoiceContext.Provider>
    );
};



export const useInvoices = () => {
    const context = useContext(InvoiceContext);
    if (!context) throw new Error("useInvoices must be used within an InvoiceProvider");
    return context;
};