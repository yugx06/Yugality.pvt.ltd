import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Scale,
  ArrowRight,
  CheckCircle2,
  Phone,
  FileText,
  Users,
  Clock,
  Shield,
  Briefcase,
  Home,
  Building2,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Star,
  DollarSign,
  Zap,
  Sparkles,
  AlertCircle,
  Target,
  Eye,
  Lightbulb,
  TrendingUp,
  BarChart3,
  Gauge,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Landing = () => {
  const oldWay = [
    { icon: Clock, title: "3-15 Day Turnaround", desc: "Waiting for simple legal work" },
    { icon: DollarSign, title: "Unpredictable Costs", desc: "Legal expenses eat into budgets" },
    { icon: AlertCircle, title: "Panic Mode", desc: "Last-minute urgent legal needs" },
    { icon: FileText, title: "Paper Heavy", desc: "Fragmented document management" }
  ];

  const yugalityWay = [
    { icon: Zap, title: "Instant Connect", desc: "Lawyers ready in seconds", status: "OPERATIONAL" },
    { icon: DollarSign, title: "Transparent Pricing", desc: "Know what you pay upfront", status: "OPTIMIZED" },
    { icon: Clock, title: "24/7 Available", desc: "Legal help when you need it", status: "ALWAYS ON" },
    { icon: FileText, title: "Digital First", desc: "All cases organized, accessible", status: "STREAMLINED" }
  ];

  const services = [
    {
      icon: Briefcase,
      title: "AI Case Management",
      description: "Intelligent workflow automation for case tracking, deadlines, and client communication",
      tag: "AUTOMATE. ORGANIZE. SCALE."
    },
    {
      icon: FileText,
      title: "Smart Document Automation",
      description: "Generate legal documents with AI-powered templates and clause suggestions",
      tag: "DRAFT. REVIEW. DONE."
    },
    {
      icon: Users,
      title: "Client Portal & Collaboration",
      description: "Secure client portals with real-time updates and seamless team collaboration",
      tag: "CONNECT. COLLABORATE. DELIVER."
    },
    {
      icon: BarChart3,
      title: "Practice Analytics",
      description: "Data-driven insights on case volumes, revenue, and operational efficiency",
      tag: "MEASURE. OPTIMIZE. GROW."
    },
    {
      icon: Shield,
      title: "Compliance & Risk Management",
      description: "Automated compliance tracking and risk alerts for regulatory requirements",
      tag: "COMPLIANT. SECURE. PROTECTED."
    },
    {
      icon: Clock,
      title: "Time & Billing Automation",
      description: "Automated time tracking, invoicing, and payment collection",
      tag: "TRACK. BILL. COLLECT."
    }
  ];

  const practiceAreas = [
    {
      icon: Briefcase,
      title: "Business Law",
      description: "Contracts, compliance, and corporate matters"
    },
    {
      icon: Home,
      title: "Family Law",
      description: "Divorce, custody, and family disputes"
    },
    {
      icon: Building2,
      title: "Real Estate Law",
      description: "Property transactions and disputes"
    },
    {
      icon: Shield,
      title: "Criminal Defense",
      description: "Expert criminal legal defense"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Cases Resolved" },
    { number: "500+", label: "Expert Lawyers" },
    { number: "4.8", label: "Client Rating" },
    { number: "24/7", label: "Availability" }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">

      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Yugality" className="h-10 w-10" />
            <span className="text-2xl font-bold text-primary">YUGALITY</span>
          </Link>
          <div className="flex gap-4">
            <Link to="/auth">
              <Button variant="ghost" className="text-white">Login</Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-primary text-white">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-primary/20 backdrop-blur-sm rounded-full mb-8 border border-primary/30"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-white">India's Leading Legal Platform</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Bharat's <span className="bg-gradient-to-r from-primary via-yellow-500 to-primary bg-clip-text text-transparent">First</span> Core AI
              <br />
              <span className="text-white">Operating System for</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-yellow-500 to-primary bg-clip-text text-transparent">
                Legal Professionals
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Enabling solo practitioners and small law firms to access powerful legal technology through intuitive, 
              affordable, and AI-driven workflow automation.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-primary to-yellow-600 hover:shadow-[0_0_40px_rgba(200,152,56,0.5)] text-white font-bold text-lg px-12 py-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="text-black bg-white/90 hover:bg-white border-2 border-primary hover:border-primary text-lg px-12 py-8 rounded-xl backdrop-blur-sm transition-all duration-300 font-semibold">
                  Schedule Demo
                </Button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Trusted by 10,000+ clients</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>500+ Expert lawyers</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span>4.8/5 Rating</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem-Solution Section - Inspired by DueDraft */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The system is <span className="text-primary">fragmented.</span>
              <br />
              <span className="text-slate-400 italic text-3xl">We built the infrastructure to fix it.</span>
            </h2>

            {/* Tabs */}
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-1 mb-8">
              <button className="px-6 py-2 rounded-full bg-primary text-black font-semibold text-sm transition-all">
                For Businesses
              </button>
              <button className="px-6 py-2 rounded-full text-white hover:bg-white/10 font-semibold text-sm transition-all">
                For Professionals
              </button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Old Way */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-900/20 to-red-950/10 backdrop-blur-md border border-red-500/30 rounded-3xl p-8"
            >
              <div className="mb-6">
                <span className="text-xs text-red-400 font-bold tracking-wider">THE OLD LOOP</span>
                <h3 className="text-2xl font-bold text-white mt-2 flex items-center gap-3">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                  The Friction Loop
                </h3>
              </div>
              
              <div className="space-y-4">
                {oldWay.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-red-950/40 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-red-400" />
                      </div>
                      <h4 className="text-white font-bold text-lg">{item.title}</h4>
                    </div>
                    <p className="text-slate-400 text-sm ml-16">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs text-red-400 font-mono">System status:</span>
                  <span className="px-3 py-1.5 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-xs font-bold">
                    ● FRAGMENTED
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Yugality Way */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/20 via-yellow-900/10 to-primary/5 backdrop-blur-md border border-primary/40 rounded-3xl p-8"
            >
              <div className="mb-6">
                <span className="text-xs text-primary font-bold tracking-wider">YUGALITY LEGAL OS</span>
                <h3 className="text-2xl font-bold text-white mt-2 flex items-center gap-3">
                  <Zap className="w-8 h-8 text-primary" />
                  The Growth Engine
                </h3>
              </div>
              
              <div className="space-y-4">
                {yugalityWay.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-2xl p-6 hover:border-primary/50 hover:bg-primary/15 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h4 className="text-white font-bold text-lg">{item.title}</h4>
                      </div>
                      <span className="text-xs text-primary font-mono px-2 py-1 bg-primary/20 rounded">{item.status}</span>
                    </div>
                    <p className="text-slate-300 text-sm ml-16">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs text-primary font-mono">System status:</span>
                  <span className="px-3 py-1.5 bg-primary/20 border border-primary/40 rounded-lg text-primary text-xs font-bold">
                    ● OPERATIONAL • OPTIMIZED
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-xl md:text-2xl text-slate-300 font-medium flex items-center justify-center gap-3">
              <span className="text-primary text-2xl">⚡</span>
              This isn't just software. It's the modern default for <span className="text-primary font-bold ml-2">legal trust</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything your practice needs for <span className="text-primary">modern legal workflows</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              From case management to client delivery - quick, smart, effortless
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-primary/50 hover:shadow-[0_0_30px_rgba(200,152,56,0.2)] transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:scale-110 transition-all">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {s.description}
                </p>
                <p className="text-xs font-bold text-primary tracking-wide">
                  {s.tag}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-all duration-300"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent mb-2">
                  {s.number}
                </div>
                <div className="text-slate-300 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-md border border-primary/30 rounded-3xl p-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-white">Mission</h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                To become the <span className="text-primary font-bold">Bharat First</span> core AI Operating System for legal professionals, 
                enabling solo practitioners and small law firms to access powerful legal technology through intuitive, 
                affordable, and AI-driven workflow automation.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 backdrop-blur-md border border-blue-400/30 rounded-3xl p-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-blue-400/20 rounded-xl flex items-center justify-center">
                  <Eye className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold text-white">Vision</h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                To transform India's legal ecosystem from a fragmented, paper-heavy tradition into a 
                <span className="text-blue-400 font-bold"> seamless, digital-first system</span> where every case is managed, 
                every client is supported, and every voice is heard.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything you need for <span className="text-primary">modern legal workflows</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              From consultation to case resolution - quick, smart, effortless
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {practiceAreas.map((p, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-all">
                  <p.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-slate-400 text-sm">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by Legal <span className="text-primary">Professionals</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Discover how Yugality transforms legal practices across India
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Adv. Priya Sharma",
                role: "Solo Practitioner, Delhi",
                text: "Yugality has transformed my practice. I can now manage 3x more cases with better client satisfaction. The AI automation saves me hours every day.",
                rating: 5
              },
              {
                name: "Rajesh Kumar & Associates",
                role: "Law Firm, Mumbai",
                text: "Finally, a platform built for Indian law firms. The document automation and case tracking features are game-changers. Our efficiency has doubled.",
                rating: 5
              },
              {
                name: "Adv. Meera Patel",
                role: "Legal Consultant, Bangalore",
                text: "As a solo practitioner, I needed affordable technology. Yugality gives me enterprise features at a fraction of the cost. Highly recommended!",
                rating: 5
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-xl text-slate-300">
              Everything you need to know about Yugality
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "What makes Yugality different from other legal software?",
                a: "Yugality is built specifically for Indian legal professionals with AI-powered automation, affordable pricing, and features designed for solo practitioners and small law firms. We focus on the unique needs of the Indian legal system."
              },
              {
                q: "Is Yugality suitable for solo practitioners?",
                a: "Absolutely! Yugality is designed with solo practitioners in mind. Our affordable pricing and intuitive interface make enterprise-grade legal technology accessible to individual lawyers without the enterprise cost."
              },
              {
                q: "How does the AI automation work?",
                a: "Our AI engine automates repetitive tasks like document generation, deadline tracking, client communications, and case organization. It learns from your practice patterns to provide intelligent suggestions and save you hours every week."
              },
              {
                q: "Is my client data secure?",
                a: "Yes. We use bank-grade encryption, secure cloud storage, and comply with all Indian data protection regulations. Your client data is protected with multiple layers of security and regular backups."
              },
              {
                q: "Can I try Yugality before committing?",
                a: "Yes! We offer a free plan for solo practitioners and a 14-day trial for our premium features. No credit card required to get started."
              },
              {
                q: "Do you provide training and support?",
                a: "Yes. We provide comprehensive onboarding, video tutorials, and dedicated support. Our team understands legal workflows and is here to help you succeed."
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-3 flex items-start gap-3">
                  <span className="text-primary">Q:</span>
                  {faq.q}
                </h3>
                <p className="text-slate-300 leading-relaxed pl-8">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/20 to-yellow-900/10 backdrop-blur-md border border-primary/30 rounded-3xl p-16 text-center"
          >
            <Scale className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to revolutionize your legal practice?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join thousands of legal professionals already using Yugality to transform their workflows
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-primary to-yellow-600 hover:shadow-[0_0_40px_rgba(200,152,56,0.5)] text-white font-bold text-xl px-12 py-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="text-black bg-white/90 hover:bg-white border-2 border-white hover:border-primary text-xl px-12 py-8 rounded-xl backdrop-blur-sm transition-all duration-300 font-semibold">
                  Schedule a Demo
                </Button>
              </Link>
            </div>
            <p className="mt-8 text-slate-400 text-sm">
              No credit card required • Free for solo practitioners • Enterprise plans available
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="md:col-span-1">
                <Link to="/" className="flex items-center gap-3 mb-4">
                  <img src={logo} alt="Yugality" className="h-10 w-10" />
                  <span className="text-2xl font-bold text-primary">Yugality</span>
                </Link>
                <p className="text-slate-400 text-sm mb-4">
                  Your trusted legal partner for all your legal needs.
                </p>
                <div className="flex items-center gap-3">
                  <a href="#" className="w-9 h-9 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-lg flex items-center justify-center transition-all">
                    <Facebook className="w-4 h-4 text-slate-400" />
                  </a>
                  <a href="#" className="w-9 h-9 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-lg flex items-center justify-center transition-all">
                    <Twitter className="w-4 h-4 text-slate-400" />
                  </a>
                  <a href="#" className="w-9 h-9 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-lg flex items-center justify-center transition-all">
                    <Linkedin className="w-4 h-4 text-slate-400" />
                  </a>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-white font-bold mb-4">Services</h3>
                <ul className="space-y-2">
                  <li><Link to="/auth" className="text-slate-400 hover:text-primary transition-colors text-sm">Talk to Lawyer</Link></li>
                  <li><Link to="/auth" className="text-slate-400 hover:text-primary transition-colors text-sm">Document Services</Link></li>
                  <li><Link to="/auth" className="text-slate-400 hover:text-primary transition-colors text-sm">Case Management</Link></li>
                  <li><Link to="/auth" className="text-slate-400 hover:text-primary transition-colors text-sm">Legal Consultation</Link></li>
                </ul>
              </div>

              {/* Practice Areas */}
              <div>
                <h3 className="text-white font-bold mb-4">Practice Areas</h3>
                <ul className="space-y-2">
                  <li><Link to="/auth" className="text-slate-400 hover:text-primary transition-colors text-sm">Business Law</Link></li>
                  <li><Link to="/auth" className="text-slate-400 hover:text-primary transition-colors text-sm">Family Law</Link></li>
                  <li><Link to="/auth" className="text-slate-400 hover:text-primary transition-colors text-sm">Real Estate</Link></li>
                  <li><Link to="/auth" className="text-slate-400 hover:text-primary transition-colors text-sm">Criminal Defense</Link></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-white font-bold mb-4">Contact</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-slate-400 text-sm">
                    <Mail className="w-4 h-4 text-primary mt-0.5" />
                    <a href="mailto:legal@yugality.com" className="hover:text-primary transition-colors">legal@yugality.com</a>
                  </li>
                  <li className="flex items-start gap-2 text-slate-400 text-sm">
                    <Phone className="w-4 h-4 text-primary mt-0.5" />
                    <a href="tel:+911234567890" className="hover:text-primary transition-colors">+91 123 456 7890</a>
                  </li>
                  <li className="flex items-start gap-2 text-slate-400 text-sm">
                    <MapPin className="w-4 h-4 text-primary mt-0.5" />
                    <span>New Delhi, India</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-slate-400 text-sm">© 2026 Yugality. All rights reserved.</p>
              <div className="flex items-center gap-6 text-sm">
                <Link to="/auth" className="text-slate-400 hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/auth" className="text-slate-400 hover:text-primary transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
