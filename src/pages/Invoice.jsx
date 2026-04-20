import { useState } from 'react';
import InvoiceHeader from '../components/invoice-page/InvoiceHeader';
import EmptyState from '../components/invoice-page/EmptyState';
import InvoiceCard from '../components/invoice-page/InvoiceCard';



export default function Invoice() {




    // Array of mock data to test the "Photo 2" state
    const [invoices, setInvoices] = useState([
        { id: 'RT3080', paymentDue: '19 Aug 2021', clientName: 'Jensen Huang', total: '1,800.90', status: 'paid' },
        { id: 'XM9141', paymentDue: '20 Sep 2021', clientName: 'Alex Grim', total: '556.00', status: 'pending' },
        { id: 'RG0314', paymentDue: '01 Oct 2021', clientName: 'John Morrison', total: '14,002.33', status: 'paid' },
    ]);

    return (
        <div className="w-full max-w-[730px] mx-auto transition-all duration-500">
            <InvoiceHeader count={invoices.length} />


            <main>
                {
                    invoices.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <section aria-label="Invoice list">
                            {
                                invoices.map(invoice => (
                                    <InvoiceCard key={invoice.id} invoice={invoice} />
                                ))
                            }
                        </section>
                    )}
            </main>
        </div>
    );
}