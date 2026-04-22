return (
    // 1. Changed -m-8 to inset-0 to ensure the form fills the entire slide-over area perfectly
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-white dark:bg-[#141625]">
        
        {/* Scrollable Content */}
        <div ref={addItemBtnRef} className="flex-1 overflow-y-auto p-8 md:p-14 custom-scrollbar">
            <form className="flex flex-col gap-12 pb-32"> {/* pb-32 ensures content isn't hidden by footer */}
                {/* ... all your fieldsets remain the same ... */}
            </form>
        </div>

        {/* 2. Changed 'fixed' to 'sticky' or 'relative' to keep it at the bottom of the flex box 
           This eliminates the 'gap' because it's now part of the flex flow, not floating over it. */}
        <div className="mt-auto w-full p-4 md:p-7 md:px-14 bg-white dark:bg-[#141625] flex justify-between items-center z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.1)] transition-colors duration-300">

            <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] px-4 md:px-8 py-4 rounded-full font-bold text-[12px] md:text-[13px] hover:bg-[#DFE3FA] transition-all whitespace-nowrap"
            >
                Discard
            </button>

            <div className="flex gap-2 md:gap-3">
                <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="bg-[#373B53] text-[#888EB0] dark:text-[#DFE3FA] px-4 md:px-8 py-4 rounded-full font-bold text-[12px] md:text-[13px] hover:bg-[#0C0E17] transition-all whitespace-nowrap"
                >
                    Save as Draft
                </button>

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-purple-main text-white px-4 md:px-8 py-4 rounded-full font-bold text-[12px] md:text-[13px] hover:bg-purple-hover transition-all whitespace-nowrap"
                >
                    Save & Send
                </button>
            </div>
        </div>
    </div>
);