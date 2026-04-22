import { useSearchParams, Link } from 'react-router-dom';
import { useInvoices } from '../context/InvoiceContext'; // 1. Import our new hook
import InvoiceHeader from '../components/invoice-page/InvoiceHeader';
import EmptyState from '../components/invoice-page/EmptyState';
import InvoiceCard from '../components/invoice-page/InvoiceCard';

export default function Invoice() {
    // 2. Consume invoices from Context instead of local useState
    const { invoices } = useInvoices();

    // Hook to listen to the URL parameters
    const [searchParams] = useSearchParams();

    // Get the status string from URL and turn it into an array
    const filterParams = searchParams.get('status')?.split(',') || [];

    // 3. Derived State: The filtering logic stays the same, 
    // but now it operates on the global invoices array
    const filteredInvoices = invoices.filter(invoice => {
        if (filterParams.length === 0) return true;
        return filterParams.includes(invoice.status.toLowerCase());
    });

    return (
        <div className="w-full max-w-[730px] mx-auto transition-all duration-500 pb-4 pt-[20%] lg:pt-[4%]">
            {/* Pass the count of FILTERED invoices */}
            <InvoiceHeader count={filteredInvoices.length} />

            <main>
                {filteredInvoices.length === 0 ? (
                    <EmptyState   />
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