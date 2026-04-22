import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom'; 
import InvoiceHeader from '../components/invoice-page/InvoiceHeader';
import EmptyState from '../components/invoice-page/EmptyState';
import InvoiceCard from '../components/invoice-page/InvoiceCard';


export default function Invoice() {
    const [invoices] = useState([
        { id: 'RT3080', paymentDue: '19 Aug 2021', clientName: 'Jensen Huang', total: '1,800.90', status: 'paid' },
        { id: 'XM9141', paymentDue: '20 Sep 2021', clientName: 'Alex Grim', total: '556.00', status: 'pending' },
        { id: 'RG0314', paymentDue: '01 Oct 2021', clientName: 'John Morrison', total: '14,002.33', status: 'paid' },
        { id: 'ST1022', paymentDue: '12 Oct 2021', clientName: 'Anita Rose', total: '2,300.00', status: 'draft' },
    ]);



    

    // Hook to listen to the URL parameters
    const [searchParams] = useSearchParams();

    //  Get the status string from URL and turn it into an array
    const filterParams = searchParams.get('status')?.split(',') || [];

    //  Derived State: Filter the invoices based on the URL
    const filteredInvoices = invoices.filter(invoice => {
        // If no filter is selected (All), show everything
        if (filterParams.length === 0) return true;

        // Check if the invoice status is included in our URL params
        return filterParams.includes(invoice.status.toLowerCase());
    });

    return (
        <div className="w-full max-w-[730px] mx-auto transition-all duration-500 pb-4 pt-[20%] lg:pt-[4%]">
            {/* 4. Pass the count of FILTERED invoices so the header count stays accurate */}
            <InvoiceHeader count={filteredInvoices.length} />

            <main>
                {filteredInvoices.length === 0 ? (
                    <EmptyState />
                ) : (
                    <section aria-label="Invoice list">
                        {filteredInvoices.map(invoice => (
                            <Link to={`/invoice/${invoice.id}`} key={invoice.id} className="block">
                                <InvoiceCard invoice={invoice} />
                            </Link>
                        ))}
                    </section>
                )}
            </main>
        </div>
    );
}