
import { ButtonHTMLAttributes, ReactNode } from "react"

import { CgSpinner } from 'react-icons/cg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
    loading?: boolean;
    children: ReactNode
}

export function Button({ loading, children, ...rest }: ButtonProps) {
    return (
        <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-base px-5 py-2.5 text-center "
            disabled={loading}
            {...rest}
        >
            {loading ? (
                <CgSpinner className="animate-spin cursor-not-allowed mx-auto" color="#FFFFFF" size={24} />
            ) : (
                <a className="flex flex-row items-center justify-center">{children}</a>
            )}

        </button>
    )
}