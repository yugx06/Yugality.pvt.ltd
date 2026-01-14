import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Users, Plus, Video, Calendar as CalendarIcon, Clock, MapPin, Edit, Phone, Trash2, Check, X, Link as LinkIcon, FileText, Briefcase, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Consultation {
  id: string;
  clientName: string;
  consultationType: "Video Call" | "In-person";
  subject: string;
  date: string;
  time: string;
  fee: string;
  caseNumber?: string;
  status: "Confirmed" | "Pending Payment" | "Completed";
}

interface AvailabilitySlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  slotDuration: string;
  fee: string;
  type: "Video Call" | "In-person" | "Both";
  active: boolean;
}

interface CaseLink {
  id: string;
  caseNumber: string;
  caseTitle: string;
  clientName: string;
  consultationDate: string;
  consultationType: string;
  notes: string;
  status: "Linked" | "Pending";
}

const consultations: Consultation[] = [
  {
    id: "1",
    clientName: "Rajesh Kumar",
    consultationType: "Video Call",
    subject: "Property Dispute Consultation",
    date: "Tomorrow",
    time: "10:30 AM",
    fee: "₹2,000",
    caseNumber: "CS-2024-001",
    status: "Confirmed",
  },
  {
    id: "2",
    clientName: "Priya Sharma",
    consultationType: "In-person",
    subject: "Corporate Law Consultation",
    date: "Jan 16",
    time: "2:00 PM",
    fee: "₹3,500",
    status: "Pending Payment",
  },
  {
    id: "3",
    clientName: "Amit Patel",
    consultationType: "Video Call",
    subject: "Contract Review & Legal Advisory",
    date: "Today",
    time: "3:30 PM",
    fee: "₹2,500",
    caseNumber: "CS-2024-012",
    status: "Confirmed",
  },
  {
    id: "4",
    clientName: "Sunita Reddy",
    consultationType: "In-person",
    subject: "Family Law - Divorce Proceedings",
    date: "Jan 8",
    time: "11:00 AM",
    fee: "₹4,000",
    caseNumber: "CS-2024-008",
    status: "Confirmed",
  },
  {
    id: "5",
    clientName: "Vikram Singh",
    consultationType: "Video Call",
    subject: "Employment Law Consultation",
    date: "Jan 9",
    time: "9:00 AM",
    fee: "₹2,000",
    status: "Pending Payment",
  },
  {
    id: "6",
    clientName: "Anita Gupta",
    consultationType: "In-person",
    subject: "Real Estate Transaction Advisory",
    date: "Jan 10",
    time: "4:00 PM",
    fee: "₹3,000",
    caseNumber: "CS-2024-015",
    status: "Confirmed",
  },
];

const availabilitySlots: AvailabilitySlot[] = [
  { id: "1", day: "Monday", startTime: "9:00 AM", endTime: "12:00 PM", slotDuration: "30 mins", fee: "₹2,000", type: "Both", active: true },
  { id: "2", day: "Monday", startTime: "2:00 PM", endTime: "5:00 PM", slotDuration: "30 mins", fee: "₹2,000", type: "Video Call", active: true },
  { id: "3", day: "Tuesday", startTime: "10:00 AM", endTime: "1:00 PM", slotDuration: "45 mins", fee: "₹2,500", type: "In-person", active: true },
  { id: "4", day: "Wednesday", startTime: "9:00 AM", endTime: "12:00 PM", slotDuration: "30 mins", fee: "₹2,000", type: "Both", active: true },
  { id: "5", day: "Wednesday", startTime: "3:00 PM", endTime: "6:00 PM", slotDuration: "1 hour", fee: "₹3,500", type: "In-person", active: false },
  { id: "6", day: "Thursday", startTime: "11:00 AM", endTime: "2:00 PM", slotDuration: "30 mins", fee: "₹2,000", type: "Video Call", active: true },
  { id: "7", day: "Friday", startTime: "9:00 AM", endTime: "12:00 PM", slotDuration: "45 mins", fee: "₹2,500", type: "Both", active: true },
  { id: "8", day: "Friday", startTime: "2:00 PM", endTime: "5:00 PM", slotDuration: "30 mins", fee: "₹2,000", type: "Video Call", active: true },
  { id: "9", day: "Saturday", startTime: "10:00 AM", endTime: "1:00 PM", slotDuration: "1 hour", fee: "₹4,000", type: "In-person", active: true },
];

const caseLinks: CaseLink[] = [
  {
    id: "1",
    caseNumber: "CS-2024-001",
    caseTitle: "Singh vs. State - Property Dispute",
    clientName: "Rajesh Kumar",
    consultationDate: "Jan 7, 2026 - 10:30 AM",
    consultationType: "Video Call",
    notes: "Initial consultation regarding property boundary dispute. Client provided survey documents.",
    status: "Linked",
  },
  {
    id: "2",
    caseNumber: "CS-2024-008",
    caseTitle: "Reddy Divorce Proceedings",
    clientName: "Sunita Reddy",
    consultationDate: "Jan 8, 2026 - 11:00 AM",
    consultationType: "In-person",
    notes: "Discussion on custody arrangements and asset division. Follow-up needed for financial documents.",
    status: "Linked",
  },
  {
    id: "3",
    caseNumber: "CS-2024-012",
    caseTitle: "Patel Corporate Merger Advisory",
    clientName: "Amit Patel",
    consultationDate: "Jan 7, 2026 - 3:30 PM",
    consultationType: "Video Call",
    notes: "Review of merger agreement terms. Client requires contract amendments.",
    status: "Linked",
  },
  {
    id: "4",
    caseNumber: "CS-2024-015",
    caseTitle: "Gupta Property Transaction",
    clientName: "Anita Gupta",
    consultationDate: "Jan 10, 2026 - 4:00 PM",
    consultationType: "In-person",
    notes: "Due diligence for commercial property purchase. Title verification in progress.",
    status: "Pending",
  },
  {
    id: "5",
    caseNumber: "CS-2024-019",
    caseTitle: "Sharma Employment Dispute",
    clientName: "Priya Sharma",
    consultationDate: "Jan 16, 2026 - 2:00 PM",
    consultationType: "In-person",
    notes: "Wrongful termination case. Awaiting HR documentation from employer.",
    status: "Pending",
  },
];

const stats = [
  { label: "Today's Consultations", value: "3", icon: CalendarIcon, bgColor: "bg-blue-50 dark:bg-blue-950/30", iconColor: "text-blue-600" },
  { label: "This Week", value: "12", icon: Clock, bgColor: "bg-orange-50 dark:bg-orange-950/30", iconColor: "text-orange-600" },
  { label: "Revenue (Week)", value: "₹24,500", icon: Users, bgColor: "bg-amber-50 dark:bg-amber-950/30", iconColor: "text-amber-600" },
  { label: "New Clients", value: "5", icon: Users, bgColor: "bg-green-50 dark:bg-green-950/30", iconColor: "text-green-600" },
];

const Consultations = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("current");
  const [showNewBookingForm, setShowNewBookingForm] = useState(false);
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Client View
  if (user?.role === "client") {
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
              <h1 className="text-3xl font-bold text-foreground">Book Legal Consultation</h1>
              <p className="text-muted-foreground mt-2">Schedule a consultation with our expert lawyers</p>
            </div>
          </motion.div>

          {/* Stats for Client */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Upcoming
                  </p>
                  <p className="text-2xl font-bold text-foreground">2</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Completed
                  </p>
                  <p className="text-2xl font-bold text-foreground">8</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-50 dark:bg-green-950/30 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Active Cases
                  </p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Available Lawyers */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Expert Lawyers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Adv. Rajesh Sharma", specialization: "Property & Civil Law", experience: "15 Years", rating: "4.9", consultations: "500+", fee: "₹2,000", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face" },
                { name: "Adv. Priya Mehta", specialization: "Corporate & Commercial", experience: "12 Years", rating: "4.8", consultations: "450+", fee: "₹2,500", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face" },
                { name: "Adv. Vikram Singh", specialization: "Criminal & Family Law", experience: "18 Years", rating: "4.9", consultations: "600+", fee: "₹3,000", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
              ].map((lawyer, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-start gap-4">
                    <img 
                      src={lawyer.image} 
                      alt={lawyer.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground">{lawyer.name}</h3>
                      <p className="text-sm text-muted-foreground">{lawyer.specialization}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400">⭐ {lawyer.rating}</span>
                        <span className="text-xs text-muted-foreground">{lawyer.consultations}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Consultation Fee</p>
                      <p className="text-lg font-bold text-foreground">{lawyer.fee}</p>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Book Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Book Consultation Form */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Request Consultation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="consultation-type">Consultation Type *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="inperson">In-Person Meeting</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="legal-area">Legal Area *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="property">Property Law</SelectItem>
                    <SelectItem value="family">Family Law</SelectItem>
                    <SelectItem value="criminal">Criminal Law</SelectItem>
                    <SelectItem value="corporate">Corporate Law</SelectItem>
                    <SelectItem value="civil">Civil Law</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferred-date">Preferred Date *</Label>
                <Input type="date" id="preferred-date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferred-time">Preferred Time *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9-10">9:00 AM - 10:00 AM</SelectItem>
                    <SelectItem value="10-11">10:00 AM - 11:00 AM</SelectItem>
                    <SelectItem value="11-12">11:00 AM - 12:00 PM</SelectItem>
                    <SelectItem value="2-3">2:00 PM - 3:00 PM</SelectItem>
                    <SelectItem value="3-4">3:00 PM - 4:00 PM</SelectItem>
                    <SelectItem value="4-5">4:00 PM - 5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="case-description">Case Description *</Label>
                <Textarea 
                  id="case-description" 
                  placeholder="Please describe your legal matter in detail..." 
                  rows={4}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="contact-phone">Contact Phone *</Label>
                <Input type="tel" id="contact-phone" placeholder="Enter your phone number" />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                I agree to the terms and conditions and consent to share my information for consultation purposes
              </Label>
            </div>
            <div className="flex gap-3 mt-6">
              <Button className="bg-blue-600 hover:bg-blue-700 flex-1">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
              <Button variant="outline" className="flex-1">
                Save as Draft
              </Button>
            </div>
          </Card>

          {/* My Consultations */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">My Consultations</h2>
            <div className="space-y-4">
              {[
                { lawyer: "Adv. Rajesh Sharma", type: "Video Call", subject: "Property Dispute", date: "Tomorrow", time: "10:30 AM", status: "Confirmed" },
                { lawyer: "Adv. Vikram Singh", type: "In-person", subject: "Family Law Consultation", date: "Jan 15", time: "3:00 PM", status: "Pending" },
              ].map((consultation, index) => (
                <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        consultation.type === "Video Call" 
                          ? "bg-blue-100 dark:bg-blue-950/30" 
                          : "bg-purple-100 dark:bg-purple-950/30"
                      }`}>
                        {consultation.type === "Video Call" ? (
                          <Video className="w-6 h-6 text-blue-600" />
                        ) : (
                          <MapPin className="w-6 h-6 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-semibold text-lg">{consultation.lawyer}</h3>
                          <Badge variant={consultation.status === "Confirmed" ? "default" : "secondary"}>
                            {consultation.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{consultation.subject}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            {consultation.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {consultation.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {consultation.status === "Confirmed" && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Video className="w-4 h-4 mr-2" />
                          Join Call
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Lawyer/Admin View (existing code)
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
            <h1 className="text-3xl font-bold text-foreground">{t("Consultation Booking")}</h1>
            <p className="text-muted-foreground mt-2">{t("Manage client consultations and availability")}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <CalendarIcon className="w-4 h-4" />
              {t("Calendar View")}
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <Plus className="w-4 h-4" />
              {t("Add Availability")}
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none h-auto p-0">
            <TabsTrigger 
              value="current" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
            >
              {t("Current Bookings")}
            </TabsTrigger>
            <TabsTrigger 
              value="manage"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
            >
              {t("Manage Availability")}
            </TabsTrigger>
            <TabsTrigger 
              value="new"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
            >
              {t("New Booking")}
            </TabsTrigger>
            <TabsTrigger 
              value="sync"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
            >
              {t("Case Sync")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6 mt-6">
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {stats.map((stat, index) => (
                <Card key={stat.label} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        {t(stat.label)}
                      </p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>

            {/* Upcoming Consultations */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Upcoming Consultations</h2>
                <Button variant="link" className="text-blue-600">View All</Button>
              </div>

              <div className="space-y-4">
                {consultations.map((consultation) => (
                  <Card key={consultation.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Icon */}
                        <div className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0
                          ${consultation.consultationType === "Video Call" 
                            ? "bg-blue-100 dark:bg-blue-950/30" 
                            : "bg-purple-100 dark:bg-purple-950/30"}`}
                        >
                          {consultation.consultationType === "Video Call" ? (
                            <Video className="w-6 h-6 text-blue-600" />
                          ) : (
                            <MapPin className="w-6 h-6 text-purple-600" />
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="font-semibold text-lg">{consultation.clientName}</h3>
                            <Badge className={consultation.status === "Confirmed" ? "bg-blue-600" : "bg-orange-600"}>
                              {consultation.status}
                            </Badge>
                          </div>
                          <p className="text-foreground">{consultation.subject}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span>{consultation.date} • {consultation.time}</span>
                            <span>{consultation.consultationType}</span>
                            <span className="font-semibold text-foreground">{consultation.fee}</span>
                            {consultation.caseNumber && (
                              <span>Case: {consultation.caseNumber}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 lg:flex-col lg:items-end">
                        <Button size="icon" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          {consultation.status === "Confirmed" ? "Join Call" : "View Details"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manage" className="space-y-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Your Availability Schedule</h2>
                <p className="text-sm text-muted-foreground mt-1">Manage your consultation time slots and fees</p>
              </div>
              <Button 
                onClick={() => setShowAvailabilityForm(!showAvailabilityForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Time Slot
              </Button>
            </div>

            {showAvailabilityForm && (
              <Card className="p-6 border-2 border-blue-500">
                <h3 className="text-lg font-semibold mb-4">Add New Availability Slot</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Day of Week</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Consultation Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="both">Both</SelectItem>
                        <SelectItem value="video">Video Call Only</SelectItem>
                        <SelectItem value="inperson">In-person Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Start Time</Label>
                    <Input type="time" />
                  </div>
                  <div>
                    <Label>End Time</Label>
                    <Input type="time" />
                  </div>
                  <div>
                    <Label>Slot Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Consultation Fee</Label>
                    <Input type="text" placeholder="₹2,000" />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => setShowAvailabilityForm(false)}>Save Slot</Button>
                  <Button variant="outline" onClick={() => setShowAvailabilityForm(false)}>Cancel</Button>
                </div>
              </Card>
            )}

            <div className="space-y-4">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => {
                const daySlots = availabilitySlots.filter(slot => slot.day === day);
                if (daySlots.length === 0) return null;
                
                return (
                  <Card key={day} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">{day}</h3>
                      <Badge variant="outline">{daySlots.length} slots</Badge>
                    </div>
                    <div className="space-y-3">
                      {daySlots.map((slot) => (
                        <div key={slot.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`w-2 h-12 rounded ${slot.active ? 'bg-green-500' : 'bg-gray-400'}`} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{slot.startTime} - {slot.endTime}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {slot.slotDuration} slots
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  {slot.type === "Video Call" && <Video className="w-3 h-3" />}
                                  {slot.type === "In-person" && <MapPin className="w-3 h-3" />}
                                  {slot.type === "Both" && <><Video className="w-3 h-3" /> & <MapPin className="w-3 h-3" /></>}
                                  {slot.type}
                                </span>
                                <span className="font-semibold text-foreground">{slot.fee}/session</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-6 mt-6">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Schedule New Consultation</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="client">Client Name *</Label>
                    <Input id="client" placeholder="Enter client name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Client Email *</Label>
                    <Input id="email" type="email" placeholder="client@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Consultation Type *</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video Call</SelectItem>
                        <SelectItem value="inperson">In-person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time *</Label>
                    <Input id="time" type="time" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select>
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fee">Consultation Fee</Label>
                    <Input id="fee" placeholder="₹2,000" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="subject">Subject/Topic *</Label>
                    <Input id="subject" placeholder="e.g., Property Dispute Consultation" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="caseNumber">Link to Existing Case (Optional)</Label>
                    <Select>
                      <SelectTrigger id="caseNumber">
                        <SelectValue placeholder="Select case or leave blank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CS-2024-001">CS-2024-001 - Singh Property Dispute</SelectItem>
                        <SelectItem value="CS-2024-008">CS-2024-008 - Reddy Divorce</SelectItem>
                        <SelectItem value="CS-2024-012">CS-2024-012 - Patel Corporate</SelectItem>
                        <SelectItem value="CS-2024-015">CS-2024-015 - Gupta Transaction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Add any special requirements or notes..."
                      rows={3}
                    />
                  </div>
                  <div className="col-span-2 flex items-center space-x-2">
                    <Checkbox id="reminder" />
                    <label htmlFor="reminder" className="text-sm">
                      Send reminder notifications to client
                    </label>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Check className="w-4 h-4 mr-2" />
                    Create Consultation
                  </Button>
                  <Button variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Booking from Available Slots */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Book from Available Slots</h3>
              <div className="grid grid-cols-3 gap-4">
                {availabilitySlots.filter(slot => slot.active).slice(0, 6).map((slot) => (
                  <div key={slot.id} className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{slot.day}</Badge>
                      <Badge className="bg-blue-600">{slot.fee}</Badge>
                    </div>
                    <p className="text-sm font-medium">{slot.startTime} - {slot.endTime}</p>
                    <p className="text-xs text-muted-foreground mt-1">{slot.type}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="sync" className="space-y-6 mt-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground">Case Synchronization</h2>
              <p className="text-sm text-muted-foreground mt-1">Link consultations with case files for better tracking</p>
            </div>

            {/* Sync Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-xs text-muted-foreground">Linked Cases</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-xs text-muted-foreground">Pending Sync</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-xs text-muted-foreground">Total Cases</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Linked Cases List */}
            <div className="space-y-4">
              {caseLinks.map((link) => (
                <Card key={link.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        link.status === "Linked" 
                          ? "bg-green-100 dark:bg-green-950/30" 
                          : "bg-amber-100 dark:bg-amber-950/30"
                      }`}>
                        {link.status === "Linked" ? (
                          <LinkIcon className="w-6 h-6 text-green-600" />
                        ) : (
                          <Clock className="w-6 h-6 text-amber-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{link.caseTitle}</h3>
                          <Badge className={link.status === "Linked" ? "bg-green-600" : "bg-amber-600"}>
                            {link.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <FileText className="w-4 h-4" />
                            <span>Case Number: <span className="font-medium text-foreground">{link.caseNumber}</span></span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>Client: <span className="font-medium text-foreground">{link.clientName}</span></span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <CalendarIcon className="w-4 h-4" />
                            <span>Consultation: {link.consultationDate}</span>
                            <Badge variant="outline" className="ml-2">{link.consultationType}</Badge>
                          </div>
                          <div className="mt-2 p-3 bg-muted/30 rounded">
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium text-foreground">Notes:</span> {link.notes}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {link.status === "Pending" ? (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Check className="w-4 h-4 mr-1" />
                          Link Case
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        <ChevronRight className="w-4 h-4" />
                        View Case
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Sync New Consultation */}
            <Card className="p-6 border-2 border-dashed">
              <div className="text-center py-8">
                <LinkIcon className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-semibold mb-2">Link New Consultation to Case</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect upcoming consultations with existing case files
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Case Link
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Consultations;
