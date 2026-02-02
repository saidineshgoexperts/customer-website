import './globals.css';
import { Comfortaa } from 'next/font/google';
import { LocationProvider } from './context/LocationContext';
import { AuthProvider } from './context/AuthContext';
import { AuthModalProvider } from './context/AuthModalContext';
import { CartProvider } from './context/CartContext';
import { ServiceCartProvider } from './context/ServiceCartContext';
import { ClientProviders } from './components/providers/ClientProviders';


const comfortaa = Comfortaa({
  subsets: ['latin'],
  variable: '--font-comfortaa',
  display: 'swap',
});

export const metadata = {
  title: 'Next-Gen Dark Mode Super App',
  description: 'SuperHub - Your All-in-One Service Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${comfortaa.variable} font-comfortaa bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden`}>
        <LocationProvider>
          <AuthProvider>
            <AuthModalProvider>
              <CartProvider>
                <ServiceCartProvider>
                  <ClientProviders>

                    {children}
                  </ClientProviders>
                </ServiceCartProvider>
              </CartProvider>
            </AuthModalProvider>
          </AuthProvider>
        </LocationProvider>
      </body>
    </html>
  );
}
