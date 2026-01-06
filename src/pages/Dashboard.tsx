import { useAuth } from "@/contexts/AuthContext";
import { LawyerDashboard } from "@/components/dashboard/LawyerDashboard";
import { ClientDashboard } from "@/components/dashboard/ClientDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  // Render role-specific dashboard
  switch (user?.role) {
    case 'lawyer':
      return <LawyerDashboard />;
    case 'client':
      return <ClientDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <LawyerDashboard />;
  }
};

export default Dashboard;