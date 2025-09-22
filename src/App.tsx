import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CensusIndicators from "./pages/CensusIndicators";
import Registers from "./pages/Registers";
import Datasets from "./pages/Datasets";
import Dissemination from "./pages/Dissemination";
import NotFound from "./pages/NotFound";
import { Layout } from "./components/Layout";
import JSONEditor from "./components/JotaiEditor";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { jsonDataAtom } from "./lib/utils";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [getData, setData] = useAtom(jsonDataAtom);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.techdarshak.com/getData");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Keep existing data on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/indicators"
              element={
                <Layout>
                  <CensusIndicators />
                </Layout>
              }
            />
            <Route
              path="/registers"
              element={
                <Layout>
                  <Registers />
                </Layout>
              }
            />
            <Route
              path="/datasets"
              element={
                <Layout>
                  <Datasets />
                </Layout>
              }
            />
            <Route
              path="/dissemination"
              element={
                <Layout>
                  <Dissemination />
                </Layout>
              }
            />
            <Route
              path="/admin"
              element={
                <Layout>
                  <JSONEditor />
                </Layout>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
