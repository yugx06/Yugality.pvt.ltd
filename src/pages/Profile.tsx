import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  User, Camera, Mail, Phone, MapPin, Briefcase, Calendar, 
  Shield, Save, Edit2, Check, X, Upload, Sparkles,
  Award, GraduationCap, TrendingUp, FileText, Star, Clock,
  CheckCircle, AlertCircle, Building, Linkedin, MessageCircle, 
  Download, ExternalLink
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
    gradient: "from-gray-900 via-gray-800 to-black",
    bgGradient: "from-gray-900/20 via-gray-800/10 to-black/20",
    title: "Senior Advocate",
    icon: Star,
    defaultImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop&crop=face"
  },
  client: {
    gradient: "from-gray-900 via-gray-800 to-gray-700",
    bgGradient: "from-gray-900/20 via-gray-800/10 to-gray-700/20",
    title: "Valued Client",
    icon: User,
    defaultImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
  },
  admin: {
    gradient: "from-gray-900 via-gray-800 to-black",
    bgGradient: "from-gray-900/20 via-gray-800/10 to-black/20",
    title: "System Administrator",
    icon: Shield,
    defaultImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
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
      whatsapp: "+91 98765 43210",
      location: "Mumbai, Maharashtra",
      bio: "Experienced legal professional with a passion for justice and client advocacy.",
      specialization: user?.role === 'lawyer' ? "Corporate Law, Civil Litigation" : "",
      barCouncilId: user?.role === 'lawyer' ? "MH/1234/2015" : "",
      experience: user?.role === 'lawyer' ? "12 years" : "",
      joinedDate: "January 2024",
      linkedin: user?.role === 'lawyer' ? "linkedin.com/in/adv-rajesh-kumar" : "linkedin.com/in/profile",
      resumeUrl: user?.role === 'lawyer' ? "/documents/resume_adv_kumar.pdf" : ""
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
                  <AvatarImage src={avatar || config.defaultImage} alt={formData.name} className="object-cover" />
                  <AvatarFallback>
                    <img src={config.defaultImage} alt={formData.name} className="w-full h-full object-cover" />
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

          {/* Contact & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ExternalLink className="w-5 h-5 text-primary" />
                  Contact & Social Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp
                  </Label>
                  {isEditing ? (
                    <Input
                      id="whatsapp"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="bg-muted/50"
                      placeholder="+91 98765 43210"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="text-foreground">{formData.whatsapp}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => window.open(`https://wa.me/${formData.whatsapp.replace(/[^0-9]/g, '')}`, '_blank')}
                      >
                        <MessageCircle className="w-3 h-3 mr-1" /> Message
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-600" /> LinkedIn Profile
                  </Label>
                  {isEditing ? (
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="bg-muted/50"
                      placeholder="linkedin.com/in/yourprofile"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="text-foreground text-sm">{formData.linkedin}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => window.open(`https://${formData.linkedin}`, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" /> Visit
                      </Button>
                    </div>
                  )}
                </div>

                {user?.role === 'lawyer' && (
                  <div className="space-y-2">
                    <Label htmlFor="resume" className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-purple-500" /> Resume / CV
                    </Label>
                    {isEditing ? (
                      <div className="flex gap-2">
                        <Input
                          id="resume"
                          value={formData.resumeUrl}
                          onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                          className="bg-muted/50 flex-1"
                          placeholder="/documents/resume.pdf"
                        />
                        <Button size="sm" variant="outline">
                          <Upload className="w-3 h-3 mr-1" /> Upload
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-foreground text-sm">resume_adv_kumar.pdf</p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() => {
                            toast({
                              title: "Downloading Resume",
                              description: "Your resume is being downloaded.",
                            });
                          }}
                        >
                          <Download className="w-3 h-3 mr-1" /> Download
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" /> Quick Actions
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                      onClick={() => window.location.href = `mailto:${formData.email}`}
                    >
                      <Mail className="w-3 h-3 mr-1" /> Send Email
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                      onClick={() => window.location.href = `tel:${formData.phone}`}
                    >
                      <Phone className="w-3 h-3 mr-1" /> Call
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                      onClick={() => window.open(`https://wa.me/${formData.whatsapp.replace(/[^0-9]/g, '')}`, '_blank')}
                    >
                      <MessageCircle className="w-3 h-3 mr-1" /> WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Professional Information (for lawyers) or Account Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
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
              <StatCard label="Cases Won" value="16" icon={Check} color="text-green-500 bg-green-500/10" />
              <StatCard label="Total Clients" value="8" icon={User} color="text-blue-500 bg-blue-500/10" />
              <StatCard label="Documents" value="14" icon={Briefcase} color="text-purple-500 bg-purple-500/10" />
              <StatCard label="Experience" value="15 Yrs" icon={Calendar} color="text-amber-500 bg-amber-500/10" />
            </>
          )}
          {user?.role === 'client' && (
            <>
              <StatCard label="Active Cases" value="3" icon={Briefcase} color="text-blue-500 bg-blue-500/10" />
              <StatCard label="Documents" value="14" icon={Briefcase} color="text-purple-500 bg-purple-500/10" />
              <StatCard label="Hearings" value="2" icon={Calendar} color="text-amber-500 bg-amber-500/10" />
              <StatCard label="Satisfaction" value="95%" icon={Shield} color="text-green-500 bg-green-500/10" />
            </>
          )}
          {user?.role === 'admin' && (
            <>
              <StatCard label="Total Users" value="34" icon={User} color="text-blue-500 bg-blue-500/10" />
              <StatCard label="Active Cases" value="9" icon={Briefcase} color="text-purple-500 bg-purple-500/10" />
              <StatCard label="System Health" value="98.9%" icon={Shield} color="text-green-500 bg-green-500/10" />
              <StatCard label="Uptime" value="30 Days" icon={Calendar} color="text-amber-500 bg-amber-500/10" />
            </>
          )}
        </motion.div>

        {/* Additional Sections */}
        {user?.role === 'lawyer' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Award className="w-5 h-5 text-amber-500" />
                    Achievements & Awards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: "Best Lawyer Award 2024", org: "Bar Council of India", date: "Dec 2024", description: "Outstanding contribution to legal profession" },
                    { title: "Excellence in Corporate Law", org: "Legal Excellence Forum", date: "Aug 2024", description: "Landmark corporate litigation victories" },
                    { title: "Top 100 Advocates", org: "Indian Law Society", date: "Jan 2024", description: "Ranked #23 among top advocates" },
                    { title: "Pro Bono Service Award", org: "Mumbai Legal Aid Society", date: "Sep 2023", description: "500+ hours of free legal aid" },
                    { title: "Legal Innovation Award", org: "Tech Law Forum", date: "Mar 2023", description: "Digital transformation in legal practice" },
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                        <Star className="w-5 h-5 text-amber-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.org}</p>
                        <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                        {(achievement as any).description && (
                          <p className="text-xs text-muted-foreground mt-1 italic">{(achievement as any).description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <GraduationCap className="w-5 h-5 text-blue-500" />
                    Education & Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: "LLM in Corporate Law", institution: "Harvard Law School", year: "2015", grade: "Distinction" },
                    { title: "LLB (Hons.)", institution: "National Law School of India", year: "2012", grade: "First Class" },
                    { title: "Certified Mediator", institution: "Indian Mediation Institute", year: "2018", grade: "Level 3" },
                    { title: "Cyber Law Certification", institution: "NALSAR University", year: "2020", grade: "Advanced" },
                    { title: "Arbitration Practitioner", institution: "London Court of Arbitration", year: "2019", grade: "Certified" },
                  ].map((cert, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{cert.title}</p>
                        <p className="text-xs text-muted-foreground">{cert.institution}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">{cert.year}</p>
                          {(cert as any).grade && (
                            <Badge variant="secondary" className="text-[10px] h-4 px-1">{(cert as any).grade}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Practice Areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Building className="w-5 h-5 text-purple-500" />
                    Practice Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Corporate Law",
                      "Civil Litigation",
                      "Criminal Defense",
                      "Property Law",
                      "Family Law",
                      "Tax Law",
                      "Intellectual Property",
                      "Contract Law",
                      "Cyber Law",
                      "Banking & Finance",
                      "Arbitration",
                      "Consumer Protection",
                      "Labour Law",
                      "Environmental Law",
                      "Real Estate",
                      "Immigration Law"
                    ].map((area, index) => (
                      <Badge key={index} variant="outline" className="text-sm border-purple-500/30 text-purple-500">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Success Rate</span>
                      <span className="font-bold text-green-500">85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Client Satisfaction</span>
                      <span className="font-bold text-blue-500">92%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Case Resolution Time</span>
                      <span className="font-bold text-amber-500">Fast</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {user?.role === 'client' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Active Cases */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Active Cases
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: "Property Dispute - Plot #247", status: "In Progress", progress: 65, advocate: "Adv. Rajesh Kumar", caseNo: "DC/2024/1245", nextHearing: "Jan 15, 2026" },
                    { title: "Consumer Complaint - E-commerce", status: "Under Review", progress: 30, advocate: "Adv. Priya Sharma", caseNo: "CF/2025/0089", nextHearing: "Jan 20, 2026" },
                    { title: "Insurance Claim Settlement", status: "Pending", progress: 15, advocate: "Adv. Rajesh Kumar", caseNo: "IC/2025/0456", nextHearing: "Jan 28, 2026" },
                    { title: "Employment Dispute Resolution", status: "Mediation", progress: 45, advocate: "Adv. Meera Desai", caseNo: "LC/2024/7890", nextHearing: "Jan 18, 2026" },
                  ].map((caseItem, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm">{caseItem.title}</p>
                          <p className="text-xs text-muted-foreground">Case: {(caseItem as any).caseNo}</p>
                          <p className="text-xs text-muted-foreground">Advocate: {caseItem.advocate}</p>
                          <p className="text-xs text-amber-600 mt-1">Next Hearing: {(caseItem as any).nextHearing}</p>
                        </div>
                        <Badge variant="outline" className="text-xs flex-shrink-0">
                          {caseItem.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{caseItem.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${caseItem.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="w-5 h-5 text-cyan-500" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { action: "Document uploaded", detail: "Property Sale Agreement (Final Draft)", time: "2 hours ago", icon: FileText, color: "cyan" },
                    { action: "Consultation scheduled", detail: "Video call with Adv. Rajesh Kumar", time: "1 day ago", icon: Calendar, color: "blue" },
                    { action: "Payment completed", detail: "Legal consultation fee ₹3,500", time: "3 days ago", icon: CheckCircle, color: "green" },
                    { action: "Case update received", detail: "Property Dispute - Court date set", time: "4 days ago", icon: AlertCircle, color: "amber" },
                    { action: "Message from advocate", detail: "Document review completed", time: "5 days ago", icon: Mail, color: "purple" },
                    { action: "E-signature completed", detail: "POA Document signed digitally", time: "1 week ago", icon: CheckCircle, color: "green" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        activity.color === 'cyan' ? 'bg-cyan-500/10' :
                        activity.color === 'blue' ? 'bg-blue-500/10' :
                        activity.color === 'green' ? 'bg-green-500/10' :
                        activity.color === 'amber' ? 'bg-amber-500/10' :
                        'bg-purple-500/10'
                      }`}>
                        <activity.icon className={`w-4 h-4 ${
                          activity.color === 'cyan' ? 'text-cyan-500' :
                          activity.color === 'blue' ? 'text-blue-500' :
                          activity.color === 'green' ? 'text-green-500' :
                          activity.color === 'amber' ? 'text-amber-500' :
                          'text-purple-500'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.detail}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Hearings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="w-5 h-5 text-amber-500" />
                    Upcoming Hearings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { case: "Property Dispute - Plot #247", caseNo: "DC/2024/1245", date: "Jan 15, 2026", time: "10:30 AM", court: "District Court, Mumbai", room: "Court Room 3" },
                    { case: "Consumer Complaint", caseNo: "CF/2025/0089", date: "Jan 20, 2026", time: "2:00 PM", court: "Consumer Forum, Andheri", room: "Hall B" },
                    { case: "Employment Dispute", caseNo: "LC/2024/7890", date: "Jan 18, 2026", time: "11:00 AM", court: "Labour Court, BKC", room: "Mediation Room 1" },
                    { case: "Insurance Claim", caseNo: "IC/2025/0456", date: "Jan 28, 2026", time: "3:30 PM", court: "Civil Court, Bandra", room: "Court Room 5" },
                  ].map((hearing, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm">{hearing.case}</p>
                          <p className="text-xs text-muted-foreground">Case No: {(hearing as any).caseNo}</p>
                        </div>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" /> {hearing.date} at {hearing.time}
                        </p>
                        <p className="text-foreground font-medium">{hearing.court}</p>
                        <p className="text-muted-foreground">{(hearing as any).room}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
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
