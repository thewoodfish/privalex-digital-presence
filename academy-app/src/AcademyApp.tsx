import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AcademyLayout from "@/pages/academy/AcademyLayout";
import AcademyHome from "@/pages/academy/AcademyHome";
import AcademyDataProtection from "@/pages/academy/AcademyDataProtection";
import AcademyInfoSecurity from "@/pages/academy/AcademyInfoSecurity";
import AcademyCybersecurity from "@/pages/academy/AcademyCybersecurity";
import AcademyAIGRC from "@/pages/academy/AcademyAIGRC";
import AcademyAllProgrammes from "@/pages/academy/AcademyAllProgrammes";
import AcademyMasterclasses from "@/pages/academy/AcademyMasterclasses";
import AcademyCorporateTraining from "@/pages/academy/AcademyCorporateTraining";
import AcademyAccreditations from "@/pages/academy/AcademyAccreditations";

const queryClient = new QueryClient();

const AcademyApp = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AcademyLayout />}>
            <Route index element={<AcademyHome />} />
            <Route path="school/data-protection" element={<AcademyDataProtection />} />
            <Route path="school/information-security" element={<AcademyInfoSecurity />} />
            <Route path="school/cybersecurity" element={<AcademyCybersecurity />} />
            <Route path="school/ai-grc" element={<AcademyAIGRC />} />
            <Route path="programmes" element={<AcademyAllProgrammes />} />
            <Route path="masterclasses" element={<AcademyMasterclasses />} />
            <Route path="corporate-training" element={<AcademyCorporateTraining />} />
            <Route path="accreditations" element={<AcademyAccreditations />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default AcademyApp;
