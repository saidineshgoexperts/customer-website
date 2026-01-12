import '../src/styles/globals.css';

export const metadata = {
  title: 'Next-Gen Dark Mode Super App',
  description: 'SuperHub - Your All-in-One Service Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
