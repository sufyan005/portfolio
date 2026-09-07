import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useRouter, ROUTE_LIST } from '../router';

export const BottomDock: React.FC = () => {
  const { currentPage, navigate } = useRouter();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Portfolio Bottom Sticky Dock"
      className="fixed bottom-2 sm:bottom-4 inset-x-0 z-40 flex justify-center pointer-events-none px-1 min-[360px]:px-2 sm:px-3 pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="pointer-events-auto h-8 min-[360px]:h-9 sm:h-11 max-w-[calc(100vw-0.5rem)] sm:max-w-max overflow-x-auto scrollbar-none px-1.5 min-[360px]:px-2 sm:px-4 rounded-full bg-[#080808]/95 backdrop-blur-xl border border-white/20 shadow-[0_12px_36px_rgba(0,0,0,0.85)] flex items-center justify-center gap-0.5 min-[360px]:gap-1 sm:gap-2.5 shrink-0">
        {ROUTE_LIST.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-0.5 min-[360px]:gap-1 sm:gap-1.5 h-6 min-[360px]:h-7 sm:h-8 px-1.5 min-[360px]:px-2 sm:px-2.5 text-[8px] min-[360px]:text-[9px] sm:text-[11px] font-['JetBrains_Mono'] uppercase tracking-[0.01em] min-[360px]:tracking-[0.04em] sm:tracking-[0.18em] transition-all whitespace-nowrap shrink-0 rounded-full ${
                isActive
                  ? 'text-white font-bold bg-white/[0.08]'
                  : 'text-white/50 hover:text-[#F27D26] hover:bg-white/[0.04]'
              }`}
            >
              {isActive && (
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#F27D26] inline-block shadow-[0_0_8px_#F27D26] shrink-0"></span>
              )}
              <span>{item.label}</span>
            </button>
          );
        })}

        <div className="w-px h-3 sm:h-4 bg-white/15 mx-0.5 sm:mx-1 shrink-0" />

        <button
          onClick={handleScrollToTop}
          className="flex items-center justify-center w-5 h-5 min-[360px]:w-6 min-[360px]:h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.04] hover:bg-[#F27D26] text-white/50 hover:text-[#080808] border border-white/10 transition-all shrink-0"
          title="Back to Top of Page"
          aria-label="Back to Top of Page"
        >
          <ArrowUp className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>
    </nav>
  );
};
