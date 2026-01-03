import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2, Building2 } from 'lucide-react';
import { UserRole } from '@/types/hrms';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Signup state
  const [signupData, setSignupData] = useState({
    employeeId: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'employee' as UserRole,
  });

  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Try admin@company.com / password123",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (signupData.password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup({
        employeeId: signupData.employeeId,
        email: signupData.email,
        password: signupData.password,
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        role: signupData.role,
      });
      
      if (success) {
        toast({
          title: "Account created!",
          description: "Welcome to HRMS. Your account has been created.",
        });
        navigate('/dashboard');
      }
    } catch {
      toast({
        title: "Signup failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
        
        <div className="relative z-10 flex flex-col justify-center px-16 py-12">
          <div className="mb-12">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center shadow-glow mb-6">
              <Building2 className="w-8 h-8 text-accent-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-primary-foreground mb-4">
              HR Management System
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-md">
              Streamline your HR operations with our comprehensive management solution.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-primary-foreground/90">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <span className="text-accent font-bold">✓</span>
              </div>
              <span>Employee profile & document management</span>
            </div>
            <div className="flex items-center gap-4 text-primary-foreground/90">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <span className="text-accent font-bold">✓</span>
              </div>
              <span>Attendance tracking & reporting</span>
            </div>
            <div className="flex items-center gap-4 text-primary-foreground/90">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <span className="text-accent font-bold">✓</span>
              </div>
              <span>Leave management & approvals</span>
            </div>
            <div className="flex items-center gap-4 text-primary-foreground/90">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <span className="text-accent font-bold">✓</span>
              </div>
              <span>Payroll visibility & analytics</span>
            </div>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-info/10 blur-3xl" />
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Building2 className="w-7 h-7 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-muted-foreground mt-2">
              {isLogin 
                ? 'Enter your credentials to access your account' 
                : 'Fill in the details to get started'}
            </p>
          </div>

          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-12" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>Demo: admin@company.com / password123</p>
                <p>Or: employee@company.com / password123</p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={signupData.firstName}
                    onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={signupData.lastName}
                    onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  placeholder="EMP001"
                  value={signupData.employeeId}
                  onChange={(e) => setSignupData({ ...signupData, employeeId: e.target.value })}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signupEmail">Email</Label>
                <Input
                  id="signupEmail"
                  type="email"
                  placeholder="you@company.com"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={signupData.role}
                  onChange={(e) => setSignupData({ ...signupData, role: e.target.value as UserRole })}
                  className="w-full h-11 px-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="employee">Employee</option>
                  <option value="admin">HR / Admin</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signupPassword">Password</Label>
                <Input
                  id="signupPassword"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                  required
                  className="h-11"
                />
              </div>

              <Button type="submit" className="w-full h-12" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          )}

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-medium hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
