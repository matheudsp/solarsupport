import { AuthAdminProvider } from '@/contexts/AdminContext';
import { AuthUserContext, AuthUserProvider } from '@/contexts/UserContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthAdminProvider>
      <AuthUserProvider>
        <div className={inter.className}>
          <Component {...pageProps} />
        </div>
        <ToastContainer autoClose={3000} />
      </AuthUserProvider>
    </AuthAdminProvider>
  )
}
