import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Briefcase, 
  DollarSign, 
  FileText, 
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Edit3,
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const InfoItem = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-card rounded-2xl border shadow-elegant overflow-hidden mb-6 animate-fade-in">
          <div className="h-32 gradient-hero" />
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16">
              <div className="relative">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.firstName}
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-card shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-2xl bg-primary flex items-center justify-center border-4 border-card shadow-lg">
                    <span className="text-4xl font-bold text-primary-foreground">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </span>
                  </div>
                )}
                <button className="absolute bottom-2 right-2 p-2 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 sm:pb-2">
                <h1 className="text-2xl font-bold text-foreground">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-muted-foreground">{user?.position}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                    {user?.department}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                    {user?.role}
                  </span>
                </div>
              </div>
              <Button
                variant={isEditing ? "accent" : "outline"}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="gap-2"
              >
                {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="personal" className="animate-slide-up">
          <TabsList className="w-full justify-start h-auto p-1 bg-muted/50 rounded-xl mb-6">
            <TabsTrigger value="personal" className="gap-2 rounded-lg data-[state=active]:bg-card">
              <User className="w-4 h-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="job" className="gap-2 rounded-lg data-[state=active]:bg-card">
              <Briefcase className="w-4 h-4" />
              Job Details
            </TabsTrigger>
            <TabsTrigger value="salary" className="gap-2 rounded-lg data-[state=active]:bg-card">
              <DollarSign className="w-4 h-4" />
              Salary
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-2 rounded-lg data-[state=active]:bg-card">
              <FileText className="w-4 h-4" />
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="bg-card rounded-2xl border p-6 shadow-elegant">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem icon={User} label="Full Name" value={`${user?.firstName} ${user?.lastName}`} />
              <InfoItem icon={Mail} label="Email Address" value={user?.email || ''} />
              
              {isEditing ? (
                <>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <Label htmlFor="phone" className="text-sm text-muted-foreground">Phone Number</Label>
                    <Input
                      id="phone"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <Label htmlFor="address" className="text-sm text-muted-foreground">Address</Label>
                    <Input
                      id="address"
                      value={editData.address}
                      onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </>
              ) : (
                <>
                  <InfoItem icon={Phone} label="Phone Number" value={user?.phone || 'Not provided'} />
                  <InfoItem icon={MapPin} label="Address" value={user?.address || 'Not provided'} />
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="job" className="bg-card rounded-2xl border p-6 shadow-elegant">
            <h2 className="text-lg font-semibold mb-4">Job Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem icon={User} label="Employee ID" value={user?.employeeId || ''} />
              <InfoItem icon={Briefcase} label="Position" value={user?.position || ''} />
              <InfoItem icon={Building2} label="Department" value={user?.department || ''} />
              <InfoItem icon={Calendar} label="Joining Date" value={user?.joiningDate || ''} />
            </div>
          </TabsContent>

          <TabsContent value="salary" className="bg-card rounded-2xl border p-6 shadow-elegant">
            <h2 className="text-lg font-semibold mb-4">Salary Structure</h2>
            <div className="space-y-4">
              <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border">
                <p className="text-sm text-muted-foreground mb-1">Annual Salary</p>
                <p className="text-3xl font-bold text-foreground">
                  ${user?.salary?.toLocaleString() || '0'}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Monthly: ${((user?.salary || 0) / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-muted/50 text-center">
                  <p className="text-sm text-muted-foreground">Basic</p>
                  <p className="text-xl font-semibold">60%</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 text-center">
                  <p className="text-sm text-muted-foreground">Allowances</p>
                  <p className="text-xl font-semibold">30%</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 text-center">
                  <p className="text-sm text-muted-foreground">Deductions</p>
                  <p className="text-xl font-semibold">10%</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="bg-card rounded-2xl border p-6 shadow-elegant">
            <h2 className="text-lg font-semibold mb-4">Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Employment Contract', 'ID Proof', 'Address Proof', 'Tax Documents'].map((doc) => (
                <div key={doc} className="flex items-center gap-3 p-4 rounded-xl border hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{doc}</p>
                    <p className="text-xs text-muted-foreground">PDF • Uploaded</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
