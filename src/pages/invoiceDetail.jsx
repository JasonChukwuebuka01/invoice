import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useInvoices } from '../context/InvoiceContext';
import { useTheme } from '../context/themeContext';
import EmptyState from '../components/invoice-page/EmptyState';
import InvoiceItemRow from '../components/invoice/id/InvoiceItemRow';
import EditInvoiceForm from '../components/invoice/id/EditInvoiceForm';
import DeleteModal from '../components/invoice/id/DeleteModal';

export default function InvoiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices, deleteInvoice, markAsPaid } = useInvoices();
  const { theme } = useTheme();

  const invoiceDetailsContainer = useRef(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [scrollTrigger, setScrollTrigger] = useState(0);

  const invoiceData = invoices.find(inv => inv.id === id);

  useEffect(() => {
    if (scrollTrigger > 0) {
      invoiceDetailsContainer.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [scrollTrigger]);

  const handleDelete = () => {
    deleteInvoice(id);
    setIsDeleteModalOpen(false);
    navigate('/');
  };

  const handleMarkAsPaid = () => {
    markAsPaid(id);
  };

  if (!invoiceData) {
    return <EmptyState showReset={true} />;
  }

  const statusColors = {
    paid: { bg: 'rgba(51, 214, 159, 0.06)', text: '#33D69F' },
    pending: { bg: 'rgba(255, 143, 0, 0.06)', text: '#FF8F00' },
    draft: {
      bg: theme === 'light' ? 'rgba(55, 59, 83, 0.06)' : 'rgba(223, 227, 250, 0.06)',
      text: theme === 'light' ? '#373B53' : '#DFE3FA'
    }
  };

  const currentStatus = statusColors[invoiceData.status] || statusColors.draft;

  return (
    <main
      className="min-h-screen relative overflow-hidden flex-1 pb-[100px] lg:pb-[900px] bg-[#F8F8FB] dark:bg-[#141625] pt-[72px] md:pt-[80px] lg:pt-[72px] pb-12 px-2 md:px-10 lg:px-[20%] transition-colors duration-300 "
    >
      {/* Modals are portaled or absolute/fixed anyway, so they stay here */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        invoiceId={invoiceData.id}
      />

      <EditInvoiceForm
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        initialData={invoiceData}
        onItemAdded={() => setScrollTrigger(prev => prev + 1)}
      />

      <Link to="/" className="flex items-center gap-6 mb-8 mt-8 group w-fit">
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" strokeWidth="2" fill="none" />
        </svg>
        <span className="text-[#0C0E17] dark:text-white font-bold text-[15px] group-hover:text-[#7E88C3] transition-colors">
          Go back
        </span>
      </Link>

      <header className="bg-[#F8F8FB] dark:bg-[#1E2139] p-6 md:px-8 md:py-5 rounded-lg flex items-center justify-between shadow-sm mb-4 md:mb-6 transition-colors duration-300">
        <div className="flex items-center justify-between w-full md:w-auto md:gap-5">
          <span className="text-[#858BB2] dark:text-[#DFE3FA] text-[13px]">Status</span>
          <div
            className="flex items-center justify-center gap-2 w-[104px] h-10 rounded-md font-bold text-[15px] capitalize transition-all"
            style={{ backgroundColor: currentStatus.bg, color: currentStatus.text }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentStatus.text }}></span>
            {invoiceData.status}
          </div>
        </div>

        <div className="hidden md:flex gap-2">
          <button onClick={() => setIsEditOpen(true)} className="bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] px-6 py-4 rounded-full font-bold text-[15px] hover:bg-[#DFE3FA] dark:hover:bg-white dark:hover:text-[#7E88C3] transition-all">
            Edit
          </button>
          <button onClick={() => setIsDeleteModalOpen(true)} className="bg-[#EC5757] text-white px-6 py-4 rounded-full font-bold text-[15px] hover:bg-[#FF9797] transition-all">
            Delete
          </button>
          {invoiceData.status === 'pending' && (
            <button onClick={handleMarkAsPaid} className="bg-[#7C5DFA] text-white px-6 py-4 rounded-full font-bold text-[15px] hover:bg-[#9277FF] transition-all">
              Mark as Paid
            </button>
          )}
        </div>
      </header>

      <article className="bg-[#F8F8FB] dark:bg-[#1E2139] p-6 md:p-12 rounded-lg shadow-sm transition-colors duration-300 mb-6">
        <section className="flex flex-col md:flex-row justify-between gap-8 mb-10 md:mb-12">
          <div>
            <h1 className="text-[#0C0E17] dark:text-white font-bold text-base md:text-[20px] mb-1 uppercase tracking-tight">
              <span className="text-[#888EB0]">#</span>{invoiceData.id}
            </h1>
            <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-[13px]">{invoiceData.projectDescription}</p>
          </div>
          <address className="not-italic text-[#7E88C3] dark:text-[#DFE3FA] text-[11px] leading-[18px] md:text-right transition-colors">
            {invoiceData.senderStreet}<br />
            {invoiceData.senderCity}<br />
            {invoiceData.senderPostCode}<br />
            {invoiceData.senderCountry}
          </address>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-10 md:mb-12">
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-[#7E88C3] dark:text-[#DFE3FA] text-[13px] mb-3">Invoice Date</h3>
              <p className="text-[#0C0E17] dark:text-white font-bold text-[15px] md:text-[19px]">{invoiceData.invoiceDate}</p>
            </div>
            <div>
              <h3 className="text-[#7E88C3] dark:text-[#DFE3FA] text-[13px] mb-3">Payment Due</h3>
              <p className="text-[#0C0E17] dark:text-white font-bold text-[15px] md:text-[19px]">{invoiceData.paymentTerms || 'N/A'}</p>
            </div>
          </div>

          <div>
            <h3 className="text-[#7E88C3] dark:text-[#DFE3FA] text-[13px] mb-3">Bill To</h3>
            <p className="text-[#0C0E17] dark:text-white font-bold text-[15px] md:text-[19px] mb-2">{invoiceData.clientName}</p>
            <address className="not-italic text-[#7E88C3] dark:text-[#DFE3FA] text-[11px] leading-[18px]">
              {invoiceData.clientStreet}<br />
              {invoiceData.clientCity}<br />
              {invoiceData.clientPostCode}<br />
              {invoiceData.clientCountry}
            </address>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className="text-[#7E88C3] dark:text-[#DFE3FA] text-[13px] mb-3">Sent to</h3>
            <p className="text-[#0C0E17] dark:text-white font-bold text-[15px] md:text-[19px] break-all">{invoiceData.clientEmail}</p>
          </div>
        </section>

        <section
          ref={invoiceDetailsContainer}
          className="rounded-t-lg overflow-hidden bg-[#F8F8FB] dark:bg-[#252945] p-6 md:p-8 transition-colors duration-300"
        >
          <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_1fr] mb-8 text-[#7E88C3] dark:text-[#DFE3FA] text-[13px]">
            <span>Item Name</span>
            <span className="text-center">QTY.</span>
            <span className="text-right">Price</span>
            <span className="text-right">Total</span>
          </div>

          <ul className="flex flex-col gap-6 md:gap-8">
            {invoiceData.items.map(item => (
              <InvoiceItemRow key={item.id} name={item.name} qty={item.qty} price={item.price} />
            ))}
          </ul>
        </section>

        <footer className="bg-[#373B53] dark:bg-[#0C0E17] p-6 md:px-8 flex items-center justify-between rounded-b-lg transition-colors duration-300">
          <span className="text-white text-[13px]">Amount Due</span>
          <span className="text-white font-bold text-[20px] md:text-[24px]">
            £ {invoiceData.total?.toLocaleString() || '0.00'}
          </span>
        </footer>
      </article>

      {/* MOBILE FOOTER: Removed fixed, left-0, w-full. Now it follows the parent's padding */}
      <footer className="fixed w-full left-0 bottom-0 md:hidden bg-[#F8F8FB] dark:bg-[#1E2139] p-6 rounded-lg flex justify-center items-center gap-2 shadow-sm transition-colors duration-300">
        <button onClick={() => setIsEditOpen(true)} className="flex-1 bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] py-4 rounded-full font-bold text-[13px]">
          Edit
        </button>
        <button onClick={() => setIsDeleteModalOpen(true)} className="flex-1 bg-[#EC5757] text-white py-4 rounded-full font-bold text-[13px]">
          Delete
        </button>
        {invoiceData.status === 'pending' && (
          <button onClick={handleMarkAsPaid} className="flex-1 bg-[#7C5DFA] text-white py-4 rounded-full font-bold text-[13px]">
            Paid
          </button>
        )}
      </footer>
    </main>
  );
}