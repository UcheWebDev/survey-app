
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import UserSurvey from "./pages/UserSurvey";
import ServiceProviderSurvey from "./pages/ServiceProviderSurvey";
import RealEstateSurvey from "./pages/RealEstateSurvey";
import SurveyComplete from "./pages/SurveyComplete";
import SurveyDashboard from "./pages/SurveyDashboard";

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
          <Route path="/survey/user" element={<UserSurvey />} />
          <Route path="/survey/service-provider" element={<ServiceProviderSurvey />} />
          <Route path="/survey/real-estate" element={<RealEstateSurvey />} />
          <Route path="/survey/complete" element={<SurveyComplete />} />
          <Route path="/dashboard" element={<SurveyDashboard />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
