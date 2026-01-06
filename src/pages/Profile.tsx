import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  User, Camera, Mail, Phone, MapPin, Briefcase, Calendar, 
  Shield, Crown, Save, Edit2, Check, X, Upload, Sparkles
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const roleConfig = {
  lawyer: {
    gradient: "from-amber-500 via-yellow-500 to-orange-500",
    bgGradient: "from-amber-900/20 via-yellow-900/10 to-orange-900/20",
    title: "Senior Advocate",
    icon: Crown
  },
  client: {
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bgGradient: "from-emerald-900/20 via-teal-900/10 to-cyan-900/20",
    title: "Valued Client",
    icon: User
  },
  admin: {
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    bgGradient: "from-purple-900/20 via-violet-900/10 to-indigo-900/20",
    title: "System Administrator",
    icon: Shield
  }
};

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(() => {
    return localStorage.getItem(`avatar_${user?.id}`) || null;
  });
  
  const [formData, setFormData] = useState(() => {
    const stored = localStorage.getItem(`profile_${user?.id}`);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      name: user?.name || "",
      email: user?.email || "",
      phone: "+91 98765 43210",
      location: "Mumbai, Maharashtra",
      bio: "Experienced legal professional with a passion for justice and client advocacy.",
      specialization: user?.role === 'lawyer' ? "Corporate Law, Civil Litigation" : "",
      barCouncilId: user?.role === 'lawyer' ? "MH/1234/2015" : "",
      experience: user?.role === 'lawyer' ? "12 years" : "",
      joinedDate: "January 2024"
    };
  });

  const config = user?.role ? roleConfig[user.role] : roleConfig.client;
  const RoleIcon = config.icon;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setAvatar(base64);
        localStorage.setItem(`avatar_${user?.id}`, base64);
        toast({
          title: "Avatar Updated",
          description: "Your profile picture has been updated successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem(`profile_${user?.id}`, JSON.stringify(formData));
    setIsEditing(false);
    toast({
      title: "Profile Saved",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleCancel = () => {
    const stored = localStorage.getItem(`profile_${user?.id}`);
    if (stored) {
      setFormData(JSON.parse(stored));
    }
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl border border-border bg-card"
        >
          {/* Gradient Banner */}
          <div className={`h-32 bg-gradient-to-r ${config.gradient} relative`}>
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
            <motion.div
              className="absolute top-4 right-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Sparkles className="w-6 h-6 text-white/60" />
            </motion.div>
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="relative -mt-16 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative inline-block"
              >
                <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                  <AvatarImage src={avatar || undefined} />
                  <AvatarFallback className={`bg-gradient-to-br ${config.gradient} text-white text-4xl font-bold`}>
                    {formData.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
                >
                  <Camera className="w-5 h-5 text-primary-foreground" />
                </motion.button>
              </motion.div>
            </div>

            {/* Name and Role */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">{formData.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`bg-gradient-to-r ${config.gradient} text-white border-0`}>
                    <RoleIcon className="w-3 h-3 mr-1" />
                    {config.title}
                  </Badge>
                  <span className="text-sm text-muted-foreground">• Member since {formData.joinedDate}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="w-4 h-4 mr-1" /> Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave} className={`bg-gradient-to-r ${config.gradient} text-white`}>
                      <Check className="w-4 h-4 mr-1" /> Save Changes
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="w-4 h-4 mr-1" /> Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-muted/50"
                    />
                  ) : (
                    <p className="text-foreground font-medium">{formData.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" /> Email
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-muted/50"
                    />
                  ) : (
                    <p className="text-foreground">{formData.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" /> Phone
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-muted/50"
                    />
                  ) : (
                    <p className="text-foreground">{formData.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" /> Location
                  </Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="bg-muted/50"
                    />
                  ) : (
                    <p className="text-foreground">{formData.location}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Professional Information (for lawyers) or Account Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="w-5 h-5 text-primary" />
                  {user?.role === 'lawyer' ? 'Professional Details' : user?.role === 'admin' ? 'Admin Details' : 'Account Details'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user?.role === 'lawyer' && (
                  <>
                    <div className="space-y-2">
                      <Label>Bar Council ID</Label>
                      {isEditing ? (
                        <Input
                          value={formData.barCouncilId}
                          onChange={(e) => setFormData({ ...formData, barCouncilId: e.target.value })}
                          className="bg-muted/50"
                        />
                      ) : (
                        <p className="text-foreground font-medium">{formData.barCouncilId}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Specialization</Label>
                      {isEditing ? (
                        <Input
                          value={formData.specialization}
                          onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                          className="bg-muted/50"
                        />
                      ) : (
                        <p className="text-foreground">{formData.specialization}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Experience</Label>
                      {isEditing ? (
                        <Input
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          className="bg-muted/50"
                        />
                      ) : (
                        <p className="text-foreground">{formData.experience}</p>
                      )}
                    </div>
                  </>
                )}

                {user?.role === 'admin' && (
                  <>
                    <div className="space-y-2">
                      <Label>Access Level</Label>
                      <p className="text-foreground font-medium">Super Administrator</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Permissions</Label>
                      <div className="flex flex-wrap gap-2">
                        {['Users', 'Settings', 'Analytics', 'Security'].map((perm) => (
                          <Badge key={perm} variant="secondary" className="bg-purple-500/10 text-purple-500">
                            {perm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {user?.role === 'client' && (
                  <>
                    <div className="space-y-2">
                      <Label>Client ID</Label>
                      <p className="text-foreground font-medium">CLT-2024-0042</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Active Cases</Label>
                      <p className="text-foreground">3 ongoing matters</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Assigned Advocate</Label>
                      <p className="text-foreground">Adv. Rajesh Kumar</p>
                    </div>
                  </>
                )}

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Label>Bio</Label>
                  {isEditing ? (
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="bg-muted/50 min-h-[100px]"
                    />
                  ) : (
                    <p className="text-muted-foreground text-sm">{formData.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {user?.role === 'lawyer' && (
            <>
              <StatCard label="Cases Won" value="156" icon={Check} color="text-green-500 bg-green-500/10" />
              <StatCard label="Total Clients" value="89" icon={User} color="text-blue-500 bg-blue-500/10" />
              <StatCard label="Documents" value="1.2K" icon={Briefcase} color="text-purple-500 bg-purple-500/10" />
              <StatCard label="Experience" value="12 Yrs" icon={Calendar} color="text-amber-500 bg-amber-500/10" />
            </>
          )}
          {user?.role === 'client' && (
            <>
              <StatCard label="Active Cases" value="3" icon={Briefcase} color="text-blue-500 bg-blue-500/10" />
              <StatCard label="Documents" value="24" icon={Briefcase} color="text-purple-500 bg-purple-500/10" />
              <StatCard label="Hearings" value="5" icon={Calendar} color="text-amber-500 bg-amber-500/10" />
              <StatCard label="Messages" value="12" icon={Mail} color="text-green-500 bg-green-500/10" />
            </>
          )}
          {user?.role === 'admin' && (
            <>
              <StatCard label="Total Users" value="234" icon={User} color="text-blue-500 bg-blue-500/10" />
              <StatCard label="Active Cases" value="89" icon={Briefcase} color="text-purple-500 bg-purple-500/10" />
              <StatCard label="System Health" value="99.9%" icon={Shield} color="text-green-500 bg-green-500/10" />
              <StatCard label="Uptime" value="30 Days" icon={Calendar} color="text-amber-500 bg-amber-500/10" />
            </>
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

const StatCard = ({ label, value, icon: Icon, color }: { label: string; value: string; icon: any; color: string }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    className="bg-card border border-border rounded-xl p-4"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
      </div>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  </motion.div>
);

export default Profile;
