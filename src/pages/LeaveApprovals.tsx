import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  CheckCircle, 
  XCircle, 
  Clock,
  User,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { LeaveRequest, LeaveType, LeaveStatus } from '@/types/hrms';

const pendingRequests: LeaveRequest[] = [
  {
    id: '1',
    userId: '3',
    userName: 'Emily Rodriguez',
    leaveType: 'paid',
    startDate: '2024-02-25',
    endDate: '2024-02-28',
    reason: 'Annual family vacation planned months ago. Will ensure all handovers are complete.',
    status: 'pending',
    createdAt: '2024-02-18',
  },
  {
    id: '2',
    userId: '4',
    userName: 'James Wilson',
    leaveType: 'sick',
    startDate: '2024-02-20',
    endDate: '2024-02-21',
    reason: 'Recovering from flu, doctor advised rest.',
    status: 'pending',
    createdAt: '2024-02-19',
  },
  {
    id: '3',
    userId: '5',
    userName: 'Sarah Thompson',
    leaveType: 'unpaid',
    startDate: '2024-03-01',
    endDate: '2024-03-05',
    reason: 'Need to attend to urgent family matters out of state.',
    status: 'pending',
    createdAt: '2024-02-17',
  },
];

const LeaveApprovals = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState(pendingRequests);
  const [comments, setComments] = useState<Record<string, string>>({});

  const handleAction = (requestId: string, action: 'approve' | 'reject') => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: action === 'approve' ? 'approved' : 'rejected' as LeaveStatus, adminComment: comments[requestId] || '' }
        : req
    ));
    
    toast({
      title: action === 'approve' ? 'Leave Approved' : 'Leave Rejected',
      description: `The leave request has been ${action === 'approve' ? 'approved' : 'rejected'}.`,
    });
  };

  const getLeaveTypeBadge = (type: LeaveType) => {
    const styles = {
      paid: 'bg-accent/10 text-accent border-accent/20',
      sick: 'bg-info/10 text-info border-info/20',
      unpaid: 'bg-muted text-muted-foreground border-border',
    };
    
    return (
      <span className={cn('px-3 py-1 rounded-full text-xs font-medium border capitalize', styles[type])}>
        {type} Leave
      </span>
    );
  };

  const getStatusBadge = (status: LeaveStatus) => {
    const styles = {
      approved: 'bg-success/10 text-success border-success/20',
      rejected: 'bg-destructive/10 text-destructive border-destructive/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
    };
    
    return (
      <span className={cn('px-3 py-1 rounded-full text-xs font-medium border capitalize flex items-center gap-1', styles[status])}>
        {status === 'approved' && <CheckCircle className="w-3 h-3" />}
        {status === 'rejected' && <XCircle className="w-3 h-3" />}
        {status === 'pending' && <Clock className="w-3 h-3" />}
        {status}
      </span>
    );
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">Leave Approvals</h1>
          <p className="text-muted-foreground">Review and manage employee leave requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up">
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning/10">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {requests.filter(r => r.status === 'approved').length}
                </p>
                <p className="text-sm text-muted-foreground">Approved This Month</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-destructive/10">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {requests.filter(r => r.status === 'rejected').length}
                </p>
                <p className="text-sm text-muted-foreground">Rejected This Month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {requests.map((request) => (
            <div key={request.id} className="bg-card rounded-2xl border shadow-elegant overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Request Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{request.userName}</h3>
                        <p className="text-sm text-muted-foreground">Employee ID: EMP00{request.userId}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      {getLeaveTypeBadge(request.leaveType)}
                      {getStatusBadge(request.status)}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="text-foreground font-medium">
                          {new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          {request.startDate !== request.endDate && (
                            <> - {new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Applied:</span>
                        <span className="text-foreground font-medium">
                          {new Date(request.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-sm text-foreground">{request.reason}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  {request.status === 'pending' && (
                    <div className="lg:w-80 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MessageSquare className="w-4 h-4" />
                          <span>Add Comment (Optional)</span>
                        </div>
                        <Textarea
                          placeholder="Add a note for the employee..."
                          value={comments[request.id] || ''}
                          onChange={(e) => setComments({ ...comments, [request.id]: e.target.value })}
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => handleAction(request.id, 'reject')}
                          className="flex-1 gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </Button>
                        <Button
                          variant="success"
                          onClick={() => handleAction(request.id, 'approve')}
                          className="flex-1 gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  )}

                  {request.status !== 'pending' && request.adminComment && (
                    <div className="lg:w-80 p-4 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">Your Response:</p>
                      <p className="text-sm text-foreground">{request.adminComment}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LeaveApprovals;
