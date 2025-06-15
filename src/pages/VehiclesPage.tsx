
import { VehicleManagement } from "@/components/VehicleManagement";
import { MainNavigation } from "@/components/MainNavigation";

const VehiclesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <div className="container mx-auto p-6">
        <VehicleManagement />
      </div>
    </div>
  );
};

export default VehiclesPage;
