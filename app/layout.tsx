import './globals.css';
import 'react-toastify/dist/ReactToastify.min.css';

import { ReactNode } from 'react';

import localFont from 'next/font/local';

import Toaster from '@/modules/application/components/Toaster';
import { SessionContextProvider } from '@/modules/application/contexts/SessionContext';
import { MODAL_ROOT_ID } from '@/modules/application/utils/modals';

// load font
const satoshi = localFont({ src: '../fonts/satoshi/Satoshi-Variable.woff2', variable: '--font-satoshi' });

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${satoshi.variable} bg-gray-50 font-sans text-gray-900`}>
        <SessionContextProvider>
          {children}
          <Toaster />
          <div id={MODAL_ROOT_ID} />
        </SessionContextProvider>
      </body>
    </html>
  );
}
