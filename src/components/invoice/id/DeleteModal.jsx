// components/invoice/id/DeleteModal.jsx
import React from 'react';

export default function DeleteModal({ isOpen, onClose, onDelete, invoiceId }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose} />

            <div className="relative bg-white dark:bg-[#1E2139] w-full max-w-[480px] p-8 md:p-12 rounded-lg shadow-2xl animate-in fade-in zoom-in duration-200">
                <h2 className="text-[#0C0E17] dark:text-white text-[24px] font-bold mb-3 tracking-tight">
                    Confirm Deletion
                </h2>
                <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-[13px] leading-[22px] mb-4">
                    Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.
                </p>

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={onClose}
                        className="bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] px-6 py-4 rounded-full font-bold text-[15px] hover:bg-[#DFE3FA] dark:hover:bg-white dark:hover:text-[#7E88C3] transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="bg-[#EC5757] text-white px-6 py-4 rounded-full font-bold text-[15px] hover:bg-[#FF9797] transition-all"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}