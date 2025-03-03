
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  CalendarClock,
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
  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col border-r border-border bg-card transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20 lg:w-64"
      )}
    >
      {/* Header with Logo and close button */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <div className={cn(
          "text-xl font-bold",
          !isOpen && "md:hidden lg:block"
        )}>
          <span>Smart</span>
          <span className="text-budget-blue ml-1">Budget AI</span>
        </div>
        
        <div className={cn(
          "text-xl font-bold hidden",
          !isOpen && "md:block lg:hidden"
        )}>
          <span>SB</span>
          <span className="text-budget-blue">AI</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
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
                  !isOpen && "md:justify-center md:px-2 lg:justify-start lg:px-3"
                )}
                onClick={() => onClose()}
              >
                <item.icon className={cn(
                  "h-5 w-5 shrink-0",
                  !isOpen ? "md:mr-0 lg:mr-3" : "mr-3"
                )} />
                <span className={cn(
                  !isOpen && "md:hidden lg:inline"
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
            !isOpen && "md:justify-center md:px-2 lg:justify-start lg:px-3"
          )}
        >
          <LogOut className={cn(
            "h-5 w-5 shrink-0",
            !isOpen ? "md:mr-0 lg:mr-3" : "mr-3"
          )} />
          <span className={cn(
            !isOpen && "md:hidden lg:inline"
          )}>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default NavigationMenu;
