
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
    label: "Spending Trends & Insights", 
    href: "/trends",
  },
  { 
    icon: PiggyBank, 
    label: "Budget Recommendations", 
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
  
  // Reset collapsed state when the mobile menu is opened/closed
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
      {/* Header with Logo and close button */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <div className={cn(
          "text-xl font-bold",
          collapsed && "hidden"
        )}>
          <span>Smart</span>
          <span className="text-budget-blue ml-1">Budget AI</span>
        </div>
        
        <div className={cn(
          "text-xl font-bold hidden",
          collapsed && "block"
        )}>
          <span>SB</span>
          <span className="text-budget-blue">AI</span>
        </div>
        
        {/* Mobile close button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        {/* Desktop collapse toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex"
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
      
      {/* Navigation */}
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
                <span className={cn(
                  collapsed && "hidden"
                )}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Footer */}
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
          <span className={cn(
            collapsed && "hidden"
          )}>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default NavigationMenu;
