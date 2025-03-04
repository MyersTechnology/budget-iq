
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
      <div className="flex h-16 items-center justify-between px-4 border-b border-border relative">
        {/* Logo container with absolute positioning when not collapsed */}
        <div className={cn(
          "absolute left-4",
          collapsed ? "hidden" : "block"
        )}>
          <div className="text-xl font-bold">
            <span>Budget</span>
            <span className="text-budget-blue ml-1">IQ</span>
          </div>
        </div>
        
        {/* Icon container with proper centering when collapsed */}
        {collapsed && (
          <div className="flex items-center justify-center w-full">
            <Sparkles className="h-6 w-6 text-budget-blue" />
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className={cn("hidden md:flex", collapsed ? "ml-auto" : "absolute right-4")}
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-3 scrollbar-none">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                to={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-muted",
                  location.pathname === item.href && "bg-primary/10 text-primary",
                  collapsed && "justify-center px-2"
                )}
                onClick={() => onClose()}
              >
                <item.icon className={cn(
                  "h-5 w-5 shrink-0",
                  collapsed ? "mr-0" : "mr-3"
                )} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="border-t border-border p-3">
        <button 
          className={cn(
            "flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-muted text-budget-red",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className={cn(
            "h-5 w-5 shrink-0",
            collapsed ? "mr-0" : "mr-3"
          )} />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
};

export default NavigationMenu;
