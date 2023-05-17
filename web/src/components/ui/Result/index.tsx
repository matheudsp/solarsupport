
import { ReactNode } from "react"

import { CgSpinner } from 'react-icons/cg'

interface ButtonProps {
    loading?: boolean;
    children: ReactNode;
    label: string;
}

export function Result({ loading, children, label }: ButtonProps) {
    return (
        <div className="w-full py-2 bg-primary-400 text-slate-800 shadow-lg transition rounded-lg">
            <p className="text-center text-sm">{label}</p>
            {loading ? (
                <CgSpinner className="animate-spin cursor-not-allowed mx-auto" color="#FFFFFF" size={24} />
            ) : (
                <div className="w-full text-center"><p className="text-lg font-semibold">{children}</p></div>
            )}

        </div>
    )
}