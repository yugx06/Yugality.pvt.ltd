import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Scale, User, Shield, Eye, EyeOff, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const roleConfig = {
  lawyer: {
    title: "Advocate Portal",
    subtitle: "Access your legal practice dashboard",
    icon: Scale,
    gradient: "from-slate-700 via-slate-800 to-slate-900",
    bgGradient: "from-slate-900/20 via-slate-800/10 to-slate-700/20",
    demo: { email: "lawyer@demo.com", password: "lawyer123" },
    features: ["Case Management", "Client Portal", "Document Drafting", "Court Calendar"]
  },
  client: {
    title: "Client Portal",
    subtitle: "Track your legal matters",
    icon: User,
    gradient: "from-slate-700 via-slate-800 to-slate-900",
    bgGradient: "from-slate-900/20 via-slate-800/10 to-slate-700/20",
    demo: { email: "client@demo.com", password: "client123" },
    features: ["Case Status", "Document Access", "Billing History", "Secure Messaging"]
  },
  admin: {
    title: "Admin Console",
    subtitle: "System administration & oversight",
    icon: Shield,
    gradient: "from-slate-700 via-slate-800 to-slate-900",
    bgGradient: "from-slate-900/20 via-slate-800/10 to-slate-700/20",
    demo: { email: "admin@demo.com", password: "admin123" },
    features: ["User Management", "System Settings", "Analytics", "Security Logs"]
  }
};

const Auth = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setIsSubmitting(true);
    const result = await login(email, password, selectedRole);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Welcome back!",
        description: `Logged in as ${roleConfig[selectedRole].title}`,
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const fillDemoCredentials = () => {
    if (!selectedRole) return;
    const demo = roleConfig[selectedRole].demo;
    setEmail(demo.email);
    setPassword(demo.password);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(200, 152, 56, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(200, 152, 56, 0.15) 0%, transparent 50%)'
          }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      </div>

      {/* Animated Background Overlay */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent rotate-12 animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-primary/5 via-transparent to-transparent -rotate-12 animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -200],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Logo & Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex flex-col items-center justify-center gap-4 mb-4">
            <div className="relative">
              <img src={logo} alt="Yugality" className="h-16 w-auto shadow-lg" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-2">
                YUGALITY
              </h1>
              <p className="text-muted-foreground text-sm flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" /> 
                Empowering Legal Excellence with AI
              </p>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedRole ? (
            /* Role Selection */
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl"
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-semibold text-center mb-8 text-foreground"
              >
                Select Your Portal
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-6">
                {(Object.entries(roleConfig) as [UserRole, typeof roleConfig.lawyer][]).map(([role, config], index) => (
                  <motion.button
                    key={role}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleRoleSelect(role)}
                    className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <config.icon className="w-7 h-7 text-white" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
                        {config.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">{config.subtitle}</p>

                      {/* Features */}
                      <ul className="space-y-2 mb-4">
                        {config.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="w-3 h-3 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Demo credentials hint */}
                      <div className="pt-4 border-t border-border/50">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium">Demo:</span> {config.demo.email}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Login Form */
            <motion.div
              key="login-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md"
            >
              <motion.div
                className={`relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-8 shadow-2xl`}
              >
                {/* Header gradient */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${roleConfig[selectedRole].gradient}`} />

                {/* Back button */}
                <button
                  onClick={() => setSelectedRole(null)}
                  className="mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  ← Back to portal selection
                </button>

                {/* Role icon and title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${roleConfig[selectedRole].gradient} flex items-center justify-center shadow-lg`}>
                    {(() => {
                      const Icon = roleConfig[selectedRole].icon;
                      return <Icon className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{roleConfig[selectedRole].title}</h2>
                    <p className="text-sm text-muted-foreground">{roleConfig[selectedRole].subtitle}</p>
                  </div>
                </div>

                {/* Login form */}
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="h-12 bg-background/50 border-border/50 focus:border-primary"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="h-12 bg-background/50 border-border/50 focus:border-primary pr-12"
                        required
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

                  {/* Demo credentials button */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={fillDemoCredentials}
                    className="w-full h-10 border-dashed border-primary/50 text-primary hover:bg-primary/10"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Fill Demo Credentials
                  </Button>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full h-12 bg-gradient-to-r ${roleConfig[selectedRole].gradient} hover:opacity-90 text-white font-semibold shadow-lg transition-all duration-300`}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Demo info box */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20"
                >
                  <p className="text-xs text-center text-muted-foreground">
                    <span className="font-semibold text-primary">Demo Credentials:</span>
                    <br />
                    Email: <code className="bg-background/50 px-1 rounded">{roleConfig[selectedRole].demo.email}</code>
                    <br />
                    Password: <code className="bg-background/50 px-1 rounded">{roleConfig[selectedRole].demo.password}</code>
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-xs text-muted-foreground text-center"
        >
          © 2026 LegalEase Pro. Secure • Reliable • Professional
        </motion.p>
      </div>
    </div>
  );
};

export default Auth;
