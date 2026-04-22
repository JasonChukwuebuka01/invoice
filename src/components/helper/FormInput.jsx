
export const FormInput = ({ label, name, type = "text", placeholder = "", gridClass = "", value, error, onChange }) => (
    
    <div className={`flex flex-col gap-2 ${gridClass}`}>
        <div className="flex justify-between">
            <label className={`text-[13px] font-medium ${error ? 'text-red-500' : 'text-[#7E88C3] dark:text-[#DFE3FA]'}`}>{label}</label>
            {error && <span className="text-red-500 text-[10px] font-semibold">{error}</span>}
        </div>
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full p-4 rounded-md border bg-transparent dark:text-white font-bold text-[13px] focus:border-purple-main transition-all outline-none ${error ? 'border-red-500' : 'border-[#DFE3FA] dark:border-[#252945]'}`}
        />
    </div>
);