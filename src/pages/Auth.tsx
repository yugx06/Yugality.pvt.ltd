import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Welcome back!",
        description: "Logged in successfully",
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
    setEmail("lawyer@demo.com");
    setPassword("lawyer123");
  };

  return (
    <div className="min-h-screen bg-white relative flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-white/50" />
      </div>

      <div className="relative z-10 w-full max-w-md p-8">
        {/* Logo & Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex flex-col items-center gap-4 mb-8">
            <img src={logo} alt="Yugality" className="h-16 w-auto" />
            <div className="text-center">
              <h1 className="text-4xl font-semibold text-black tracking-tight mb-2">
                Yugality
              </h1>
              <p className="text-gray-600 text-base">
                Advocate Portal
              </p>
            </div>
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full"
        >
          <motion.div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-black font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12 bg-white border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-black font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 bg-white border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
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
                className="w-full h-11 border-gray-300 text-black hover:bg-gray-50"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Use Demo Credentials
              </Button>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium shadow-sm transition-all duration-200"
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
              className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200"
            >
              <p className="text-xs text-center text-gray-600">
                <span className="font-semibold text-black">Demo Credentials:</span>
                <br />
                Email: <code className="bg-white px-2 py-0.5 rounded border border-gray-200">lawyer@demo.com</code>
                <br />
                Password: <code className="bg-white px-2 py-0.5 rounded border border-gray-200">lawyer123</code>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-xs text-gray-500 text-center"
        >
          © 2026 Yugality. Secure • Reliable • Professional
        </motion.p>
      </div>
    </div>
  );
};

export default Auth;
