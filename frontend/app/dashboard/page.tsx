import { Dashboard } from "../_components/dashboard";
import { Header } from "../_components/header";

/**
 * Página do Dashboard
 * Rota: /dashboard
 */
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      <Dashboard />
    </div>
  );
}

