import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { User, Star, MapPin, Send, Plus, FileText, Linkedin, MessageCircle, Search, Clock, CheckCircle, XCircle, DollarSign, Calendar, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Lawyer {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  cases: number;
  rating: number;
  location: string;
  availability: "Available" | "Busy";
  initials: string;
  linkedIn?: string;
  whatsapp?: string;
  resume?: string;
  image?: string;
}

interface ReferralRequest {
  id: string;
  clientName: string;
  caseType: string;
  description: string;
  urgency: "High" | "Medium" | "Low";
  budget: string;
  location: string;
  postedBy: string;
  postedDate: string;
  deadline: string;
  status: "Open" | "Assigned" | "Closed";
  responses: number;
}

interface MyReferral {
  id: string;
  referredTo: string;
  clientName: string;
  caseType: string;
  date: string;
  status: "Pending" | "Accepted" | "Completed" | "Rejected";
  commission: string;
  caseNumber?: string;
  notes?: string;
}

const lawyers: Lawyer[] = [
  { 
    id: "1", 
    name: "Adv. Rajesh Kumar",
    specialty: "Criminal Law",
    experience: "15 years experience",
    cases: 250,
    rating: 4.8,
    location: "Delhi",
    availability: "Available",
    initials: "ARK",
    linkedIn: "https://linkedin.com/in/rajeshkumar",
    whatsapp: "+919876543210",
    resume: "/resumes/rajesh-kumar.pdf",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
  },
  { 
    id: "2",
    name: "Adv. Priya Sharma",
    specialty: "Family Law",
    experience: "12 years experience",
    cases: 180,
    rating: 4.9,
    location: "Mumbai",
    availability: "Busy",
    initials: "APS",
    linkedIn: "https://linkedin.com/in/priyasharma",
    whatsapp: "+919876543211",
    resume: "/resumes/priya-sharma.pdf",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face"
  },
  { 
    id: "3",
    name: "Adv. Vikram Singh",
    specialty: "Corporate Law",
    experience: "18 years experience",
    cases: 320,
    rating: 4.7,
    location: "Bangalore",
    availability: "Available",
    initials: "AVS",
    linkedIn: "https://linkedin.com/in/vikramsingh",
    whatsapp: "+919876543212",
    resume: "/resumes/vikram-singh.pdf",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  { 
    id: "4",
    name: "Adv. Meera Patel",
    specialty: "Property Law",
    experience: "10 years experience",
    cases: 145,
    rating: 4.6,
    location: "Ahmedabad",
    availability: "Available",
    initials: "AMP",
    linkedIn: "https://linkedin.com/in/meerapatel",
    whatsapp: "+919876543213",
    resume: "/resumes/meera-patel.pdf",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face"
  },
  { 
    id: "5",
    name: "Adv. Amit Verma",
    specialty: "Tax Law",
    experience: "14 years experience",
    cases: 210,
    rating: 4.7,
    location: "Delhi",
    availability: "Available",
    initials: "AAV",
    linkedIn: "https://linkedin.com/in/amitverma",
    whatsapp: "+919876543214",
    resume: "/resumes/amit-verma.pdf",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  { 
    id: "6",
    name: "Adv. Sunita Reddy",
    specialty: "Employment Law",
    experience: "9 years experience",
    cases: 120,
    rating: 4.5,
    location: "Hyderabad",
    availability: "Available",
    initials: "ASR",
    linkedIn: "https://linkedin.com/in/sunitareddy",
    whatsapp: "+919876543215",
    resume: "/resumes/sunita-reddy.pdf",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
  },
];

const referralRequests: ReferralRequest[] = [
  {
    id: "RR-001",
    clientName: "Anil Gupta",
    caseType: "Property Dispute",
    description: "Property boundary dispute with neighbor. Need experienced lawyer for negotiation and litigation if required.",
    urgency: "High",
    budget: "₹50,000 - ₹80,000",
    location: "Mumbai",
    postedBy: "Adv. Rajesh Kumar",
    postedDate: "2 hours ago",
    deadline: "Jan 10, 2026",
    status: "Open",
    responses: 3
  },
  {
    id: "RR-002",
    clientName: "Kavita Sharma",
    caseType: "Divorce Settlement",
    description: "Mutual consent divorce case. Looking for family law specialist to handle documentation and court proceedings.",
    urgency: "Medium",
    budget: "₹30,000 - ₹50,000",
    location: "Delhi",
    postedBy: "Adv. Priya Sharma",
    postedDate: "5 hours ago",
    deadline: "Jan 15, 2026",
    status: "Open",
    responses: 5
  },
  {
    id: "RR-003",
    clientName: "Tech Solutions Pvt Ltd",
    caseType: "Corporate Merger",
    description: "Legal advisory for company merger. Need corporate law expert for due diligence and documentation.",
    urgency: "Low",
    budget: "₹1,00,000+",
    location: "Bangalore",
    postedBy: "Adv. Vikram Singh",
    postedDate: "1 day ago",
    deadline: "Jan 20, 2026",
    status: "Assigned",
    responses: 8
  },
  {
    id: "RR-004",
    clientName: "Ramesh Patel",
    caseType: "Tax Appeal",
    description: "Income tax assessment appeal. Need experienced tax lawyer for ITAT proceedings.",
    urgency: "High",
    budget: "₹60,000 - ₹90,000",
    location: "Ahmedabad",
    postedBy: "Adv. Meera Patel",
    postedDate: "3 hours ago",
    deadline: "Jan 12, 2026",
    status: "Open",
    responses: 2
  },
  {
    id: "RR-005",
    clientName: "Sunita Desai",
    caseType: "Employment Dispute",
    description: "Wrongful termination case. Looking for employment law specialist for labor court proceedings.",
    urgency: "Medium",
    budget: "₹40,000 - ₹60,000",
    location: "Pune",
    postedBy: "Adv. Amit Verma",
    postedDate: "6 hours ago",
    deadline: "Jan 18, 2026",
    status: "Open",
    responses: 4
  },
];

const myReferrals: MyReferral[] = [
  {
    id: "MR-001",
    referredTo: "Adv. Priya Sharma",
    clientName: "Rajesh Kumar",
    caseType: "Family Dispute",
    date: "Jan 5, 2026",
    status: "Accepted",
    commission: "₹12,000",
    caseNumber: "FC-2026-045",
    notes: "Client satisfied with initial consultation. Case proceeding smoothly."
  },
  {
    id: "MR-002",
    referredTo: "Adv. Vikram Singh",
    clientName: "Patel Industries",
    caseType: "Corporate Advisory",
    date: "Jan 3, 2026",
    status: "Completed",
    commission: "₹25,000",
    caseNumber: "CA-2026-012",
    notes: "Successfully completed contract review. Commission received."
  },
  {
    id: "MR-003",
    referredTo: "Adv. Meera Patel",
    clientName: "Amit Verma",
    caseType: "Property Registration",
    date: "Jan 6, 2026",
    status: "Pending",
    commission: "₹8,000",
    notes: "Awaiting client confirmation for first meeting."
  },
  {
    id: "MR-004",
    referredTo: "Adv. Rajesh Kumar",
    clientName: "Sunita Reddy",
    caseType: "Criminal Defense",
    date: "Dec 28, 2025",
    status: "Rejected",
    commission: "₹0",
    notes: "Client decided to engage different counsel due to jurisdiction concerns."
  },
  {
    id: "MR-005",
    referredTo: "Adv. Amit Verma",
    clientName: "Global Tech Ltd",
    caseType: "Tax Compliance",
    date: "Jan 4, 2026",
    status: "Accepted",
    commission: "₹18,000",
    caseNumber: "TC-2026-089",
    notes: "Ongoing tax audit representation. Expected completion by month-end."
  },
  {
    id: "MR-006",
    referredTo: "Adv. Sunita Reddy",
    clientName: "Kavita Sharma",
    caseType: "Employment Contract",
    date: "Jan 2, 2026",
    status: "Completed",
    commission: "₹10,000",
    caseNumber: "EC-2026-023",
    notes: "Contract review completed successfully. Payment received."
  },
];

const stats = [
  { label: "Network Lawyers", value: "6", subtext: "Available for referrals" },
  { label: "Active Requests", value: "4", subtext: "Open for bidding" },
  { label: "My Referrals", value: "6", subtext: "Total sent" },
  { label: "Earnings", value: "₹73,000", subtext: "From referral commissions" },
];

const Referrals = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [activeTab, setActiveTab] = useState("directory");

  const handleWhatsAppClick = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-start justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Referral Board</h1>
            <p className="text-muted-foreground mt-2">Connect with lawyers and manage referrals</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            Post Referral
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.subtext}</p>
            </Card>
          ))}
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none h-auto p-0">
            <TabsTrigger 
              value="directory" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
            >
              Lawyer Directory
            </TabsTrigger>
            <TabsTrigger 
              value="requests"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
            >
              Referral Requests
            </TabsTrigger>
            <TabsTrigger 
              value="my-referrals"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
            >
              My Referrals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="directory" className="space-y-6 mt-6">
            {/* Search and Filters */}
            <Card className="p-4">
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search lawyers by name or specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="All Specialties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    <SelectItem value="criminal">Criminal Law</SelectItem>
                    <SelectItem value="family">Family Law</SelectItem>
                    <SelectItem value="corporate">Corporate Law</SelectItem>
                    <SelectItem value="property">Property Law</SelectItem>
                    <SelectItem value="tax">Tax Law</SelectItem>
                    <SelectItem value="employment">Employment Law</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Lawyers Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {lawyers.map((lawyer, index) => (
                <motion.div
                  key={lawyer.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      {lawyer.image ? (
                        <img 
                          src={lawyer.image} 
                          alt={lawyer.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                        />
                      ) : (
                        <Avatar className="w-12 h-12 bg-blue-100 dark:bg-blue-950">
                          <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face" className="object-cover" />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                            {lawyer.initials}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{lawyer.name}</h3>
                            <p className="text-sm text-muted-foreground">{lawyer.specialty}</p>
                          </div>
                          <Badge className={lawyer.availability === "Available" ? "bg-blue-600" : "bg-gray-600"}>
                            {lawyer.availability}
                          </Badge>
                        </div>

                        <p className="text-xs text-muted-foreground mb-3">{lawyer.experience}</p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            {lawyer.rating} ({lawyer.cases} cases)
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {lawyer.location}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                          >
                            <Send className="w-3 h-3 mr-1" />
                            Refer Case
                          </Button>
                          
                          {/* Social Icons */}
                          {lawyer.linkedIn && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(lawyer.linkedIn, '_blank')}
                              className="px-2"
                            >
                              <Linkedin className="w-4 h-4" />
                            </Button>
                          )}
                          {lawyer.resume && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(lawyer.resume, '_blank')}
                              className="px-2"
                            >
                              <FileText className="w-4 h-4" />
                            </Button>
                          )}
                          {lawyer.whatsapp && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleWhatsAppClick(lawyer.whatsapp!)}
                              className="px-2"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Active Referral Requests</h2>
                <p className="text-sm text-muted-foreground mt-1">Browse and respond to referral opportunities</p>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Requests</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {referralRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{request.clientName}</h3>
                          <Badge className={
                            request.urgency === "High" ? "bg-red-600" :
                            request.urgency === "Medium" ? "bg-orange-600" :
                            "bg-blue-600"
                          }>
                            {request.urgency} Priority
                          </Badge>
                          <Badge variant="outline" className={
                            request.status === "Open" ? "border-green-600 text-green-600" :
                            request.status === "Assigned" ? "border-blue-600 text-blue-600" :
                            "border-gray-600 text-gray-600"
                          }>
                            {request.status}
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2">
                            <Gavel className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">{request.caseType}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{request.description}</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            <span>Budget: {request.budget}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{request.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Deadline: {request.deadline}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{request.responses} responses</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Posted by {request.postedBy}</span>
                          <span>•</span>
                          <span>{request.postedDate}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {request.status === "Open" && (
                          <>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                              <Send className="w-3 h-3 mr-1" />
                              Apply
                            </Button>
                            <Button size="sm" variant="outline">
                              Details
                            </Button>
                          </>
                        )}
                        {request.status === "Assigned" && (
                          <Button size="sm" variant="outline" disabled>
                            Assigned
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-referrals" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">My Referral History</h2>
                <p className="text-sm text-muted-foreground mt-1">Track all your referrals and commissions</p>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-xs text-muted-foreground">Accepted</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-950/30 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-xs text-muted-foreground">Rejected</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Referrals List */}
            <div className="space-y-4">
              {myReferrals.map((referral, index) => (
                <motion.div
                  key={referral.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          referral.status === "Completed" ? "bg-emerald-100 dark:bg-emerald-950/30" :
                          referral.status === "Accepted" ? "bg-green-100 dark:bg-green-950/30" :
                          referral.status === "Pending" ? "bg-blue-100 dark:bg-blue-950/30" :
                          "bg-red-100 dark:bg-red-950/30"
                        }`}>
                          {referral.status === "Completed" && <CheckCircle className="w-6 h-6 text-emerald-600" />}
                          {referral.status === "Accepted" && <CheckCircle className="w-6 h-6 text-green-600" />}
                          {referral.status === "Pending" && <Clock className="w-6 h-6 text-blue-600" />}
                          {referral.status === "Rejected" && <XCircle className="w-6 h-6 text-red-600" />}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-foreground">{referral.clientName}</h3>
                            <Badge className={
                              referral.status === "Completed" ? "bg-emerald-600" :
                              referral.status === "Accepted" ? "bg-green-600" :
                              referral.status === "Pending" ? "bg-blue-600" :
                              "bg-red-600"
                            }>
                              {referral.status}
                            </Badge>
                          </div>

                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <User className="w-4 h-4" />
                              <span>Referred to: <span className="font-medium text-foreground">{referral.referredTo}</span></span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Gavel className="w-4 h-4" />
                              <span>Case Type: <span className="font-medium text-foreground">{referral.caseType}</span></span>
                            </div>
                            {referral.caseNumber && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <FileText className="w-4 h-4" />
                                <span>Case Number: <span className="font-medium text-foreground">{referral.caseNumber}</span></span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>Date: {referral.date}</span>
                            </div>
                            {referral.notes && (
                              <div className="mt-2 p-3 bg-muted/30 rounded text-xs">
                                <span className="font-medium text-foreground">Notes:</span> {referral.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="mb-4">
                          <p className="text-2xl font-bold text-foreground">{referral.commission}</p>
                          <p className="text-xs text-muted-foreground">Commission</p>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Referrals;
