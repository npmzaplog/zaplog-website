// src/App.tsx
import React, { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CodeExample from "@/components/CodeExample";
import LogLevels from "@/components/LogLevels";
import Configuration from "@/components/Configuration";
// import { useInView } from "react-intersection-observer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white transition-opacity duration-500 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <Toaster />
      <Header />
      <main>
        <Hero />
        <Features />
        <CodeExample />
        <LogLevels />
        <Configuration />
      </main>
      <Footer />
    </div>
  );
};

export default App;
