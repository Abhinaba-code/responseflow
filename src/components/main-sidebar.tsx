import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarContent,
} from "@/components/ui/sidebar";
import { MessageCircle, LayoutGrid, BarChart3, SlidersHorizontal, Users, Settings, LifeBuoy, ShieldAlert, BookOpen, Bot, PieChart, CheckCircle, Search, Code, User, LogOut, Lock, Crown } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function MainSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      group: "Tools",
      items: [
        { href: "/dashboard", icon: LayoutGrid, label: "Inbox", plan: "free" },
        { href: "/dashboard/incidents", icon: ShieldAlert, label: "Incidents", plan: "free" },
        { href: "/dashboard/customers", icon: Users, label: "Customers", plan: "free" },
        { href: "/dashboard/knowledge", icon: BookOpen, label: "Knowledge", plan: "free" },
        { href: "/dashboard/search", icon: Search, label: "Search", plan: "pro" },
        { href: "/dashboard/developer", icon: Code, label: "Developer", plan: "pro" },
      ],
    },
    {
      group: "AI",
      items: [
        { href: "/dashboard/playbooks", icon: Bot, label: "Playbooks", plan: "pro" },
        { href: "/dashboard/automations", icon: SlidersHorizontal, label: "Automations", plan: "enterprise" },
      ],
    },
    {
        group: "Reporting",
        items: [
            { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics", plan: "pro" },
            { href: "/dashboard/teams", icon: PieChart, label: "Workload", plan: "enterprise" },
            { href: "/dashboard/quality", icon: CheckCircle, label: "Quality", plan: "enterprise" },
        ]
    }
  ];
  
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-7 h-7 text-primary" />
          <span className="text-lg font-semibold font-headline">ResponseFlow</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((group) => (
            <SidebarGroup key={group.group}>
               <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
               <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={{ children: item.label }}
                        className="flex justify-between"
                      >
                        <Link href={item.href}>
                          <div className="flex items-center gap-2">
                              <item.icon />
                              <span>{item.label}</span>
                          </div>
                          {item.plan === "pro" && <Lock className="h-3 w-3 text-yellow-500" />}
                          {item.plan === "enterprise" && <Crown className="h-3 w-3 text-purple-500" />}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
               </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
