import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Documents from "./pages/Documents";
import Calendar from "./pages/Calendar";
import AIAssistant from "./pages/AIAssistant";
import Consultations from "./pages/Consultations";
import Research from "./pages/Research";
import CaseAnalysis from "./pages/CaseAnalysis";
import Billing from "./pages/Billing";
import Referrals from "./pages/Referrals";
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
          <Route path="/documents" element={<Documents />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/research" element={<Research />} />
          <Route path="/case-analysis" element={<CaseAnalysis />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
