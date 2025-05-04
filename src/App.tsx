
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Pages
import Index from "./pages/Index";
import CarsPage from "./pages/CarsPage";
import CarDetailPage from "./pages/CarDetailPage";
import AuthPage from "./pages/AuthPage";
import BookingPage from "./pages/BookingPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/:id" element={<CarDetailPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/:action" element={<AuthPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:tab" element={<ProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
