import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { ToastProvider } from './components/ui/Toast';
import { BookingProvider } from './hooks/useBooking';
import Spinner from './components/ui/Spinner';

const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Booking = lazy(() => import('./pages/Booking'));
const BookingConfirmation = lazy(() => import('./pages/BookingConfirmation'));
const About = lazy(() => import('./pages/About'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size={32} />
    </div>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastProvider>
          <BookingProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Suspense fallback={<PageLoader />}>
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <PageWrapper>
                            <Home />
                          </PageWrapper>
                        }
                      />
                      <Route
                        path="/menu"
                        element={
                          <PageWrapper>
                            <Menu />
                          </PageWrapper>
                        }
                      />
                      <Route
                        path="/book"
                        element={
                          <PageWrapper>
                            <Booking />
                          </PageWrapper>
                        }
                      />
                      <Route
                        path="/booking/confirmation"
                        element={
                          <PageWrapper>
                            <BookingConfirmation />
                          </PageWrapper>
                        }
                      />
                      <Route
                        path="/about"
                        element={
                          <PageWrapper>
                            <About />
                          </PageWrapper>
                        }
                      />
                    </Routes>
                  </AnimatePresence>
                </Suspense>
              </main>
              <Footer />
            </div>
          </BookingProvider>
        </ToastProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
