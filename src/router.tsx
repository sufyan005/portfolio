import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type PageRoute = 'home' | 'about' | 'education' | 'projects' | 'skills' | 'contact';

export interface RouteMeta {
  id: PageRoute;
  label: string;
  path: string;
  title: string;
  order: number;
}

export const ROUTES: Record<PageRoute, RouteMeta> = {
  home: {
    id: 'home',
    label: 'HOME',
    path: '#/',
    title: 'Sufyan Siddiqui · Full-Stack & ML Engineer',
    order: 0,
  },
  about: {
    id: 'about',
    label: 'ABOUT',
    path: '#/about',
    title: 'About · Sufyan Siddiqui',
    order: 1,
  },
  education: {
    id: 'education',
    label: 'EDUCATION',
    path: '#/education',
    title: 'Education · Sufyan Siddiqui',
    order: 2,
  },
  projects: {
    id: 'projects',
    label: 'PROJECTS',
    path: '#/projects',
    title: 'Projects · Sufyan Siddiqui',
    order: 3,
  },
  skills: {
    id: 'skills',
    label: 'SKILLS',
    path: '#/skills',
    title: 'Skills Matrix · Sufyan Siddiqui',
    order: 4,
  },
  contact: {
    id: 'contact',
    label: 'CONTACT',
    path: '#/contact',
    title: 'Transmission & Contact · Sufyan Siddiqui',
    order: 5,
  },
};

export const ROUTE_LIST: RouteMeta[] = (Object.values(ROUTES) as RouteMeta[]).sort((a, b) => a.order - b.order);

const parseRouteFromHash = (hash: string): PageRoute => {
  const clean = hash.replace(/^#\/?/, '').toLowerCase().trim();
  if (clean === 'about') return 'about';
  if (clean === 'education') return 'education';
  if (clean === 'projects' || clean === 'work') return 'projects';
  if (clean === 'skills') return 'skills';
  if (clean === 'contact') return 'contact';
  return 'home';
};

interface RouterContextValue {
  currentPage: PageRoute;
  navigate: (page: PageRoute) => void;
  getRouteMeta: (page: PageRoute) => RouteMeta;
  getNextRoute: (page: PageRoute) => RouteMeta | null;
  getPrevRoute: (page: PageRoute) => RouteMeta | null;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => {
    if (typeof window !== 'undefined') {
      return parseRouteFromHash(window.location.hash);
    }
    return 'home';
  });

  const navigate = useCallback((page: PageRoute) => {
    setCurrentPage(page);
    const targetHash = page === 'home' ? '#/' : `#/${page}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }

    // Only scroll to top if not in a modal
    const scrollControl = (window as any).PortfolioScrollControl;
    const hasModal = document.querySelector('[class*="fixed inset-0 z-50"]') !== null;
    const isModalOpen = scrollControl?.isModalOpen() || hasModal;

    if (!isModalOpen) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    document.title = ROUTES[page].title;
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const page = parseRouteFromHash(window.location.hash);
      setCurrentPage(page);
      document.title = ROUTES[page].title;

      // Only scroll to top if not in a modal
      const scrollControl = (window as any).PortfolioScrollControl;
      const hasModal = document.querySelector('[class*="fixed inset-0 z-50"]') !== null;
      const isModalOpen = scrollControl?.isModalOpen() || hasModal;

      if (!isModalOpen) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    // Initial title
    document.title = ROUTES[currentPage].title;

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const getRouteMeta = useCallback((page: PageRoute) => ROUTES[page], []);

  const getNextRoute = useCallback((page: PageRoute): RouteMeta | null => {
    const currentIdx = ROUTE_LIST.findIndex((r) => r.id === page);
    if (currentIdx >= 0 && currentIdx < ROUTE_LIST.length - 1) {
      return ROUTE_LIST[currentIdx + 1];
    }
    return null;
  }, []);

  const getPrevRoute = useCallback((page: PageRoute): RouteMeta | null => {
    const currentIdx = ROUTE_LIST.findIndex((r) => r.id === page);
    if (currentIdx > 0) {
      return ROUTE_LIST[currentIdx - 1];
    }
    return null;
  }, []);

  return (
    <RouterContext.Provider
      value={{
        currentPage,
        navigate,
        getRouteMeta,
        getNextRoute,
        getPrevRoute,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextValue => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
