import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Onboard from "./pages/Onboard.tsx";
import Audit from "./pages/Audit.tsx";
import { DashboardLayout } from "./components/DashboardLayout.tsx";
import DashboardHome from "./pages/dashboard/DashboardHome.tsx";
import Regulatory from "./pages/dashboard/Regulatory.tsx";
import DSR from "./pages/dashboard/DSR.tsx";
import DPIA from "./pages/dashboard/DPIA.tsx";
import Vendor from "./pages/dashboard/Vendor.tsx";
import Breach from "./pages/dashboard/Breach.tsx";
import Annual from "./pages/dashboard/Annual.tsx";
import PolicyGenerator from "./pages/dashboard/PolicyGenerator.tsx";
import CalendarPage from "./pages/dashboard/CalendarPage.tsx";
import Training from "./pages/dashboard/Training.tsx";
import Consent from "./pages/dashboard/Consent.tsx";
import Insurance from "./pages/dashboard/Insurance.tsx";
import Transfers from "./pages/dashboard/Transfers.tsx";
import VerifiedBadge from "./pages/dashboard/VerifiedBadge.tsx";
import ManagedService from "./pages/dashboard/ManagedService.tsx";
import Investor from "./pages/Investor.tsx";
import InvestorDashboardLayout from "./pages/InvestorDashboard.tsx";
import InvestorNewAssessment from "./pages/InvestorNewAssessment.tsx";
import InvestorReport from "./pages/InvestorReport.tsx";
import PractitionerLanding from "./pages/practitioner/PractitionerLanding.tsx";
import { PractitionerLayout } from "./components/PractitionerLayout.tsx";
import Portfolio from "./pages/practitioner/Portfolio.tsx";
import ClientDetail from "./pages/practitioner/ClientDetail.tsx";
import Deadlines from "./pages/practitioner/Deadlines.tsx";
import Reports from "./pages/practitioner/Reports.tsx";
import Billing from "./pages/practitioner/Billing.tsx";
import PractitionerOnboard from "./pages/practitioner/PractitionerOnboard.tsx";
import InvestorOnboard from "./pages/InvestorOnboard.tsx";
import ConsultantOnboard from "./pages/ConsultantOnboard.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import { ComplianceProvider } from "./state/ComplianceContext.tsx";
import { CalendarProvider } from "./state/CalendarContext.tsx";
import { AuthProvider, useAuth } from "./state/AuthContext.tsx";
import { RequireAuth } from "./components/auth/RequireAuth.tsx";
import { SplashScreen } from "./components/SplashScreen.tsx";

const queryClient = new QueryClient();

// Root: send logged-in users to their hero, guests to /login
const RootRedirect = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!user.profileComplete) {
    if (user.userType === "practitioner") return <Navigate to="/practitioner/onboard" replace />;
    if (user.userType === "consultant") return <Navigate to="/consultant/onboard" replace />;
    if (user.userType === "investor") return <Navigate to="/investor/onboard" replace />;
    return <Navigate to="/onboard" replace />;
  }
  return <Index />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SplashScreen>
      <AuthProvider>
        <ComplianceProvider>
          <CalendarProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<RootRedirect />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/onboard" element={<RequireAuth><Onboard /></RequireAuth>} />
                <Route path="/audit" element={<RequireAuth><Audit /></RequireAuth>} />
                <Route path="/dashboard" element={<RequireAuth><DashboardLayout /></RequireAuth>}>
                  <Route index element={<DashboardHome />} />
                  <Route path="policy-generator" element={<PolicyGenerator />} />
                  <Route path="calendar" element={<CalendarPage />} />
                  <Route path="regulatory" element={<Regulatory />} />
                  <Route path="dsr" element={<DSR />} />
                  <Route path="dpia" element={<DPIA />} />
                  <Route path="vendor" element={<Vendor />} />
                  <Route path="breach" element={<Breach />} />
                  <Route path="training" element={<Training />} />
                  <Route path="consent" element={<Consent />} />
                  <Route path="insurance" element={<Insurance />} />
                  <Route path="transfers" element={<Transfers />} />
                  <Route path="verified-badge" element={<VerifiedBadge />} />
                  <Route path="managed-service" element={<ManagedService />} />
                  <Route path="annual" element={<Annual />} />
                  <Route path="filing" element={<Annual />} />
                </Route>

                <Route path="/practitioner" element={<PractitionerLanding />} />
                <Route path="/practitioner/onboard" element={<RequireAuth><PractitionerOnboard /></RequireAuth>} />
                <Route path="/consultant/onboard" element={<RequireAuth><ConsultantOnboard /></RequireAuth>} />
                <Route path="/investor/onboard" element={<RequireAuth><InvestorOnboard /></RequireAuth>} />
                <Route path="/practitioner" element={<RequireAuth><PractitionerLayout /></RequireAuth>}>
                  <Route path="dashboard" element={<Portfolio />} />
                  <Route path="client/:id" element={<ClientDetail />} />
                  <Route path="deadlines" element={<Deadlines />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="billing" element={<Billing />} />
                </Route>

                <Route path="/investor" element={<Investor />} />
                <Route path="/investor/dashboard" element={<RequireAuth><InvestorDashboardLayout /></RequireAuth>}>
                  <Route path="new-assessment" element={<InvestorNewAssessment />} />
                  <Route path="report" element={<InvestorReport />} />
                  <Route path="billing" element={<InvestorReport />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CalendarProvider>
        </ComplianceProvider>
      </AuthProvider>
      </SplashScreen>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
