
"use client";

import { useState } from "react";
import { Bell, LifeBuoy, LogOut, PanelLeft, Search, Settings, User, Wallet, PlusCircle, ArrowDownCircle, CreditCard, History } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { usePathname, useRouter } from "next/navigation";
import { WalletDialog } from "./wallet-dialog";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/context/wallet-context";
import { useUser } from "@/context/user-context";

const pageTitles: Record<string, string> = {
    '/dashboard': 'Unified Inbox',
    '/dashboard/analytics': 'Analytics',
    '/dashboard/automations': 'Automations',
    '/dashboard/billing': 'Billing',
    '/dashboard/customers': 'Customers',
    '/dashboard/developer': 'Developer',
    '/dashboard/developer/api-docs': 'API Documentation',
    '/dashboard/help': 'Help & Support',
    '/dashboard/incidents': 'Incidents',
    '/dashboard/knowledge': 'Knowledge',
    '/dashboard/notifications': 'Notifications',
    '/dashboard/playbooks': 'Playbooks',
    '/dashboard/quality': 'Quality',
    '/dashboard/search': 'Search',
    '/dashboard/settings': 'Settings',
    '/dashboard/teams': 'Teams & Workload',
    '/dashboard/history': 'Transaction History',
};


export function DashboardHeader() {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const title = pageTitles[pathname] || "Dashboard";
  const { toast } = useToast();
  const { balance, setBalance } = useWallet();
  const { name } = useUser();

  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);
  const [walletDialogMode, setWalletDialogMode] = useState<"add" | "withdraw">("add");

  const openWalletDialog = (mode: "add" | "withdraw") => {
    setWalletDialogMode(mode);
    setIsWalletDialogOpen(true);
  };

  const handleConfirmTransaction = (amount: number) => {
    if (walletDialogMode === "add") {
      setBalance(prev => prev + amount);
      toast({
        title: "Money Added",
        description: `₹${amount.toFixed(2)} has been added to your wallet.`,
      });
    } else {
      if (amount > balance) {
        toast({
          variant: "destructive",
          title: "Withdrawal Failed",
          description: "Insufficient balance.",
        });
        return;
      }
      setBalance(prev => prev - amount);
      toast({
        title: "Money Withdrawn",
        description: `₹${amount.toFixed(2)} has been withdrawn from your wallet.`,
      });
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = e.currentTarget.value;
      if (query.trim()) {
        router.push(`/dashboard/search?q=${encodeURIComponent(query)}`);
      }
    }
  };


  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:flex">
              <PanelLeft />
              <span className="sr-only">Toggle Sidebar</span>
          </Button>
          <h1 className="text-xl font-semibold hidden md:block">{title}</h1>
        </div>

        <div className="flex-1 flex justify-center px-4">
              <div className="w-full max-w-md">
                  <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search everything..." 
                        className="pl-9"
                        onKeyDown={handleSearch}
                      />
                  </div>
              </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden md:flex items-center gap-2">
                      <Wallet />
                      <span>₹{balance.toFixed(2)}</span>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                   <DropdownMenuLabel>Wallet</DropdownMenuLabel>
                   <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => openWalletDialog("add")}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>Add Money</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => openWalletDialog("withdraw")}>
                      <ArrowDownCircle className="mr-2 h-4 w-4" />
                      <span>Withdraw Money</span>
                  </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>

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
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${name}`} alt={name} />
                          <AvatarFallback>{name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                      </Avatar>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem asChild>
                      <Link href="/dashboard/settings?tab=profile">
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
                    <Link href="/dashboard/billing">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                    </Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                    <Link href="/dashboard/history">
                        <History className="mr-2 h-4 w-4" />
                        <span>History</span>
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
                      <Link href="/">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                      </Link>
                  </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <WalletDialog
        open={isWalletDialogOpen}
        onOpenChange={setIsWalletDialogOpen}
        mode={walletDialogMode}
        onConfirm={handleConfirmTransaction}
      />
    </>
  );
}
