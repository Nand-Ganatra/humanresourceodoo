import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  LogIn,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { AttendanceStatus } from '@/types/hrms';

interface DayAttendance {
  date: number;
  status: AttendanceStatus | null;
  checkIn?: string;
  checkOut?: string;
}

const Attendance = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === 'admin';
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  // Generate mock attendance data
  const generateMonthData = (): DayAttendance[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date().getDate();
    const currentMonthNum = new Date().getMonth();
    
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const dayOfWeek = new Date(year, month, day).getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isPast = month < currentMonthNum || (month === currentMonthNum && day < today);
      
      if (isWeekend || !isPast) {
        return { date: day, status: null };
      }
      
      const statuses: AttendanceStatus[] = ['present', 'present', 'present', 'present', 'present', 'half-day', 'absent', 'leave'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        date: day,
        status: randomStatus,
        checkIn: randomStatus !== 'absent' ? '09:00 AM' : undefined,
        checkOut: randomStatus === 'present' ? '06:00 PM' : randomStatus === 'half-day' ? '01:00 PM' : undefined,
      };
    });
  };

  const [monthData] = useState(generateMonthData);

  const handleCheckIn = () => {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setIsCheckedIn(true);
    setCheckInTime(now);
    toast({
      title: "Checked In",
      description: `You checked in at ${now}`,
    });
  };

  const handleCheckOut = () => {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setIsCheckedIn(false);
    toast({
      title: "Checked Out",
      description: `You checked out at ${now}. Have a great evening!`,
    });
  };

  const getStatusBadge = (status: AttendanceStatus | null) => {
    if (!status) return null;
    
    const styles = {
      present: 'bg-success/10 text-success border-success/20',
      absent: 'bg-destructive/10 text-destructive border-destructive/20',
      'half-day': 'bg-warning/10 text-warning border-warning/20',
      leave: 'bg-info/10 text-info border-info/20',
    };
    
    return (
      <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium border', styles[status])}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const stats = {
    present: monthData.filter(d => d.status === 'present').length,
    absent: monthData.filter(d => d.status === 'absent').length,
    halfDay: monthData.filter(d => d.status === 'half-day').length,
    leave: monthData.filter(d => d.status === 'leave').length,
  };

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isAdmin ? 'Attendance Management' : 'My Attendance'}
            </h1>
            <p className="text-muted-foreground">Track and manage attendance records</p>
          </div>
          
          {!isAdmin && (
            <div className="flex items-center gap-4">
              <div className="bg-card rounded-xl border p-4 shadow-elegant">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className={cn(
                      "font-semibold",
                      isCheckedIn ? "text-success" : "text-muted-foreground"
                    )}>
                      {isCheckedIn ? 'Working' : 'Not Checked In'}
                    </p>
                  </div>
                  {checkInTime && (
                    <div className="text-center border-l pl-4">
                      <p className="text-xs text-muted-foreground">Check-in</p>
                      <p className="font-semibold text-foreground">{checkInTime}</p>
                    </div>
                  )}
                  <Button
                    variant={isCheckedIn ? "destructive" : "accent"}
                    onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
                    className="gap-2"
                  >
                    {isCheckedIn ? (
                      <>
                        <LogOut className="w-4 h-4" />
                        Check Out
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        Check In
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up">
          <div className="bg-card rounded-xl border p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.present}</p>
                <p className="text-sm text-muted-foreground">Present</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.absent}</p>
                <p className="text-sm text-muted-foreground">Absent</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.halfDay}</p>
                <p className="text-sm text-muted-foreground">Half Day</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-info/10">
                <Calendar className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.leave}</p>
                <p className="text-sm text-muted-foreground">On Leave</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-card rounded-2xl border shadow-elegant p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Monthly Overview</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="font-medium min-w-[150px] text-center">{monthName}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
            
            {/* Empty cells for alignment */}
            {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() }, (_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            
            {monthData.map((day) => {
              const dayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.date).getDay();
              const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
              const isToday = day.date === new Date().getDate() && currentMonth.getMonth() === new Date().getMonth();
              
              return (
                <div
                  key={day.date}
                  className={cn(
                    "aspect-square rounded-xl p-2 flex flex-col items-center justify-center gap-1 transition-all",
                    isWeekend && "bg-muted/30",
                    isToday && "ring-2 ring-accent",
                    day.status === 'present' && "bg-success/5",
                    day.status === 'absent' && "bg-destructive/5",
                    day.status === 'half-day' && "bg-warning/5",
                    day.status === 'leave' && "bg-info/5",
                  )}
                >
                  <span className={cn(
                    "text-sm font-medium",
                    isToday ? "text-accent" : isWeekend ? "text-muted-foreground" : "text-foreground"
                  )}>
                    {day.date}
                  </span>
                  {day.status && (
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      day.status === 'present' && "bg-success",
                      day.status === 'absent' && "bg-destructive",
                      day.status === 'half-day' && "bg-warning",
                      day.status === 'leave' && "bg-info",
                    )} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-sm text-muted-foreground">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-sm text-muted-foreground">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-sm text-muted-foreground">Half Day</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-info" />
              <span className="text-sm text-muted-foreground">On Leave</span>
            </div>
          </div>
        </div>

        {/* Recent Records Table */}
        <div className="bg-card rounded-2xl border shadow-elegant p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-lg font-semibold mb-4">Recent Records</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Check In</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Check Out</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {monthData.filter(d => d.status).slice(0, 7).map((day, index) => (
                  <tr key={day.date} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 text-sm text-foreground">
                      {new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">{day.checkIn || '-'}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{day.checkOut || '-'}</td>
                    <td className="py-3 px-4">{getStatusBadge(day.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
