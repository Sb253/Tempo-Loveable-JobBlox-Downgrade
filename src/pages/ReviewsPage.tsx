
import { ReviewManagement } from "@/components/ReviewManagement";
import { MainNavigation } from "@/components/MainNavigation";

const ReviewsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <div className="container mx-auto p-6">
        <ReviewManagement />
      </div>
    </div>
  );
};

export default ReviewsPage;
