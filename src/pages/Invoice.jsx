import { useState } from 'react';
import InvoiceHeader from '../components/invoice-page/InvoiceHeader';
import EmptyState from '../components/invoice-page/EmptyState';
import InvoiceCard from '../components/invoice-page/InvoiceCard';
import { Link } from 'react-router-dom';



export default function Invoice() {




    // Array of mock data to test the "Photo 2" state
    const [invoices, setInvoices] = useState([
        { id: 'RT3080', paymentDue: '19 Aug 2021', clientName: 'Jensen Huang', total: '1,800.90', status: 'paid' },
        { id: 'XM9141', paymentDue: '20 Sep 2021', clientName: 'Alex Grim', total: '556.00', status: 'pending' },
        { id: 'RG0314', paymentDue: '01 Oct 2021', clientName: 'John Morrison', total: '14,002.33', status: 'paid' },
    ]);

    return (
        <div className="w-full max-w-[730px] mx-auto transition-all duration-500 pb-4 ">
            <InvoiceHeader count={invoices.length} />


            <main>
                {
                    invoices.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <section aria-label="Invoice list">
                            {
                                invoices.map(invoice => (

                                    <Link to={`/invoice/${invoice.id}`} key={invoice.id} className="block">
                                        <InvoiceCard key={invoice.id} invoice={invoice} />
                                    </Link>

                                ))
                            }
                        </section>
                    )}
            </main>
        </div>
    );
}