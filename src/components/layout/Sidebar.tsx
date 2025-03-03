
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  CreditCard, 
  HelpCircle, 
  Home, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  Settings, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { 
    icon: LayoutDashboard, 
    label: "Dashboard", 
    href: "/dashboard",
  },
  { 
    icon: CreditCard, 
    label: "Transactions", 
    href: "/transactions",
  },
  { 
    icon: BarChart3, 
    label: "Analytics", 
    href: "/analytics",
    disabled: true,
  },
  { 
    icon: Settings, 
    label: "Settings", 
    href: "/settings",
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setMobileOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };
  
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      {/* Sidebar toggle button (mobile) */}
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden bg-background/90 border-border"
        onClick={toggleSidebar}
      >
        {mobileOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-full flex-col border-r border-border bg-sidebar transition-all duration-300 ease-in-out",
          collapsed ? "w-[70px]" : "w-[240px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <Link to="/" className="flex items-center">
            {!collapsed && (
              <span className="ml-2 text-xl font-semibold tracking-tight">
                Budget<span className="text-sidebar-primary">AI</span>
              </span>
            )}
            {collapsed && (
              <span className="text-xl font-semibold tracking-tight">
                B<span className="text-sidebar-primary">AI</span>
              </span>
            )}
          </Link>
          
          {/* Collapse button (desktop) */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 scrollbar-none">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  to={item.disabled ? "#" : item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    location.pathname.startsWith(item.href)
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    item.disabled && "opacity-50 cursor-not-allowed",
                    !collapsed ? "justify-start" : "justify-center"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0", collapsed ? "mr-0" : "mr-3")} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="border-t border-border p-3">
          <ul className="space-y-1">
            <li>
              <Link 
                to="/help"
                className={cn(
                  "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  !collapsed ? "justify-start" : "justify-center"
                )}
              >
                <HelpCircle className={cn("h-5 w-5 shrink-0", collapsed ? "mr-0" : "mr-3")} />
                {!collapsed && <span>Help & Support</span>}
              </Link>
            </li>
            <li>
              <button 
                className={cn(
                  "flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  !collapsed ? "justify-start" : "justify-center"
                )}
              >
                <LogOut className={cn("h-5 w-5 shrink-0", collapsed ? "mr-0" : "mr-3")} />
                {!collapsed && <span>Log out</span>}
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
