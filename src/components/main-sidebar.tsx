import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { MessageCircle, LayoutGrid, BarChart3, SlidersHorizontal, Users, Settings, Bell, LifeBuoy } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export function MainSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", icon: LayoutGrid, label: "Inbox" },
    { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/dashboard/automations", icon: SlidersHorizontal, label: "Automations" },
    { href: "/dashboard/teams", icon: Users, label: "Teams" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];
  
  const footerMenuItems = [
    { href: "/dashboard/help", icon: LifeBuoy, label: "Help & Support" },
    { href: "/dashboard/notifications", icon: Bell, label: "Notifications" },
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
        <div className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-sidebar-accent">
            <Avatar className="h-9 w-9">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Jane Doe" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm overflow-hidden group-data-[collapsible=icon]:hidden">
                <span className="font-semibold truncate">Jane Doe</span>
                <span className="text-muted-foreground truncate">jane.doe@example.com</span>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
