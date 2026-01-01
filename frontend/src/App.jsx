import Navbar from "./components/layout/Navbar";
import PageContainer from "./components/layout/PageContainer";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <PageContainer>
        <Dashboard />
      </PageContainer>
    </div>
  );
}

