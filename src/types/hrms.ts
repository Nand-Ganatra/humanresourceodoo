export type UserRole = 'admin' | 'employee';

export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export type LeaveType = 'paid' | 'sick' | 'unpaid';

export type AttendanceStatus = 'present' | 'absent' | 'half-day' | 'leave';

export interface User {
  id: string;
  employeeId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department: string;
  position: string;
  avatar?: string;
  phone?: string;
  address?: string;
  joiningDate: string;
  salary: number;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  workHours?: number;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  adminComment?: string;
  createdAt: string;
}

export interface PayrollRecord {
  id: string;
  userId: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'paid' | 'pending';
}
