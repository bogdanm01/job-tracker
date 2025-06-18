import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import JobTrackingPage from "./pages/JobTrackingPage";
import OverviewPage from "./pages/OverviewPage";
import ReportingPage from "./pages/ReportingPage";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import DocumentsPage from "./pages/DocumentsPage";
import AICoverLetterPage from "./pages/AICoverLetterPage";
import AuthenticationLayout from "./layouts/AuthenticationLayout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/auth" element={<AuthenticationLayout />} />
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate to="/tracking" replace />} />
          <Route path="tracking" element={<JobTrackingPage />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="reporting" element={<ReportingPage />} />
          <Route path="resume" element={<ResumeBuilderPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="cover" element={<AICoverLetterPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
