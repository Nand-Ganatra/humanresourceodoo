import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { LeaveRequest, LeaveType, LeaveStatus } from '@/types/hrms';

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Michael Chen',
    leaveType: 'paid',
    startDate: '2024-02-15',
    endDate: '2024-02-17',
    reason: 'Family vacation',
    status: 'approved',
    adminComment: 'Approved. Enjoy your trip!',
    createdAt: '2024-02-01',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Michael Chen',
    leaveType: 'sick',
    startDate: '2024-02-20',
    endDate: '2024-02-21',
    reason: 'Not feeling well, need rest',
    status: 'pending',
    createdAt: '2024-02-18',
  },
  {
    id: '3',
    userId: '2',
    userName: 'Michael Chen',
    leaveType: 'unpaid',
    startDate: '2024-01-10',
    endDate: '2024-01-10',
    reason: 'Personal matters',
    status: 'rejected',
    adminComment: 'Team meeting scheduled on this day',
    createdAt: '2024-01-05',
  },
];

const Leave = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState(mockLeaveRequests);
  const [formData, setFormData] = useState({
    leaveType: 'paid' as LeaveType,
    startDate: '',
    endDate: '',
    reason: '',
  });

  const leaveBalance = {
    paid: 12,
    sick: 6,
    unpaid: 'Unlimited',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRequest: LeaveRequest = {
      id: String(leaveRequests.length + 1),
      userId: user?.id || '',
      userName: `${user?.firstName} ${user?.lastName}`,
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setLeaveRequests([newRequest, ...leaveRequests]);
    setShowForm(false);
    setFormData({ leaveType: 'paid', startDate: '', endDate: '', reason: '' });
    
    toast({
      title: "Leave request submitted",
      description: "Your request has been sent for approval.",
    });
  };

  const getStatusIcon = (status: LeaveStatus) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
    }
  };

  const getStatusBadge = (status: LeaveStatus) => {
    const styles = {
      approved: 'bg-success/10 text-success border-success/20',
      rejected: 'bg-destructive/10 text-destructive border-destructive/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
    };
    
    return (
      <span className={cn('px-3 py-1 rounded-full text-xs font-medium border capitalize', styles[status])}>
        {status}
      </span>
    );
  };

  const getLeaveTypeBadge = (type: LeaveType) => {
    const styles = {
      paid: 'bg-accent/10 text-accent',
      sick: 'bg-info/10 text-info',
      unpaid: 'bg-muted text-muted-foreground',
    };
    
    return (
      <span className={cn('px-2 py-0.5 rounded text-xs font-medium capitalize', styles[type])}>
        {type} Leave
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Leave Requests</h1>
            <p className="text-muted-foreground">Apply for leave and track your requests</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Request Leave
          </Button>
        </div>

        {/* Leave Balance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up">
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid Leave</p>
                <p className="text-3xl font-bold text-foreground mt-1">{leaveBalance.paid}</p>
                <p className="text-xs text-muted-foreground">days remaining</p>
              </div>
              <div className="p-3 rounded-xl bg-accent/10">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sick Leave</p>
                <p className="text-3xl font-bold text-foreground mt-1">{leaveBalance.sick}</p>
                <p className="text-xs text-muted-foreground">days remaining</p>
              </div>
              <div className="p-3 rounded-xl bg-info/10">
                <AlertCircle className="w-6 h-6 text-info" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unpaid Leave</p>
                <p className="text-3xl font-bold text-foreground mt-1">{leaveBalance.unpaid}</p>
                <p className="text-xs text-muted-foreground">as needed</p>
              </div>
              <div className="p-3 rounded-xl bg-muted">
                <Clock className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Leave Request Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-2xl border shadow-xl w-full max-w-md animate-scale-in">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-lg font-semibold">New Leave Request</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="leaveType">Leave Type</Label>
                  <select
                    id="leaveType"
                    value={formData.leaveType}
                    onChange={(e) => setFormData({ ...formData, leaveType: e.target.value as LeaveType })}
                    className="w-full h-11 px-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="paid">Paid Leave</option>
                    <option value="sick">Sick Leave</option>
                    <option value="unpaid">Unpaid Leave</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason"
                    placeholder="Please provide a reason for your leave request..."
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    required
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Submit Request
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Leave Requests List */}
        <div className="bg-card rounded-2xl border shadow-elegant animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">My Requests</h2>
          </div>
          <div className="divide-y">
            {leaveRequests.map((request) => (
              <div key={request.id} className="p-6 hover:bg-muted/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-xl bg-muted">
                      {getStatusIcon(request.status)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getLeaveTypeBadge(request.leaveType)}
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-sm text-foreground font-medium">
                        {new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        {request.startDate !== request.endDate && (
                          <> - {new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{request.reason}</p>
                      {request.adminComment && (
                        <p className="text-sm text-muted-foreground mt-2 p-2 rounded bg-muted/50">
                          <span className="font-medium">Admin:</span> {request.adminComment}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Applied on {new Date(request.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Leave;
