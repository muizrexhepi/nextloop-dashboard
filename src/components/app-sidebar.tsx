import {
  LayoutDashboard,
  List,
  FolderTree,
  Users,
  TrendingUp,
  CreditCard,
  BarChart3,
  MessageSquare,
  UserCog,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigationItems = [
  { id: "overview", label: "overview", icon: LayoutDashboard },
  { id: "listings", label: "listings", icon: List },
  { id: "categories", label: "categories", icon: FolderTree },
  { id: "users", label: "users", icon: Users },
  { id: "boosts", label: "boosts", icon: TrendingUp },
  { id: "payments", label: "payments", icon: CreditCard },
  { id: "analytics", label: "analytics", icon: BarChart3 },
  { id: "contacts", label: "contacts", icon: MessageSquare },
  { id: "staff", label: "staff", icon: UserCog },
];

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-4 py-3">
          <h1 className="text-2xl font-semibold tracking-tight">nextloop</h1>
          <p className="text-sm text-muted-foreground mt-1">Dashboard</p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.id)}
                    isActive={activeTab === item.id}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => console.log("Logging out...")}>
              <LogOut />
              <span>logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
