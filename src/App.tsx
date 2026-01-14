import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Documents from "./pages/Documents";
import Calendar from "./pages/Calendar";
import AIAssistant from "./pages/AIAssistant";
import Consultations from "./pages/Consultations";
import Research from "./pages/Research";
import CaseAnalysis from "./pages/CaseAnalysis";
import Billing from "./pages/Billing";
import Referrals from "./pages/Referrals";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
              <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
              <Route path="/consultations" element={<ProtectedRoute><Consultations /></ProtectedRoute>} />
              <Route path="/research" element={<ProtectedRoute><Research /></ProtectedRoute>} />
              <Route path="/case-analysis" element={<ProtectedRoute><CaseAnalysis /></ProtectedRoute>} />
              <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
              <Route path="/referrals" element={<ProtectedRoute><Referrals /></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
              <Route path="/users/lawyers" element={<ProtectedRoute><Users /></ProtectedRoute>} />
              <Route path="/users/clients" element={<ProtectedRoute><Users /></ProtectedRoute>} />
              <Route path="/users/stats" element={<ProtectedRoute><Users /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
