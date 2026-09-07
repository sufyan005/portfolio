import React from 'react';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { useRouter, PageRoute } from '../router';

interface PagePaginationProps {
  prevPage?: PageRoute | null;
  prevLabel?: string;
  nextPage?: PageRoute | null;
  nextLabel?: string;
}

export const PagePagination: React.FC<PagePaginationProps> = ({
  prevPage,
  prevLabel,
  nextPage,
  nextLabel,
}) => {
  const { navigate, getPrevRoute, getNextRoute, currentPage } = useRouter();

  const prevRoute = prevPage ? { id: prevPage, label: prevLabel } : getPrevRoute(currentPage);
  const nextRoute = nextPage ? { id: nextPage, label: nextLabel } : getNextRoute(currentPage);

  return (
    <nav
      aria-label="Section Pagination"
      className="mt-14 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      {/* Previous Section */}
      <div className="w-full sm:w-auto">
        {prevRoute ? (
          <button
            onClick={() => navigate(prevRoute.id as PageRoute)}
            className="w-full sm:w-auto flex items-center justify-start sm:justify-start gap-2.5 px-4 py-2.5 bg-[#0E0E0E] hover:bg-white/[0.06] border border-white/15 hover:border-[#F27D26] text-white/70 hover:text-white transition-all group font-['JetBrains_Mono'] text-xs tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#F27D26] group-hover:-translate-x-1 transition-transform" />
            <div className="flex flex-col items-start text-left">
              <span className="text-[9px] text-white/40 uppercase tracking-[0.2em]">PREVIOUS SECTION</span>
              <span className="font-bold text-white uppercase">{prevRoute.label}</span>
            </div>
          </button>
        ) : (
          <button
            onClick={() => navigate('home')}
            className="w-full sm:w-auto flex items-center gap-2 px-4 py-2.5 bg-[#0E0E0E] hover:bg-white/[0.06] border border-white/15 hover:border-white/30 text-white/60 hover:text-white transition-all font-['JetBrains_Mono'] text-xs tracking-wider"
          >
            <Home className="w-3.5 h-3.5 text-[#F27D26]" />
            <span>RETURN TO HOME</span>
          </button>
        )}
      </div>

      {/* Return to Home Quick Action */}
      {currentPage !== 'home' && prevRoute && nextRoute && (
        <button
          onClick={() => navigate('home')}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-['JetBrains_Mono'] uppercase tracking-[0.2em] text-white/40 hover:text-[#F27D26] transition-colors"
        >
          <Home className="w-3 h-3" />
          <span>PORTAL HOME</span>
        </button>
      )}

      {/* Next Section */}
      <div className="w-full sm:w-auto flex justify-end">
        {nextRoute ? (
          <button
            onClick={() => navigate(nextRoute.id as PageRoute)}
            className="w-full sm:w-auto flex items-center justify-end gap-2.5 px-4 py-2.5 bg-[#0E0E0E] hover:bg-white/[0.06] border border-white/15 hover:border-[#F27D26] text-white/70 hover:text-white transition-all group font-['JetBrains_Mono'] text-xs tracking-wider"
          >
            <div className="flex flex-col items-end text-right">
              <span className="text-[9px] text-white/40 uppercase tracking-[0.2em]">NEXT SECTION</span>
              <span className="font-bold text-white uppercase">{nextRoute.label}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#F27D26] group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            onClick={() => navigate('home')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F27D26] hover:bg-[#FF9142] text-[#080808] font-bold transition-all font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase"
          >
            <Home className="w-3.5 h-3.5" />
            <span>BACK TO HOME PORTAL</span>
          </button>
        )}
      </div>
    </nav>
  );
};
