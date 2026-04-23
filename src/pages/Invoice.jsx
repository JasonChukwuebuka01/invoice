import { useSearchParams, Link } from 'react-router-dom';
import { useInvoices } from '../context/InvoiceContext';
import InvoiceHeader from '../components/invoice-page/InvoiceHeader';
import EmptyState from '../components/invoice-page/EmptyState';
import InvoiceCard from '../components/invoice-page/InvoiceCard';

export default function Invoice() {
    const { invoices } = useInvoices();
    const [searchParams] = useSearchParams();
    const filterParams = searchParams.get('status')?.split(',') || [];

    const filteredInvoices = invoices.filter(invoice => {
        if (filterParams.length === 0) return true;
        return filterParams.includes(invoice.status.toLowerCase());
    });

    return (
        
        <div className="min-h-screen w-full bg-[#F8F8FB] dark:bg-[#141625] transition-colors duration-300">
            <div className="w-full max-w-[730px] mx-auto pb-4 pt-[105px]  lg:pt-[72px] px-2 md:px-6">

                {/* The Header contains the "Invoices" title which needs to change color */}
                <InvoiceHeader count={filteredInvoices.length} />

                <main className="mt-8 md:mt-14 lg:mt-18">
                    {filteredInvoices.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <section aria-label="Invoice list" className="flex flex-col gap-4">
                            {filteredInvoices.map(invoice => (
                                <Link to={`/invoice/${invoice.id}`} key={invoice.id} className="block">
                                    <InvoiceCard invoice={invoice} />
                                </Link>
                            ))}
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}