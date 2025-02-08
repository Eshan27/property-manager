"use client"

import { Button } from '@/components/ui/button'
import { ArrowRight } from "lucide-react";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();
  const handleNavigation = () => {
    router.push("/properties"); // Redirects to the properties page
  };

  return (
    <motion.div
      initial={{ x: 0, opacity: 1 }}
      exit={{ x: -1000, opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">WELCOME TO NEST QUEST BY VIREC!</h1>
        <p className="text-xl text-gray-600">THE QUEST TO YOUR NEST LANDS HERE!</p>
        <div className='mt-10'>
          <Button className="font-bold" onClick={handleNavigation}>
            Let's find your nest!<ArrowRight />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
