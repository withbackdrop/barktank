'use client';

import { ToastContainer } from 'react-toastify';

const Toaster = () => (
  <ToastContainer
    position="bottom-center"
    autoClose={5000}
    hideProgressBar={true}
    newestOnTop={true}
    closeOnClick={true}
    rtl={false}
    pauseOnFocusLoss={true}
    draggable={true}
    pauseOnHover={true}
  />
);

export default Toaster;
