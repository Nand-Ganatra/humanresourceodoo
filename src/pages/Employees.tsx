import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  MoreVertical,
  Mail,
  Phone,
  Building2,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { User } from '@/types/hrms';

const mockEmployees: User[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    email: 'sarah.johnson@company.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'admin',
    department: 'Human Resources',
    position: 'HR Manager',
    phone: '+1 (555) 123-4567',
    joiningDate: '2020-03-15',
    salary: 85000,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '2',
    employeeId: 'EMP002',
    email: 'michael.chen@company.com',
    firstName: 'Michael',
    lastName: 'Chen',
    role: 'employee',
    department: 'Engineering',
    position: 'Software Developer',
    phone: '+1 (555) 987-6543',
    joiningDate: '2022-06-01',
    salary: 75000,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '3',
    employeeId: 'EMP003',
    email: 'emily.rodriguez@company.com',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    role: 'employee',
    department: 'Marketing',
    position: 'Marketing Specialist',
    phone: '+1 (555) 456-7890',
    joiningDate: '2021-09-10',
    salary: 65000,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '4',
    employeeId: 'EMP004',
    email: 'james.wilson@company.com',
    firstName: 'James',
    lastName: 'Wilson',
    role: 'employee',
    department: 'Finance',
    position: 'Financial Analyst',
    phone: '+1 (555) 321-0987',
    joiningDate: '2023-01-15',
    salary: 70000,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '5',
    employeeId: 'EMP005',
    email: 'sarah.thompson@company.com',
    firstName: 'Sarah',
    lastName: 'Thompson',
    role: 'employee',
    department: 'Engineering',
    position: 'Senior Developer',
    phone: '+1 (555) 654-3210',
    joiningDate: '2019-08-20',
    salary: 95000,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
  },
];

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = ['all', ...new Set(mockEmployees.map(e => e.department))];

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = 
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Employees</h1>
            <p className="text-muted-foreground">Manage your team members</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Employee
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className="bg-card rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {employee.avatar ? (
                      <img
                        src={employee.avatar}
                        alt={employee.firstName}
                        className="w-14 h-14 rounded-xl object-cover ring-2 ring-border"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">
                          {employee.firstName[0]}{employee.lastName[0]}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {employee.firstName} {employee.lastName}
                      </h3>
                      <p className="text-sm text-muted-foreground">{employee.position}</p>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{employee.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{employee.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <span className="text-xs text-muted-foreground">
                    ID: {employee.employeeId}
                  </span>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium capitalize",
                    employee.role === 'admin' 
                      ? "bg-accent/10 text-accent" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {employee.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No employees found matching your criteria.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Employees;
