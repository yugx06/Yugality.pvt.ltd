import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Scale,
  ArrowRight,
  CheckCircle2,
  FileText,
  Users,
  Clock,
  Shield,
  Briefcase,
  Zap,
  BarChart3,
  Award,
  Star,
  Globe,
  Lock,
  TrendingUp,
  MessageSquare,
  Calendar,
  Database,
  Search,
  Smartphone,
  Laptop,
  Sparkles,
  Target,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Play,
  Building,
  Instagram
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AIAssistantDrawer } from "@/components/AIAssistantDrawer";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);
  const features = [
    {
      icon: Briefcase,
      title: "Complete Case Management",
      description: "Track every case detail from filing to verdict with intelligent organization and milestone tracking"
    },
    {
      icon: FileText,
      title: "Digital Briefcase",
      description: "Store and access all your case documents securely from anywhere, with smart categorization"
    },
    {
      icon: MessageSquare,
      title: "AI Legal Assistant",
      description: "Get instant help with legal research, drafting, and case analysis powered by advanced AI"
    },
    {
      icon: Calendar,
      title: "Smart Calendar System",
      description: "Never miss a hearing with automated deadline tracking and intelligent reminder alerts"
    },
    {
      icon: Search,
      title: "Legal Research Hub",
      description: "Access comprehensive legal databases with AI-powered search and case law mapping"
    },
    {
      icon: Users,
      title: "Client Portal & Billing",
      description: "Streamline client communication and automate billing with transparent invoicing tools"
    },
    {
      icon: BarChart3,
      title: "Practice Analytics",
      description: "Gain insights into your practice performance with real-time dashboards and reports"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance tracking to keep your practice data safe"
    },
    {
      icon: Globe,
      title: "Court Portal Integration",
      description: "Connect seamlessly with eCourts, GST, and government portals for efficient filing"
    }
  ];

  const integrations = [
    { name: "Supreme Court", icon: Scale },
    { name: "High Courts", icon: Briefcase },
    { name: "District Courts", icon: FileText },
    { name: "GST Portal", icon: Globe },
    { name: "Income Tax", icon: TrendingUp },
    { name: "MCA", icon: Building }
  ];

  const useCases = [
    {
      title: "Solo Practitioners",
      description: "Manage your entire practice from case intake to billing",
      benefits: ["Client management", "Document automation", "Time tracking", "Free plan available"]
    },
    {
      title: "Law Firms",
      description: "Scale your operations with team collaboration tools",
      benefits: ["Multi-user access", "Team analytics", "Client portal", "Role-based permissions"]
    },
    {
      title: "Corporate Legal Teams",
      description: "Enterprise-grade compliance and matter management",
      benefits: ["Compliance tracking", "Contract management", "Audit trails", "SSO integration"]
    }
  ];

  const stats = [
    { number: "15,000+", label: "Cases Managed", suffix: "" },
    { number: "800+", label: "Legal Professionals", suffix: "" },
    { number: "4.9", label: "Customer Rating", suffix: "/5" },
    { number: "99.9%", label: "Uptime", suffix: "" }
  ];

  const testimonials = [
    {
      name: "Adv. Priya Sharma",
      role: "Senior Advocate, Delhi High Court",
      text: "Yugality has completely transformed how I manage my practice. The AI assistant alone has saved me 10+ hours per week on legal research.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "Kumar & Associates",
      role: "Law Firm, Mumbai",
      text: "Finally, a platform built specifically for Indian legal practices. Our team efficiency has doubled, and client satisfaction is at an all-time high.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "Adv. Meera Patel",
      role: "Corporate Lawyer, Bangalore",
      text: "Enterprise-level features at a fraction of the cost. The compliance tracking and document automation are game-changers.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&crop=face"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      features: [
        "2-3 basic document templates",
        "50 MB digital briefcase storage",
        "Research workspace (read-only)",
        "AI assistant (1-2 prompts/day)",
        "Manual calendar entry only"
      ],
      cta: "Try & Explore"
    },
    {
      name: "Pro",
      price: "₹799",
      period: "per month",
      features: [
        "Unlimited premium templates with smart auto-fill",
        "10-20 GB advanced briefcase storage",
        "AI-assisted case summaries & research mapping",
        "Full-power AI drafting (pleadings, notices, contracts)",
        "Smart deadline detection & automated reminders",
        "Case-linked calendar events",
        "Priority alerts (hearings, filings, deadlines)",
        "PDF & DOCX exports with version history"
      ],
      cta: "Practice at Scale",
      popular: true
    },
    {
      name: "Customize",
      price: "Custom",
      period: "contact us",
      features: [
        "Everything in Pro PLUS",
        "Fully customizable templates & workflows",
        "Unlimited storage",
        "Dedicated account manager",
        "Custom integrations & API access",
        "White-label options",
        "Advanced security & compliance",
        "Priority 24/7 support"
      ],
      cta: "Contact Sales"
    }
  ];

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loader onLoadComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-white">
        {/* Navbar */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/80"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 group">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-14 h-14 rounded-xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow"
                >
                  <img src="/logo.jpeg" alt="Yugality" className="w-full h-full object-cover" />
                </motion.div>
                <span className="text-xl font-semibold text-black tracking-tight">Yugality</span>
              </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-black transition-colors">Features</a>
              <a href="#solutions" className="text-sm text-gray-600 hover:text-black transition-colors">Solutions</a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-black transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm text-gray-600 hover:text-black transition-colors">Customers</a>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/auth">
                <Button variant="ghost" className="text-black font-medium hover:bg-gray-100 rounded-full">
                  Sign in
                </Button>
              </Link>
              <Link to="/auth">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-black text-white hover:bg-gray-800 font-medium rounded-full px-6 shadow-sm">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
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
        <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center relative z-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-black bg-gray-100 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" /> The Future of Legal Practice
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold text-black mb-6 tracking-tighter leading-[1.1]">
              Simplifying Legal Practice,
              <br />
              <span className="bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent">
                Smarter Outcomes.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              The all-in-one AI-powered platform that helps Indian legal professionals manage cases, automate workflows, and delight clients.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/auth">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-black hover:bg-gray-900 text-white font-semibold text-lg px-12 py-7 rounded-full shadow-xl shadow-black/10 transition-all duration-200">
                    Start Free Trial
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
              <Link to="/auth">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="text-black bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-lg px-12 py-7 rounded-full font-semibold transition-all duration-200">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </motion.div>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-black" />
                <span>Free forever for solo practitioners</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-black" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-black fill-black" />
                <span className="font-semibold text-black">4.9/5</span> from 500+ reviews
              </div>
            </motion.div>
          </motion.div>
        </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="relative py-16 border-y border-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
              Trusted by leading legal professionals across India
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12">
              <motion.div 
                initial={{ opacity: 0.4 }}
                whileInView={{ opacity: 0.7 }}
                whileHover={{ opacity: 1, scale: 1.15, y: -5 }} 
                transition={{ type: "spring", stiffness: 300 }}
                className="text-2xl font-bold text-gray-800 cursor-pointer"
              >
                Delhi HC
              </motion.div>
              <motion.div 
                initial={{ opacity: 0.4 }}
                whileInView={{ opacity: 0.7 }}
                whileHover={{ opacity: 1, scale: 1.15, y: -5 }} 
                transition={{ type: "spring", stiffness: 300 }}
                className="text-2xl font-bold text-gray-800 cursor-pointer"
              >
                Bombay HC
              </motion.div>
              <motion.div 
                initial={{ opacity: 0.4 }}
                whileInView={{ opacity: 0.7 }}
                whileHover={{ opacity: 1, scale: 1.15, y: -5 }} 
                transition={{ type: "spring", stiffness: 300 }}
                className="text-2xl font-bold text-gray-800 cursor-pointer"
              >
                Supreme Court
              </motion.div>
              <motion.div 
                initial={{ opacity: 0.4 }}
                whileInView={{ opacity: 0.7 }}
                whileHover={{ opacity: 1, scale: 1.15, y: -5 }} 
                transition={{ type: "spring", stiffness: 300 }}
                className="text-2xl font-bold text-gray-800 cursor-pointer"
              >
                Karnataka HC
              </motion.div>
              <motion.div 
                initial={{ opacity: 0.4 }}
                whileInView={{ opacity: 0.7 }}
                whileHover={{ opacity: 1, scale: 1.15, y: -5 }} 
                transition={{ type: "spring", stiffness: 300 }}
                className="text-2xl font-bold text-gray-800 cursor-pointer"
              >
                Madras HC
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.08, y: -8 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 300 }}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-300"
                >
                  <motion.div 
                    className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent mb-2 tracking-tight"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                  >
                    {s.number}{s.suffix}
                  </motion.div>
                  <div className="text-gray-600 font-medium">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight">
                Complete legal ecosystem.
                <br />
                <span className="text-gray-500">All in one place.</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to manage cases, delight clients, and grow your practice—unified in one powerful platform
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group bg-white p-8 rounded-3xl border border-gray-200 hover:border-gray-300 transition-all duration-300"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow"
                  >
                    <f.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-black mb-3">
                    {f.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {f.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Showcase */}
      <section className="py-28 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">AI-Powered</span>
                <h2 className="text-5xl font-bold text-black mt-4 mb-6 tracking-tight">
                  Your 24/7 legal assistant
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Advanced AI that helps with research, drafting, case analysis, and client queries. Save hours every day and focus on what matters.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black mb-1">Instant Legal Research</h4>
                      <p className="text-gray-600">Access 1M+ case laws and statutes in seconds</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black mb-1">Smart Document Drafting</h4>
                      <p className="text-gray-600">Generate accurate legal documents in minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black mb-1">Case Outcome Prediction</h4>
                      <p className="text-gray-600">AI-powered insights on case strategies</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-12 aspect-square flex items-center justify-center"
              >
                <motion.img
                  src="/logo.jpeg"
                  alt="AI Assistant"
                  animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="w-48 h-48 object-contain rounded-2xl shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight">
                Built for every practice
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From solo practitioners to large firms, we have the perfect solution
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {useCases.map((useCase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-10 hover:border-gray-300 hover:shadow-2xl transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-black mb-4">{useCase.title}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">{useCase.description}</p>
                  <ul className="space-y-3">
                    {useCase.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-black flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-8 bg-black hover:bg-gray-800 text-white font-semibold rounded-full py-6">
                    Learn More
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-28 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                Seamless integrations
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16">
                Connect with all major Indian legal and government portals
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {integrations.map((integration, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center gap-4 p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all"
                >
                  <integration.icon className="w-10 h-10 text-white" />
                  <span className="text-sm font-semibold">{integration.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight">
                Simple, transparent pricing
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Start free, upgrade as you grow. No hidden fees.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-3xl p-10 ${
                    plan.popular 
                      ? 'bg-black text-white border-2 border-black shadow-2xl scale-105' 
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <span className="inline-block bg-white text-black text-xs font-bold px-4 py-2 rounded-full mb-4">
                      MOST POPULAR
                    </span>
                  )}
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-black'}`}>
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-black'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-gray-${plan.popular ? '300' : '600'}`}>
                      /{plan.period}
                    </span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-white' : 'text-black'}`} />
                        <span className={plan.popular ? 'text-gray-100' : 'text-gray-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full py-6 rounded-full font-semibold text-lg ${
                      plan.popular 
                        ? 'bg-white text-black hover:bg-gray-100' 
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-28 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight">
                Loved by legal professionals
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                See how Yugality is transforming legal practices across India
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-3xl border border-gray-200 hover:border-gray-300 transition-all duration-300"
                >
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, idx) => (
                      <Star key={idx} className="w-5 h-5 text-black fill-black" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover shadow-sm"
                    />
                    <div>
                      <h4 className="text-black font-bold">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-20 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-8 py-4">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&crop=face"
                  ].map((src, i) => (
                    <img 
                      key={i}
                      src={src}
                      alt={`User ${i + 1}`}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                  ))}
                </div>
                <div className="text-left ml-4">
                  <div className="text-sm font-bold text-black">800+ legal professionals</div>
                  <div className="text-xs text-gray-600">joined this month</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block"
              >
                <Scale className="w-20 h-20 mx-auto mb-6" />
              </motion.div>
              
              <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Ready to transform
                <br />
                your practice?
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join 800+ legal professionals already using Yugality to manage their practice better.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/auth">
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="bg-white hover:bg-gray-100 text-black font-bold text-xl px-16 py-8 rounded-full shadow-xl transition-all duration-200">
                      Get Started Free
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/auth">
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" className="text-white bg-transparent border-2 border-white hover:bg-white/10 text-xl px-16 py-8 rounded-full font-bold transition-all duration-200">
                      Talk to Sales
                    </Button>
                  </motion.div>
                </Link>
              </div>

              <p className="text-gray-500 text-sm mt-8">
                Free forever • No credit card required • Setup in 2 minutes
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight">
                Frequently asked questions
              </h2>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  q: "Is Yugality really free for solo practitioners?",
                  a: "Yes! Our Solo plan is completely free forever with up to 50 active cases, basic templates, and core features."
                },
                {
                  q: "Can I switch plans at any time?",
                  a: "Absolutely. Upgrade or downgrade your plan anytime. Changes take effect immediately with prorated billing."
                },
                {
                  q: "Is my data secure?",
                  a: "We use bank-grade 256-bit encryption, regular security audits, and comply with all Indian data protection regulations."
                },
                {
                  q: "Do you offer training and support?",
                  a: "Yes! All plans include comprehensive onboarding, documentation, and email support. Pro and Enterprise get priority support."
                }
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all"
                >
                  <h3 className="text-xl font-bold text-black mb-3">{faq.q}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-5 gap-12 mb-12">
              <div className="md:col-span-2">
                <Link to="/" className="flex items-center gap-2 mb-6 group">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 rounded-xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow"
                  >
                    <img src="/logo.jpeg" alt="Yugality" className="w-full h-full object-cover" />
                  </motion.div>
                  <span className="text-2xl font-bold text-black">Yugality</span>
                </Link>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  The all-in-one legal practice management platform designed for Indian legal professionals.
                </p>
                <div className="flex gap-4">
                  <motion.a whileHover={{ scale: 1.1 }} href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                    𝕏
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.1 }} href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                    in
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.1 }} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>

              <div>
                <h3 className="text-black font-bold mb-4 text-sm uppercase tracking-wider">Product</h3>
                <ul className="space-y-3">
                  <li><a href="#features" className="text-gray-600 hover:text-black transition-colors">Features</a></li>
                  <li><a href="#pricing" className="text-gray-600 hover:text-black transition-colors">Pricing</a></li>
                  <li><Link to="/auth" className="text-gray-600 hover:text-black transition-colors">Security</Link></li>
                  <li><Link to="/auth" className="text-gray-600 hover:text-black transition-colors">Integrations</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-black font-bold mb-4 text-sm uppercase tracking-wider">Company</h3>
                <ul className="space-y-3">
                  <li><Link to="/auth" className="text-gray-600 hover:text-black transition-colors">About Us</Link></li>
                  <li><Link to="/auth" className="text-gray-600 hover:text-black transition-colors">Careers</Link></li>
                  <li><Link to="/auth" className="text-gray-600 hover:text-black transition-colors">Blog</Link></li>
                  <li><Link to="/auth" className="text-gray-600 hover:text-black transition-colors">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-black font-bold mb-4 text-sm uppercase tracking-wider">Legal</h3>
                <ul className="space-y-3">
                  <li><Link to="/auth" className="text-gray-600 hover:text-black transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/auth" className="text-gray-600 hover:text-black transition-colors">Terms of Service</Link></li>
                  <li><Link to="/auth" className="text-gray-600 hover:text-black transition-colors">Cookie Policy</Link></li>
                  <li><Link to="/auth" className="text-gray-600 hover:text-black transition-colors">Compliance</Link></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">© 2026 Yugality Technologies Pvt. Ltd. All rights reserved.</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>Made in India 🇮🇳</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <WhatsAppButton />
      
      {/* AI Assistant Button - Bottom Right */}
      <motion.button
        onClick={() => setIsAIDrawerOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-black hover:bg-gray-800 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* AI Assistant Drawer */}
      <AIAssistantDrawer isOpen={isAIDrawerOpen} onClose={() => setIsAIDrawerOpen(false)} />
      </div>
    </>
  );
};

export default Landing;
