import RecentInvoices from "../components/dashboard/RecentInvoices";
import Statscard from "../components/dashboard/statscard";
import StatsInfo from "../components/dashboard/StatsInfo";


const Dashboard = () => {
  return (
    <div className="space-y-8">
     <StatsInfo/>


       {/* Stats */}
       <Statscard />


       {/* recent invoices */}
       <RecentInvoices />

    </div>
    
    
  );
};

export default Dashboard;