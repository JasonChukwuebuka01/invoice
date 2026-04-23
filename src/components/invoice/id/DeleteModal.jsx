import React, { useEffect, useRef } from 'react';

export default function DeleteModal({ isOpen, onClose, onDelete, invoiceId }) {
    const modalRef = useRef(null);
    const cancelButtonRef = useRef(null);

    // 1. Handle ESC key and Focus Management
    useEffect(() => {
        
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            
            if (e.key === 'Tab') {
                const focusableElements = modalRef.current.querySelectorAll('button');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) { // if shift + tab
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else { // if tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            // Auto-focus the cancel button when opened for safety
            cancelButtonRef.current?.focus();
            // Prevent scrolling the background when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    return (
        <div 
            className={`fixed inset-0 z-[100] flex items-center justify-center px-6 transition-all duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* Dark Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Box */}
            <div 
                ref={modalRef}
                className={`relative bg-white dark:bg-[#1E2139] w-full max-w-[480px] p-8 md:p-12 rounded-lg shadow-2xl transition-all duration-300 transform ${
                    isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
                }`}
            >
                <h2 id="modal-title" className="text-[#0C0E17] dark:text-white text-[24px] font-bold mb-3 tracking-tight transition-colors duration-300">
                    Confirm Deletion
                </h2>

                <p className="text-[#888EB0] dark:text-[#DFE3FA] text-[13px] leading-[22px] mb-4 transition-colors duration-300">
                    Are you sure you want to delete invoice <span className="font-bold text-[#0C0E17] dark:text-white">#{invoiceId}</span>? This action cannot be undone.
                </p>

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        ref={cancelButtonRef}
                        onClick={onClose}
                        className="bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] px-6 py-4 rounded-full font-bold text-[15px] hover:bg-[#DFE3FA] dark:hover:bg-white dark:hover:text-[#7E88C3] transition-all focus:outline-none focus:ring-2 focus:ring-purple-main"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onDelete}
                        className="bg-[#EC5757] text-white px-6 py-4 rounded-full font-bold text-[15px] hover:bg-[#FF9797] transition-all focus:outline-none focus:ring-2 focus:ring-purple-main"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}