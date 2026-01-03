import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import QuickActionCard from '@/components/dashboard/QuickActionCard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { 
  Users, 
  Clock, 
  Calendar, 
  DollarSign, 
  UserCheck, 
  AlertCircle,
  TrendingUp,
  FileText,
  User,
  ClipboardCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Good morning, {user?.firstName}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">{currentDate}</p>
          </div>
          {!isAdmin && (
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Clock className="w-4 h-4" />
                Check In
              </Button>
              <Button variant="accent" className="gap-2">
                <Calendar className="w-4 h-4" />
                Request Leave
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isAdmin ? (
          <>
            <StatCard
              title="Total Employees"
              value="124"
              subtitle="8 new this month"
              icon={Users}
              trend={{ value: 12, isPositive: true }}
              variant="primary"
            />
            <StatCard
              title="Present Today"
              value="118"
              subtitle="95% attendance rate"
              icon={UserCheck}
              variant="default"
            />
            <StatCard
              title="Pending Leaves"
              value="7"
              subtitle="Requires your attention"
              icon={AlertCircle}
              variant="warning"
            />
            <StatCard
              title="Monthly Payroll"
              value="$284K"
              subtitle="Due in 5 days"
              icon={DollarSign}
              trend={{ value: 3, isPositive: false }}
              variant="default"
            />
          </>
        ) : (
          <>
            <StatCard
              title="Days Present"
              value="22"
              subtitle="This month"
              icon={Clock}
              variant="primary"
            />
            <StatCard
              title="Leave Balance"
              value="12"
              subtitle="Days remaining"
              icon={Calendar}
              variant="default"
            />
            <StatCard
              title="This Month"
              value="$6,250"
              subtitle="Net salary"
              icon={DollarSign}
              variant="accent"
            />
            <StatCard
              title="Performance"
              value="94%"
              subtitle="Above average"
              icon={TrendingUp}
              trend={{ value: 5, isPositive: true }}
              variant="success"
            />
          </>
        )}
      </div>

      {/* Quick Actions & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isAdmin ? (
              <>
                <QuickActionCard
                  title="Manage Employees"
                  description="View and edit employee profiles"
                  icon={Users}
                  to="/employees"
                  variant="primary"
                />
                <QuickActionCard
                  title="Attendance Reports"
                  description="View daily & weekly attendance"
                  icon={ClipboardCheck}
                  to="/attendance"
                />
                <QuickActionCard
                  title="Leave Approvals"
                  description="Review pending leave requests"
                  icon={Calendar}
                  to="/leave-approvals"
                  variant="accent"
                />
                <QuickActionCard
                  title="Generate Reports"
                  description="Download HR analytics & reports"
                  icon={FileText}
                  to="/reports"
                />
              </>
            ) : (
              <>
                <QuickActionCard
                  title="My Profile"
                  description="View and update your details"
                  icon={User}
                  to="/profile"
                  variant="primary"
                />
                <QuickActionCard
                  title="Attendance History"
                  description="Check your attendance records"
                  icon={Clock}
                  to="/attendance"
                />
                <QuickActionCard
                  title="Leave Requests"
                  description="Apply or check leave status"
                  icon={Calendar}
                  to="/leave"
                  variant="accent"
                />
                <QuickActionCard
                  title="Salary Details"
                  description="View your payroll information"
                  icon={DollarSign}
                  to="/payroll"
                />
              </>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
