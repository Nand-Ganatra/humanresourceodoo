import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  type: 'attendance' | 'leave_approved' | 'leave_rejected' | 'leave_pending';
  message: string;
  time: string;
}

const mockActivities: Activity[] = [
  { id: '1', type: 'attendance', message: 'Checked in at 9:00 AM', time: '2 hours ago' },
  { id: '2', type: 'leave_approved', message: 'Annual leave request approved', time: 'Yesterday' },
  { id: '3', type: 'leave_pending', message: 'Sick leave request pending', time: '2 days ago' },
  { id: '4', type: 'attendance', message: 'Checked out at 6:00 PM', time: '3 days ago' },
];

const RecentActivity = () => {
  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'attendance':
        return <Clock className="w-4 h-4" />;
      case 'leave_approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'leave_rejected':
        return <XCircle className="w-4 h-4" />;
      case 'leave_pending':
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getIconStyles = (type: Activity['type']) => {
    switch (type) {
      case 'attendance':
        return 'bg-info/10 text-info';
      case 'leave_approved':
        return 'bg-success/10 text-success';
      case 'leave_rejected':
        return 'bg-destructive/10 text-destructive';
      case 'leave_pending':
        return 'bg-warning/10 text-warning';
    }
  };

  return (
    <div className="bg-card rounded-2xl border p-6 shadow-elegant">
      <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {mockActivities.map((activity, index) => (
          <div 
            key={activity.id}
            className="flex items-start gap-3 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={cn(
              "p-2 rounded-lg flex-shrink-0",
              getIconStyles(activity.type)
            )}>
              {getIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{activity.message}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
