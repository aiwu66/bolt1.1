"use client";

import { Calculator } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-primary/5 via-background to-background overflow-hidden pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <Calculator className="h-12 w-12 text-primary animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse" />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          专业的在线计算工具
        </h1>
      </div>

      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-l from-primary/10 to-primary/5 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-tr from-primary/10 to-primary/5 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
        <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:32px_32px] opacity-60" />
      </div>
    </section>
  );
}