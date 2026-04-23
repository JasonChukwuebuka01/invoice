import { Link } from 'react-router-dom';
import invoiceLogo from '../../assets/invoice-empty-state.png';

export default function EmptyState({ showReset = false }) {



  return (
    <section className="border-2 border-red-500 flex-1 flex flex-col items-center justify-center mt-24 lg:mt-24 text-center animate-fadeIn">
      <img
        src={invoiceLogo}
        alt="No invoices found"
        aria-hidden="true"
        className="mb-10 w-[193px] lg:w-[242px]"
      />

      <h2 className="text-xl font-bold mb-6 dark:text-white tracking-tight">
        There is nothing here
      </h2>

      {
        !showReset && (<p className="max-w-[220px] text-[13px] text-[#888EB0] dark:text-[#DFE3FA] leading-4 mb-8">
          Create an invoice by clicking the <br />
          <span className="font-bold">New Invoice</span> button and get started
        </p>)
      }

      {/* Conditionally rendered Home/Reset button */}
      {showReset && (
        <Link
          to="/"
          className="bg-purple-main text-white px-6 py-4 rounded-full font-bold text-[15px] hover:bg-purple-hover transition-all shadow-lg shadow-purple-main/20"
        >
          Go Back Home
        </Link>
      )}
    </section>
  );
}