import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Success from "./ui/Success";
import Home from "./ui/Home";
import PageNotFound from "./ui/PageNotFound";
import Projects from "./components/Projects";
import Project from "./components/Project";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 50000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="project/:projectId" element={<Project />} />
          </Route>
          <Route path="success" element={<Success />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

("use client");
