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
    // Help & Support is moved to the profile dropdown
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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                 <div className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-sidebar-accent cursor-pointer">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Jane Doe" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-sm overflow-hidden group-data-[collapsible=icon]:hidden">
                        <span className="font-semibold truncate">Jane Doe</span>
                        <span className="text-muted-foreground truncate">jane.doe@example.com</span>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                        <User className="mr-2 h-4 w-4" />
                        <span>Edit Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/help">
                        <LifeBuoy className="mr-2 h-4 w-4" />
                        <span>Help & Support</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                     <Link href="/login">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
