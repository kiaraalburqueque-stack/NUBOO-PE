import React from 'react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { hardware, setIsProfileOpen, setActiveTab, viewMode, setViewMode } = useApp();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#eefcff]/85 backdrop-blur-xl pt-safe shadow-[0_4px_20px_rgba(14,118,115,0.05)] border-b border-[#0e7673]/5">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Brand Lockup */}
        <div 
          onClick={() => setActiveTab('estado')}
          className="flex items-center gap-2 cursor-pointer select-none active:opacity-80 transition-opacity"
        >
          <img
            alt="NUBO-PE Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH6BXB_Ww8vneZ899foS9KGgKxDFKYsS-AOEbQFArO8smbIX3jep55xotoCa_Bi6BfVzZOIM22nLHo-9Pkt_q7YNKHz4e1R1Jg257FuRVL9ZYCpzvf94IdFhJ-iUYn_4Ys3ciQr2buSDgNeu8Jk-rOKfD__aFkpLyOi5woixvgxLlwx6gFs1QNXUQgPnTe2Pa5gU4mg4H6p3ZcAUKiG23rI5d9nI9YZGTR5d6JvkouzALX_u62k_45qA"
          />
          <span className="font-headline font-semibold text-lg text-[#005c59] tracking-tight">
            NUBO-PE
          </span>
        </div>

        {/* View Mode Toggle: App vs Kotlin */}
        <div className="flex items-center p-0.5 rounded-full bg-[#d6ecf1] border border-[#0e7673]/10">
          <button
            onClick={() => setViewMode('app')}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
              viewMode === 'app'
                ? 'bg-white text-[#005c59] shadow-sm'
                : 'text-[#3e4948] hover:text-[#0a1e22]'
            }`}
          >
            Vista App
          </button>
          <button
            onClick={() => setViewMode('kotlin')}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
              viewMode === 'kotlin'
                ? 'bg-[#005c59] text-white shadow-sm'
                : 'text-[#3e4948] hover:text-[#0a1e22]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7afbb1]" />
            Kotlin
          </button>
        </div>

        {/* Live Device Status Pill */}
        <button
          onClick={() => setActiveTab('dispositivo')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-[0_2px_8px_rgba(14,118,115,0.06)] hover:bg-white active:scale-95 transition-all text-left"
          title="Ver estado de hardware"
        >
          <span className={`w-2 h-2 rounded-full ${hardware.status === 'Conectado' ? 'bg-[#006d40] animate-pulse-subtle' : 'bg-amber-500'}`} />
          <span className="font-label text-xs text-[#0a1e22] font-medium">
            {hardware.status}
          </span>
        </button>

        {/* User Profile Avatar */}
        <button
          onClick={() => setIsProfileOpen(true)}
          className="flex items-center justify-center p-0.5 rounded-full hover:opacity-90 active:scale-95 transition-transform min-w-[44px] min-h-[44px]"
          aria-label="Perfil y configuración"
        >
          <img
            alt="Perfil Kiara"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-[#005c59]/20"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWBoSmp5iCyJ869trZqjVnAAza64QzFrRf0VuWFWiyq7_P7NzGiFlCpwY0keuq09oEOXcwgYyTF3pSroDWLEs7Dl_R2kDicc3MsxbE82f5Vm3P3dtbozDIKcAzMLDc7GknVzDcw9Nmz8eFE5s1esjPY1m7L-pkecfT-uk1b2FOn0cNoawuyqDnIO_Nq6dq9TpG6SQsHlntXgj-re4v50ffcG38g-f_vh8e4mqGq5cUcNvCU_U8enFFmg"
          />
        </button>
      </div>
    </header>
  );
};
