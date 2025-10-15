import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { OverviewContent } from "@/components/overview/OverviewContent";
import { ListingsContent } from "@/components/listings/ListingsContent";
import { CategoriesContent } from "@/components/categories/CategoriesContent";
import { UsersContent } from "@/components/users/UsersContent";
import { BoostsContent } from "@/components/boosts/BoostsContent";
import { PaymentsContent } from "@/components/payments/PaymentsContent";
import { AnalyticsContent } from "@/components/analytics/AnalyticsContent";
import { ContactsContent } from "@/components/contacts/ContactsContent";
import { StaffContent } from "@/components/staff/StaffContent";

function App() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewContent />;
      case "listings":
        return <ListingsContent />;
      case "categories":
        return <CategoriesContent />;
      case "users":
        return <UsersContent />;
      case "boosts":
        return <BoostsContent />;
      case "payments":
        return <PaymentsContent />;
      case "analytics":
        return <AnalyticsContent />;
      case "contacts":
        return <ContactsContent />;
      case "staff":
        return <StaffContent />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-auto">
          <div className="border-b p-4 flex items-center">
            <SidebarTrigger />
          </div>
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;
