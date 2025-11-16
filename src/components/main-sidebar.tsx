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
import { MessagesSquare, LayoutGrid, BarChart3, SlidersHorizontal, Users, Settings, LifeBuoy, ShieldAlert, BookOpen, Bot, PieChart, CheckCircle, Code } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";


export function MainSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      group: "Tools",
      items: [
        { href: "/dashboard", icon: LayoutGrid, label: "Inbox" },
        { href: "/dashboard/incidents", icon: ShieldAlert, label: "Incidents" },
        { href: "/dashboard/customers", icon: Users, label: "Customers" },
        { href: "/dashboard/knowledge", icon: BookOpen, label: "Knowledge" },
        { href: "/dashboard/developer", icon: Code, label: "Developer", plan: "Pro" },
      ],
    },
    {
      group: "AI",
      items: [
        { href: "/dashboard/playbooks", icon: Bot, label: "Playbooks", plan: "Pro" },
        { href: "/dashboard/automations", icon: SlidersHorizontal, label: "Automations", plan: "Enterprise" },
      ],
    },
    {
        group: "Reporting",
        items: [
            { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics", plan: "Pro" },
            { href: "/dashboard/teams", icon: PieChart, label: "Workload", plan: "Enterprise" },
            { href: "/dashboard/quality", icon: CheckCircle, label: "Quality", plan: "Enterprise" },
        ]
    }
  ];
  
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <MessagesSquare className="w-7 h-7 text-primary" />
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
                           {item.plan && (
                            <Badge 
                              variant="outline" 
                              className={`
                                text-xs h-5 px-1.5
                                ${item.plan === "Pro" ? "text-yellow-600 border-yellow-500/50" : ""}
                                ${item.plan === "Enterprise" ? "text-purple-600 border-purple-500/50" : ""}
                              `}
                            >
                              {item.plan}
                            </Badge>
                          )}
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
