import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import PageContainer from "./components/layout/PageContainer";
import Dashboard from "./pages/Dashboard";
import IncidentDetails from "./pages/IncidentDetails";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <PageContainer>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/incident/:id" element={<IncidentDetails />} />
          </Routes>
        </PageContainer>
      </div>
    </BrowserRouter>
  );
}

