import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { MessageCircle, LayoutGrid, BarChart3, SlidersHorizontal, Users, Settings, LifeBuoy, ShieldAlert, BookOpen, Bot, PieChart, CheckCircle, Search, Code, User, LogOut } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function MainSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", icon: LayoutGrid, label: "Inbox" },
    { href: "/dashboard/incidents", icon: ShieldAlert, label: "Incidents" },
    { href: "/dashboard/customers", icon: Users, label: "Customers" },
    { href: "/dashboard/knowledge", icon: BookOpen, label: "Knowledge" },
    { href: "/dashboard/playbooks", icon: Bot, label: "Playbooks" },
    { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/dashboard/automations", icon: SlidersHorizontal, label: "Automations" },
    { href: "/dashboard/teams", icon: PieChart, label: "Workload" },
    { href: "/dashboard/quality", icon: CheckCircle, label: "Quality" },
    { href: "/dashboard/search", icon: Search, label: "Search" },
    { href: "/dashboard/developer", icon: Code, label: "Developer" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];
  
  const footerMenuItems = [
    { href: "/dashboard/help", icon: LifeBuoy, label: "Help & Support" },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-7 h-7 text-primary" />
          <span className="text-lg font-semibold font-headline">ResponseFlow</span>
        </div>
      </SidebarHeader>
      
      <SidebarMenu className="flex-1">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={{ children: item.label }}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      
      <SidebarFooter className="mt-auto">
         {footerMenuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={{ children: item.label }}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarFooter>
    </Sidebar>
  );
}
