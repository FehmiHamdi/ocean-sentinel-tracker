import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import TrackPage from "./pages/TrackPage";
import TurtlesPage from "./pages/TurtlesPage";
import TurtleDetailPage from "./pages/TurtleDetailPage";
import BeachesPage from "./pages/BeachesPage";
import EducationPage from "./pages/EducationPage";
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import VolunteerAuthPage from "./pages/VolunteerAuthPage";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import NotFound from "./pages/NotFound";
import TurtleGuardianChat from "./components/TurtleGuardianChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/track" element={<TrackPage />} />
            <Route path="/turtles" element={<TurtlesPage />} />
            <Route path="/turtles/:id" element={<TurtleDetailPage />} />
            <Route path="/beaches" element={<BeachesPage />} />
            <Route path="/beaches/:id" element={<BeachesPage />} />
            <Route path="/education" element={<EducationPage />} />
            
            {/* Auth Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/volunteer/login" element={<VolunteerAuthPage />} />
            
            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            
            {/* Protected Volunteer Routes */}
            <Route
              path="/volunteer"
              element={
                <ProtectedRoute allowedRoles={['volunteer']}>
                  <VolunteerDashboard />
                </ProtectedRoute>
              }
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <TurtleGuardianChat />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
