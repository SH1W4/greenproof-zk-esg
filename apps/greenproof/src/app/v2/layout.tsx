"use client";

import React from 'react';
import V2Sidebar from '@/components/v2/V2Sidebar';
import V2Header from '@/components/v2/V2Header';

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-black text-slate-100 font-sans">
      <V2Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <V2Header />
        <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
          {children}
        </main>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1a2e21;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
