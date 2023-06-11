import { Children, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { }

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    children: ReactNode
 }

 
 export function Input({ children, ...rest }: InputProps) {
    return (
      <div className="">
        <input
          style={{ MozAppearance: "textfield", WebkitAppearance: "none" }}
          className="bg-gray-50 border-2 border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          {...rest}
        />
        <div className="hidden md:block ">
        {children && (
          <div className=" absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500  w-10 bg-gray-50 rounded-lg  p-2.5 items-center justify-center flex">
            {children}
          </div>
        )}
      </div>
      </div>
    );
  }

export function TextArea({ ...rest }: TextAreaProps) {
    return (
        <textarea
            className="bg-gray-50  border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            {...rest}>
        </textarea>
    )
}

export function Select({ children,...rest }: SelectProps) {
    return (
        <select
            className="bg-gray-50  border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            {...rest}>
                {children}
        </select>
    )
}