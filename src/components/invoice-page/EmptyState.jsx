import invoiceLogo from '../../assets/invoice-empty-state.png';

export default function EmptyState() {
  return (
    <section className="flex flex-col items-center justify-center mt-12 lg:mt-24 text-center">
      <img src={invoiceLogo} alt="Invoice Logo" aria-hidden="true" className="mb-10 w-[193px] lg:w-[242px]" />
      <h2 className="text-xl font-bold mb-6 dark:text-white tracking-tight">
        There is nothing here
      </h2>
      <p className="max-w-[220px] text-[13px] text-[#888EB0] dark:text-[#DFE3FA] leading-4">
        Create an invoice by clicking the <br /> 
        <span className="font-bold">New Invoice</span> button and get started
      </p>
    </section>
  );
}