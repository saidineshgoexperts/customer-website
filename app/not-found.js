'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#037166] to-[#04a99d] bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The service you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <motion.button
            onClick={() => router.push('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-[#037166] to-[#04a99d] rounded-full text-white font-medium flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go Home
          </motion.button>
          <motion.button
            onClick={() => router.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border border-white/20 rounded-full text-white font-medium flex items-center gap-2 hover:border-[#037166]/50"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
