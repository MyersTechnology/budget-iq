
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  CreditCard, 
  HelpCircle, 
  Home, 
  Link as LinkIcon,
  LogOut, 
  PiggyBank,
  Settings, 
  Shield,
  Sparkles,
  Target,
  UserPlus,
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { 
    icon: Home, 
    label: "Dashboard", 
    href: "/",
  },
  { 
    icon: BarChart3, 
    label: "Trends & AI Insights", 
    href: "/trends",
  },
  { 
    icon: PiggyBank, 
    label: "AI Budget", 
    href: "/budget",
  },
  { 
    icon: LinkIcon, 
    label: "Connected Accounts", 
    href: "/accounts",
  },
  { 
    icon: CalendarClock, 
    label: "Recurring Expenses", 
    href: "/recurring",
  },
  { 
    icon: Target, 
    label: "Financial Goals", 
    href: "/goals",
  },
  { 
    icon: Settings, 
    label: "Settings", 
    href: "/settings",
  },
  { 
    icon: Shield, 
    label: "Security & Privacy", 
    href: "/security",
  },
  { 
    icon: UserPlus, 
    label: "Refer a Friend", 
    href: "/refer",
  },
];

const NavigationMenu = ({ isOpen, onClose }: NavigationMenuProps) => {
  const [collapsed, setCollapsed] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setCollapsed(false);
    }
  }, [isOpen]);

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r border-border bg-card transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        collapsed ? "md:w-20" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {/* Icon container always shown */}
        <div 
          className="flex items-center justify-center w-full cursor-pointer"
          onClick={() => collapsed && setCollapsed(false)}
        >
          <Sparkles className="h-6 w-6 text-budget-blue" />
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden absolute right-4"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        {/* Only show the expand/collapse button when NOT collapsed */}
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex absolute right-4"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <nav className="flex-1 overflow-y-auto p-3 scrollbar-none">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              {collapsed ? (
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link 
                        to={item.href}
                        className={cn(
                          "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-muted",
                          location.pathname === item.href && "bg-primary/10 text-primary",
                          collapsed && "justify-center px-2"
                        )}
                        onClick={() => onClose()}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Link 
                  to={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-muted",
                    location.pathname === item.href && "bg-primary/10 text-primary"
                  )}
                  onClick={() => onClose()}
                >
                  <item.icon className="h-5 w-5 shrink-0 mr-3" />
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="border-t border-border p-3">
        {collapsed ? (
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className={cn(
                    "flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-muted text-budget-red justify-center px-2"
                  )}
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                <p>Log out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <button 
            className={cn(
              "flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-muted text-budget-red"
            )}
          >
            <LogOut className="h-5 w-5 shrink-0 mr-3" />
            <span>Log out</span>
          </button>
        )}
      </div>
      
      {/* Add expand button at the bottom when collapsed */}
      {collapsed && (
        <div className="border-t border-border p-3 flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:flex"
            onClick={() => setCollapsed(false)}
            aria-label="Expand sidebar"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </aside>
  );
};

export default NavigationMenu;
