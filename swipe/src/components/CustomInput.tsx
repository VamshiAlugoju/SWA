export type customInpProps = {

    id: string;
    name: string;
    label: string;
    type?: string;
    value: string | number | undefined;
    onChange: any
    onBlur: any
    disabled?: boolean
}

function CustomInputWithLabel({ id, name, label, type, value, onBlur, onChange: handleChange, disabled }: customInpProps) {
    return (<div className="w-full my-3 max-w-sm min-w-[200px]">
        <label className="block mb-2 text-sm text-slate-600 font-bold">
            {label}:
        </label>
        <input disabled={disabled} onChange={handleChange} name={name} id={id} type={type} value={value} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Name" />
    </div>)
}
export default CustomInputWithLabel