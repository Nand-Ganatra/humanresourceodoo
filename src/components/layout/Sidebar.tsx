import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Clock, 
  Calendar, 
  DollarSign, 
  Users, 
  FileText,
  LogOut,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  
  const isAdmin = user?.role === 'admin';

  const employeeLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/profile', icon: User, label: 'My Profile' },
    { to: '/attendance', icon: Clock, label: 'Attendance' },
    { to: '/leave', icon: Calendar, label: 'Leave Requests' },
    { to: '/payroll', icon: DollarSign, label: 'Payroll' },
  ];

  const adminLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/employees', icon: Users, label: 'Employees' },
    { to: '/attendance', icon: Clock, label: 'Attendance' },
    { to: '/leave-approvals', icon: Calendar, label: 'Leave Approvals' },
    { to: '/payroll', icon: DollarSign, label: 'Payroll' },
    { to: '/reports', icon: FileText, label: 'Reports' },
  ];

  const links = isAdmin ? adminLinks : employeeLinks;

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar flex flex-col transition-all duration-300 z-50",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center shadow-glow">
            <span className="text-sidebar-primary-foreground font-bold text-lg">HR</span>
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-sidebar-foreground font-bold text-lg">HRMS</h1>
              <p className="text-sidebar-foreground/60 text-xs">Management System</p>
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className={cn("p-4 border-b border-sidebar-border", collapsed && "px-3")}>
        <div className="flex items-center gap-3">
          <div className="relative">
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.firstName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-sidebar-primary/30"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
                <span className="text-sidebar-foreground font-medium">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
            )}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-sidebar" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in overflow-hidden">
              <p className="text-sidebar-foreground font-medium text-sm truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sidebar-foreground/60 text-xs capitalize">{user?.role}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md" 
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                collapsed && "justify-center px-3"
              )}
            >
              <Icon className={cn("w-5 h-5 flex-shrink-0", isActive && "animate-scale-in")} />
              {!collapsed && (
                <span className="font-medium animate-fade-in">{link.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        <Link
          to="/settings"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
            collapsed && "justify-center px-3"
          )}
        >
          <Settings className="w-5 h-5" />
          {!collapsed && <span className="font-medium">Settings</span>}
        </Link>
        
        <button
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-destructive/80 hover:bg-destructive/10 hover:text-destructive",
            collapsed && "justify-center px-3"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border shadow-md hover:bg-accent hover:text-accent-foreground"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </Button>
    </aside>
  );
};

export default Sidebar;
