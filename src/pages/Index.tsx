import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Users, 
  Clock, 
  Calendar, 
  DollarSign, 
  Shield,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Employee Management',
    description: 'Complete employee profiles, documents, and records in one place.',
  },
  {
    icon: Clock,
    title: 'Attendance Tracking',
    description: 'Digital check-in/out with real-time tracking and reports.',
  },
  {
    icon: Calendar,
    title: 'Leave Management',
    description: 'Streamlined leave requests and approval workflows.',
  },
  {
    icon: DollarSign,
    title: 'Payroll Visibility',
    description: 'Transparent salary breakdowns and payment history.',
  },
  {
    icon: Shield,
    title: 'Role-Based Access',
    description: 'Secure access control for admins and employees.',
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">HRMS</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button className="gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4" />
              Trusted by 500+ companies
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Simplify Your HR
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-info bg-clip-text text-transparent">
                Operations Today
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              A comprehensive human resource management system that streamlines 
              employee management, attendance tracking, leave approvals, and payroll.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button size="xl" className="gap-2 shadow-lg">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="xl">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="bg-card rounded-2xl border shadow-2xl overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 border-b flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="p-8 bg-gradient-to-br from-muted/30 to-background">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Employees', value: '124', color: 'bg-primary/10 text-primary' },
                    { label: 'Present Today', value: '118', color: 'bg-success/10 text-success' },
                    { label: 'On Leave', value: '6', color: 'bg-warning/10 text-warning' },
                    { label: 'Pending', value: '7', color: 'bg-info/10 text-info' },
                  ].map((stat) => (
                    <div key={stat.label} className="p-4 rounded-xl bg-card border">
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-48 rounded-xl bg-card border p-4">
                    <div className="h-full flex items-end gap-2">
                      {[65, 80, 45, 90, 70, 85, 60].map((h, i) => (
                        <div key={i} className="flex-1 bg-accent/20 rounded-t" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="h-48 rounded-xl bg-card border p-4 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border-8 border-accent/20 border-t-accent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything you need to manage HR
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Powerful features designed to make HR management effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-card rounded-2xl border p-6 shadow-sm hover:shadow-lg transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="gradient-hero rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-primary-foreground mb-4">
                Ready to transform your HR?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
                Join hundreds of companies already using HRMS to streamline their human resource operations.
              </p>
              <Link to="/auth">
                <Button size="xl" variant="hero-accent" className="gap-2">
                  Get Started for Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">HRMS</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 HRMS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
