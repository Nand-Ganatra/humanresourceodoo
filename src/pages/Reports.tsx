import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  Calendar,
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  BarChart3
} from 'lucide-react';

const reportTypes = [
  {
    id: 'attendance',
    title: 'Attendance Report',
    description: 'Daily and monthly attendance records for all employees',
    icon: Clock,
    color: 'bg-info/10 text-info',
  },
  {
    id: 'payroll',
    title: 'Payroll Report',
    description: 'Salary breakdown and payment history',
    icon: DollarSign,
    color: 'bg-success/10 text-success',
  },
  {
    id: 'leave',
    title: 'Leave Report',
    description: 'Leave requests, approvals, and balances',
    icon: Calendar,
    color: 'bg-warning/10 text-warning',
  },
  {
    id: 'employee',
    title: 'Employee Report',
    description: 'Complete employee directory and details',
    icon: Users,
    color: 'bg-accent/10 text-accent',
  },
  {
    id: 'performance',
    title: 'Performance Report',
    description: 'Team productivity and performance metrics',
    icon: TrendingUp,
    color: 'bg-primary/10 text-primary',
  },
  {
    id: 'analytics',
    title: 'HR Analytics',
    description: 'Comprehensive HR insights and trends',
    icon: BarChart3,
    color: 'bg-destructive/10 text-destructive',
  },
];

const recentReports = [
  { name: 'Attendance_Jan_2024.pdf', date: 'Jan 31, 2024', size: '2.4 MB' },
  { name: 'Payroll_Jan_2024.pdf', date: 'Jan 31, 2024', size: '1.8 MB' },
  { name: 'Leave_Summary_Q4_2023.pdf', date: 'Jan 15, 2024', size: '892 KB' },
  { name: 'Employee_Directory.xlsx', date: 'Jan 10, 2024', size: '456 KB' },
];

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and download HR reports</p>
        </div>

        {/* Report Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <div
                key={report.id}
                className="bg-card rounded-2xl border p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-xl ${report.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{report.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                <Button variant="outline" size="sm" className="gap-2 w-full">
                  <Download className="w-4 h-4" />
                  Generate Report
                </Button>
              </div>
            );
          })}
        </div>

        {/* Recent Reports */}
        <div className="bg-card rounded-2xl border shadow-elegant p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Reports</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentReports.map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl border hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{report.name}</p>
                    <p className="text-xs text-muted-foreground">{report.date} • {report.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-5 border border-primary/10">
            <p className="text-sm text-muted-foreground">Reports Generated</p>
            <p className="text-3xl font-bold text-foreground mt-2">47</p>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </div>
          <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-xl p-5 border border-success/10">
            <p className="text-sm text-muted-foreground">Data Accuracy</p>
            <p className="text-3xl font-bold text-foreground mt-2">99.8%</p>
            <p className="text-xs text-success mt-1">Verified</p>
          </div>
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-5 border border-accent/10">
            <p className="text-sm text-muted-foreground">Active Users</p>
            <p className="text-3xl font-bold text-foreground mt-2">124</p>
            <p className="text-xs text-muted-foreground mt-1">Employees</p>
          </div>
          <div className="bg-gradient-to-br from-warning/10 to-warning/5 rounded-xl p-5 border border-warning/10">
            <p className="text-sm text-muted-foreground">Pending Actions</p>
            <p className="text-3xl font-bold text-foreground mt-2">7</p>
            <p className="text-xs text-warning mt-1">Requires attention</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
