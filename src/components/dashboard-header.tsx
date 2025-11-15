"use client";

import { Bell, LifeBuoy, LogOut, PanelLeft, Search, Settings, User } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { usePathname } from "next/navigation";
import { MainSidebar } from "./main-sidebar";

const pageTitles: Record<string, string> = {
    '/dashboard': 'Unified Inbox',
    '/dashboard/analytics': 'Analytics',
    '/dashboard/automations': 'Automations',
    '/dashboard/customers': 'Customers',
    '/dashboard/developer': 'Developer',
    '/dashboard/help': 'Help & Support',
    '/dashboard/incidents': 'Incidents',
    '/dashboard/knowledge': 'Knowledge',
    '/dashboard/notifications': 'Notifications',
    '/dashboard/playbooks': 'Playbooks',
    '/dashboard/quality': 'Quality',
    '/dashboard/search': 'Search',
    '/dashboard/settings': 'Settings',
    '/dashboard/teams': 'Teams & Workload',
};


export function DashboardHeader() {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Dashboard";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background px-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <PanelLeft />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

       <div className="flex-1 flex justify-center px-4">
            <div className="w-full max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search everything..." className="pl-9" />
                </div>
            </div>
       </div>

       <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/notifications">
            <Bell />
            <span className="sr-only">Notifications</span>
            </Link>
        </Button>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Jane Doe" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </Button>
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
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
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
       </div>
    </header>
  );
}
