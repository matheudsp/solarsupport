
import { ButtonHTMLAttributes, ReactNode } from "react"

import { CgSpinner } from 'react-icons/cg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
    loading?: boolean;
    children: ReactNode;
    classname?:string
}

export function Button({ loading,classname, children, ...rest}: ButtonProps) {
    return (
        <button className={` text-white  font-medium rounded-lg text-base px-5 py-2.5 text-center ${classname}`}
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