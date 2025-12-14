import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TrackPage from "./pages/TrackPage";
import TurtlesPage from "./pages/TurtlesPage";
import TurtleDetailPage from "./pages/TurtleDetailPage";
import BeachesPage from "./pages/BeachesPage";
import EducationPage from "./pages/EducationPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import TurtleGuardianChat from "./components/TurtleGuardianChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/turtles" element={<TurtlesPage />} />
          <Route path="/turtles/:id" element={<TurtleDetailPage />} />
          <Route path="/beaches" element={<BeachesPage />} />
          <Route path="/beaches/:id" element={<BeachesPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <TurtleGuardianChat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
