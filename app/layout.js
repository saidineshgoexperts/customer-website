import './globals.css';
import { LocationProvider } from './context/LocationContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ServiceCartProvider } from './context/ServiceCartContext';

export const metadata = {
  title: 'Next-Gen Dark Mode Super App',
  description: 'SuperHub - Your All-in-One Service Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden">
        <LocationProvider>
          <AuthProvider>
            <CartProvider>
              <ServiceCartProvider>
                {children}
              </ServiceCartProvider>
            </CartProvider>
          </AuthProvider>
        </LocationProvider>
      </body>
    </html>
  );
}
