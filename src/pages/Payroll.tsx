import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  Download, 
  TrendingUp, 
  Calendar,
  FileText,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const payrollHistory = [
  { month: 'January 2024', basic: 5000, allowances: 1500, deductions: 500, net: 6000, status: 'paid' },
  { month: 'December 2023', basic: 5000, allowances: 1500, deductions: 500, net: 6000, status: 'paid' },
  { month: 'November 2023', basic: 5000, allowances: 1500, deductions: 500, net: 6000, status: 'paid' },
  { month: 'October 2023', basic: 5000, allowances: 1400, deductions: 480, net: 5920, status: 'paid' },
  { month: 'September 2023', basic: 5000, allowances: 1400, deductions: 480, net: 5920, status: 'paid' },
];

const Payroll = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const currentSalary = {
    basic: 5000,
    hra: 800,
    transport: 300,
    medical: 200,
    special: 200,
    tax: 400,
    pf: 100,
    gross: 6500,
    net: 6000,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isAdmin ? 'Payroll Management' : 'My Payroll'}
            </h1>
            <p className="text-muted-foreground">
              {isAdmin ? 'Manage employee salaries and payroll' : 'View your salary details and history'}
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download Pay Slip
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Gross Salary</p>
              <div className="p-2 rounded-lg bg-primary/10">
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">${currentSalary.gross.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Monthly</p>
          </div>
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Net Salary</p>
              <div className="p-2 rounded-lg bg-success/10">
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">${currentSalary.net.toLocaleString()}</p>
            <p className="text-xs text-success mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              After deductions
            </p>
          </div>
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Total Deductions</p>
              <div className="p-2 rounded-lg bg-destructive/10">
                <ArrowDownRight className="w-4 h-4 text-destructive" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">${(currentSalary.tax + currentSalary.pf).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Tax + PF</p>
          </div>
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">YTD Earnings</p>
              <div className="p-2 rounded-lg bg-accent/10">
                <Calendar className="w-4 h-4 text-accent" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">${(currentSalary.net * 12).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">This year</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Salary Breakdown */}
          <div className="bg-card rounded-2xl border shadow-elegant p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-lg font-semibold mb-6">Salary Breakdown</h2>
            
            <div className="space-y-6">
              {/* Earnings */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4 text-success" />
                  Earnings
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Basic Salary', amount: currentSalary.basic },
                    { label: 'House Rent Allowance', amount: currentSalary.hra },
                    { label: 'Transport Allowance', amount: currentSalary.transport },
                    { label: 'Medical Allowance', amount: currentSalary.medical },
                    { label: 'Special Allowance', amount: currentSalary.special },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-dashed last:border-0">
                      <span className="text-sm text-foreground">{item.label}</span>
                      <span className="text-sm font-medium text-foreground">${item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-2 bg-success/5 rounded-lg px-3 -mx-3">
                    <span className="text-sm font-medium text-success">Total Earnings</span>
                    <span className="text-sm font-bold text-success">${currentSalary.gross.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Deductions */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <ArrowDownRight className="w-4 h-4 text-destructive" />
                  Deductions
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Income Tax', amount: currentSalary.tax },
                    { label: 'Provident Fund', amount: currentSalary.pf },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-dashed last:border-0">
                      <span className="text-sm text-foreground">{item.label}</span>
                      <span className="text-sm font-medium text-destructive">-${item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-2 bg-destructive/5 rounded-lg px-3 -mx-3">
                    <span className="text-sm font-medium text-destructive">Total Deductions</span>
                    <span className="text-sm font-bold text-destructive">-${(currentSalary.tax + currentSalary.pf).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Net */}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between p-4 rounded-xl gradient-primary text-primary-foreground">
                  <span className="font-medium">Net Salary</span>
                  <span className="text-2xl font-bold">${currentSalary.net.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-card rounded-2xl border shadow-elegant p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Payment History</h2>
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                <FileText className="w-4 h-4" />
                View All
              </Button>
            </div>
            
            <div className="space-y-3">
              {payrollHistory.map((record, index) => (
                <div 
                  key={record.month}
                  className="flex items-center justify-between p-4 rounded-xl border hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{record.month}</p>
                      <p className="text-xs text-muted-foreground">
                        Basic: ${record.basic} | Allowances: ${record.allowances}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">${record.net.toLocaleString()}</p>
                    <span className="inline-flex items-center gap-1 text-xs text-success">
                      <span className="w-1.5 h-1.5 rounded-full bg-success" />
                      Paid
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Payroll;
