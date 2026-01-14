import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChevronLeft, ChevronRight, Plus, MapPin, Clock, Edit, Trash2, X, Gavel, Users as UsersIcon, FileText as FileIcon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CalendarEvent {
  id: number;
  title: string;
  location: string;
  time: string;
  type: "hearing" | "meeting" | "consultation" | "deadline";
  date: Date;
  description?: string;
  client?: string;
  caseNumber?: string;
  duration?: string;
}

const initialEvents: CalendarEvent[] = [
  // January 2026 Events
  { id: 1, title: "Singh vs. State - Court Hearing", location: "Bombay High Court, Court Room 3", time: "10:30 AM", type: "hearing", date: new Date(2026, 0, 6), client: "Mr. Rajesh Singh", caseNumber: "HC/2024/1234", duration: "2 hours", description: "Final arguments for property dispute case" },
  { id: 2, title: "Patel Corporate Case Arguments", location: "SAT Mumbai", time: "2:00 PM", type: "hearing", date: new Date(2026, 0, 6), client: "Patel Industries Ltd.", caseNumber: "SAT/2025/567", duration: "3 hours", description: "Securities appellate tribunal hearing" },
  { id: 3, title: "Client Meeting - Kumar Family", location: "Office, Conference Room A", time: "4:00 PM", type: "meeting", date: new Date(2026, 0, 6), client: "Kumar Family", duration: "1 hour", description: "Discussion on property division matter" },
  { id: 4, title: "Sharma Divorce Case - Mediation", location: "Mediation Center, Andheri", time: "11:00 AM", type: "consultation", date: new Date(2026, 0, 7), client: "Mrs. Priya Sharma", caseNumber: "FC/2025/890", duration: "2 hours", description: "Court-ordered mediation session" },
  { id: 5, title: "Document Filing Deadline", location: "District Court Registry", time: "5:00 PM", type: "deadline", date: new Date(2026, 0, 7), caseNumber: "DC/2025/345", description: "Last date for written submissions" },
  { id: 6, title: "Verma Land Acquisition Hearing", location: "District Court, Thane", time: "9:30 AM", type: "hearing", date: new Date(2026, 0, 8), client: "Mr. Anil Verma", caseNumber: "DC/2024/789", duration: "2 hours", description: "Land compensation case hearing" },
  { id: 7, title: "New Client Consultation - Reddy", location: "Office - Virtual Meeting", time: "3:00 PM", type: "consultation", date: new Date(2026, 0, 8), client: "Ms. Sunita Reddy", duration: "45 mins", description: "Initial consultation for employment dispute" },
  { id: 8, title: "Gupta Contract Review", location: "Client Office, BKC", time: "1:00 PM", type: "meeting", date: new Date(2026, 0, 9), client: "Gupta Enterprises", duration: "1.5 hours", description: "Contract negotiation and review meeting" },
  { id: 9, title: "Mishra Criminal Case - Trial", location: "Sessions Court, Mumbai", time: "10:00 AM", type: "hearing", date: new Date(2026, 0, 10), client: "Mr. Vijay Mishra", caseNumber: "SC/2025/123", duration: "4 hours", description: "Defense arguments presentation" },
  { id: 10, title: "Monthly Case Review", location: "Office", time: "5:30 PM", type: "meeting", date: new Date(2026, 0, 10), duration: "1 hour", description: "Internal team meeting for case status updates" },
  
  { id: 11, title: "Tax Evasion Case - Preliminary Hearing", location: "Income Tax Tribunal, Mumbai", time: "10:00 AM", type: "hearing", date: new Date(2026, 0, 13), client: "Mr. Suresh Malhotra", caseNumber: "ITT/2025/445", duration: "2 hours", description: "Opening statements for tax fraud allegations" },
  { id: 12, title: "Consumer Court Filing Deadline", location: "Consumer Forum, Bandra", time: "3:00 PM", type: "deadline", date: new Date(2026, 0, 13), caseNumber: "CF/2025/890", description: "Submit reply to consumer complaint" },
  { id: 13, title: "Client Meeting - Kapoor Real Estate", location: "Client Office, Lower Parel", time: "11:30 AM", type: "meeting", date: new Date(2026, 0, 14), client: "Kapoor Real Estate Pvt Ltd", duration: "1.5 hours", description: "Due diligence for property acquisition" },
  { id: 14, title: "Intellectual Property Dispute", location: "High Court, Court Room 7", time: "2:30 PM", type: "hearing", date: new Date(2026, 0, 15), client: "TechStart Solutions", caseNumber: "HC/2024/9087", duration: "3 hours", description: "Patent infringement case arguments" },
  { id: 15, title: "New Client Consultation - Desai", location: "Office - Virtual Meeting", time: "4:00 PM", type: "consultation", date: new Date(2026, 0, 15), client: "Mrs. Anjali Desai", duration: "1 hour", description: "Matrimonial property dispute consultation" },
  
  { id: 16, title: "Employment Tribunal - Wrongful Termination", location: "Labour Court, Andheri", time: "10:00 AM", type: "hearing", date: new Date(2026, 0, 17), client: "Mr. Prakash Joshi", caseNumber: "LC/2024/3456", duration: "2.5 hours", description: "Employee wrongful dismissal case" },
  { id: 17, title: "Document Verification Meeting", location: "Office, Conference Room B", time: "3:30 PM", type: "meeting", date: new Date(2026, 0, 17), client: "Multiple Clients", duration: "2 hours", description: "Weekly document review session" },
  { id: 18, title: "Bar Council Meeting", location: "Bar Council Office, Fort", time: "6:00 PM", type: "meeting", date: new Date(2026, 0, 20), duration: "1.5 hours", description: "Monthly bar association meeting" },
  { id: 19, title: "Arbitration Hearing - Partnership Dispute", location: "Arbitration Center, BKC", time: "11:00 AM", type: "hearing", date: new Date(2026, 0, 21), client: "Mehta & Associates", caseNumber: "ARB/2025/234", duration: "4 hours", description: "Business partnership dissolution arbitration" },
  { id: 20, title: "Insurance Claim Consultation", location: "Office - Virtual Meeting", time: "2:00 PM", type: "consultation", date: new Date(2026, 0, 21), client: "Mrs. Kavita Nair", duration: "45 mins", description: "Health insurance claim denial consultation" },
  
  { id: 21, title: "Appeal Filing Deadline", location: "High Court Registry", time: "4:00 PM", type: "deadline", date: new Date(2026, 0, 22), caseNumber: "HC/2024/5678", description: "Last date to file appeal petition" },
  { id: 22, title: "Land Acquisition Compensation Case", location: "District Court, Kalyan", time: "10:30 AM", type: "hearing", date: new Date(2026, 0, 23), client: "Village Council Representatives", caseNumber: "DC/2023/8901", duration: "3 hours", description: "Government land acquisition dispute" },
  { id: 23, title: "Corporate Merger Due Diligence", location: "Client Office, Worli", time: "1:00 PM", type: "meeting", date: new Date(2026, 0, 24), client: "Pinnacle Industries", duration: "3 hours", description: "Legal review for merger proceedings" },
  { id: 24, title: "Bail Application Hearing", location: "Sessions Court, Court Room 2", time: "11:00 AM", type: "hearing", date: new Date(2026, 0, 27), client: "Mr. Rohit Khanna", caseNumber: "SC/2026/012", duration: "2 hours", description: "Regular bail application for white-collar crime" },
  { id: 25, title: "Client Strategy Session", location: "Office, Conference Room A", time: "3:00 PM", type: "meeting", date: new Date(2026, 0, 27), client: "Singh Family Trust", duration: "2 hours", description: "Estate planning and succession strategy" },
  
  { id: 26, title: "Cyber Crime Investigation Meeting", location: "Police HQ, Cyber Cell", time: "10:00 AM", type: "meeting", date: new Date(2026, 0, 28), client: "Online Retail Corp", duration: "1.5 hours", description: "Data breach investigation coordination" },
  { id: 27, title: "Rent Control Tribunal Hearing", location: "Rent Tribunal, Dadar", time: "2:30 PM", type: "hearing", date: new Date(2026, 0, 29), client: "Mr. Ashok Patil", caseNumber: "RT/2025/667", duration: "2 hours", description: "Tenant eviction case hearing" },
  { id: 28, title: "Environmental Law Consultation", location: "Office - Virtual Meeting", time: "4:30 PM", type: "consultation", date: new Date(2026, 0, 29), client: "Green Earth NGO", duration: "1 hour", description: "Illegal construction violation complaint" },
  { id: 29, title: "Monthly Compliance Filing Deadline", location: "ROC Office", time: "6:00 PM", type: "deadline", date: new Date(2026, 0, 31), caseNumber: "COMP/2026/JAN", description: "Corporate compliance monthly submissions" },
  { id: 30, title: "Year-End Review Meeting", location: "Office", time: "5:00 PM", type: "meeting", date: new Date(2026, 0, 31), duration: "2 hours", description: "January performance and case status review" },

  // February 2026 Events
  { id: 31, title: "Banking Fraud Case - Evidence Hearing", location: "Economic Offences Court, Mumbai", time: "10:00 AM", type: "hearing", date: new Date(2026, 1, 3), client: "State Bank vs. Fraudsters", caseNumber: "EOC/2024/890", duration: "3 hours", description: "Presentation of documentary evidence" },
  { id: 32, title: "New Client Onboarding", location: "Office, Conference Room A", time: "2:00 PM", type: "meeting", date: new Date(2026, 1, 3), client: "GlobalTech Enterprises", duration: "1.5 hours", description: "Initial briefing for corporate retainer" },
  { id: 33, title: "Family Court - Custody Hearing", location: "Family Court, Bandra", time: "11:00 AM", type: "hearing", date: new Date(2026, 1, 5), client: "Mrs. Meera Iyer", caseNumber: "FC/2025/445", duration: "2 hours", description: "Child custody modification petition" },
  { id: 34, title: "Contract Drafting Workshop", location: "Bar Association Hall", time: "4:00 PM", type: "meeting", date: new Date(2026, 1, 5), duration: "2 hours", description: "CPE workshop on advanced contract drafting" },
  
  { id: 35, title: "Supreme Court Case - Final Arguments", location: "Supreme Court of India, Delhi", time: "10:30 AM", type: "hearing", date: new Date(2026, 1, 7), client: "Constitutional Rights Foundation", caseNumber: "SLP/2024/12345", duration: "4 hours", description: "Constitutional validity challenge - final hearing" },
  { id: 36, title: "Trademark Opposition Filing Deadline", location: "Trademark Registry", time: "5:00 PM", type: "deadline", date: new Date(2026, 1, 7), caseNumber: "TM/2025/6789", description: "Opposition to trademark application" },
  { id: 37, title: "Client Consultation - IPO Legal Review", location: "Client Office, BKC", time: "3:00 PM", type: "consultation", date: new Date(2026, 1, 10), client: "UniCorp Technologies", duration: "2 hours", description: "Pre-IPO legal due diligence consultation" },
  { id: 38, title: "Securities Law Seminar", location: "Hotel Taj, Colaba", time: "9:00 AM", type: "meeting", date: new Date(2026, 1, 11), duration: "6 hours", description: "All-day seminar on SEBI regulations" },
  { id: 39, title: "Criminal Appeal - Sentencing Review", location: "High Court, Court Room 12", time: "11:00 AM", type: "hearing", date: new Date(2026, 1, 12), client: "Mr. Vikram Rao", caseNumber: "CRA/2025/334", duration: "2.5 hours", description: "Appeal against sentence quantum" },
  
  { id: 40, title: "Weekly Team Meeting", location: "Office", time: "5:30 PM", type: "meeting", date: new Date(2026, 1, 12), duration: "1 hour", description: "Case assignments and strategy discussion" },
  { id: 41, title: "Medical Negligence Case Filing", location: "Civil Court, Dindoshi", time: "10:00 AM", type: "hearing", date: new Date(2026, 1, 14), client: "Mr. Ramesh Kulkarni", caseNumber: "CC/2026/123", duration: "2 hours", description: "First hearing - medical malpractice suit" },
  { id: 42, title: "Real Estate Contract Review", location: "Office - Virtual Meeting", time: "3:30 PM", type: "consultation", date: new Date(2026, 1, 14), client: "Property Developers Pvt Ltd", duration: "1.5 hours", description: "Review of sale deeds and agreements" },
  { id: 43, title: "Defamation Suit - Interim Relief", location: "High Court, Court Room 5", time: "2:00 PM", type: "hearing", date: new Date(2026, 1, 17), client: "Celebrity Client", caseNumber: "HC/2026/234", duration: "1.5 hours", description: "Application for interim injunction" },
  { id: 44, title: "Insurance Policy Review Meeting", location: "Insurance Company Office", time: "11:00 AM", type: "meeting", date: new Date(2026, 1, 18), client: "Life Insurance Corp", duration: "2 hours", description: "Policy terms negotiation meeting" },
  
  { id: 45, title: "Service Tax Dispute - Tribunal", location: "CESTAT, Mumbai", time: "10:30 AM", type: "hearing", date: new Date(2026, 1, 19), client: "Export Import Co.", caseNumber: "CESTAT/2024/789", duration: "3 hours", description: "Service tax classification dispute" },
  { id: 46, title: "Witness Preparation Session", location: "Office, Conference Room B", time: "4:00 PM", type: "meeting", date: new Date(2026, 1, 19), client: "Singh vs. State Case", duration: "2 hours", description: "Prepare witnesses for cross-examination" },
  { id: 47, title: "Competition Law Workshop", location: "CCI Office, New Delhi", time: "9:00 AM", type: "meeting", date: new Date(2026, 1, 21), duration: "5 hours", description: "Workshop on anti-trust regulations" },
  { id: 48, title: "Shareholder Dispute Mediation", location: "Mediation Center, Nariman Point", time: "11:00 AM", type: "consultation", date: new Date(2026, 1, 24), client: "XYZ Private Limited", duration: "3 hours", description: "Court-mandated mediation session" },
  { id: 49, title: "NCLT Hearing - Insolvency Matter", location: "NCLT, Mumbai Bench", time: "10:00 AM", type: "hearing", date: new Date(2026, 1, 25), client: "Creditors Committee", caseNumber: "IB/2024/567", duration: "4 hours", description: "Corporate insolvency resolution process" },
  
  { id: 50, title: "Monthly Billing Review", location: "Office", time: "6:00 PM", type: "meeting", date: new Date(2026, 1, 25), duration: "1 hour", description: "Review billable hours and invoicing" },
  { id: 51, title: "Criminal Revision Petition", location: "Sessions Court, Court Room 8", time: "11:30 AM", type: "hearing", date: new Date(2026, 1, 26), client: "Mr. Aditya Gupta", caseNumber: "CRR/2025/890", duration: "2 hours", description: "Revision petition against magistrate order" },
  { id: 52, title: "Legal Research Workshop", location: "Law Library", time: "3:00 PM", type: "meeting", date: new Date(2026, 1, 26), duration: "2 hours", description: "Advanced legal research methodologies" },
  { id: 53, title: "Quarter-End Planning Meeting", location: "Office", time: "5:00 PM", type: "meeting", date: new Date(2026, 1, 28), duration: "1.5 hours", description: "Q1 review and Q2 planning session" },

  // March 2026 Events  
  { id: 54, title: "Constitutional Petition - Fundamental Rights", location: "High Court, Court Room 1", time: "10:00 AM", type: "hearing", date: new Date(2026, 2, 2), client: "Civil Rights Advocacy Group", caseNumber: "WP/2025/12345", duration: "3 hours", description: "Writ petition challenging government order" },
  { id: 55, title: "M&A Transaction Closing", location: "Client Office, Nariman Point", time: "2:00 PM", type: "meeting", date: new Date(2026, 2, 2), client: "Acquiring Company", duration: "4 hours", description: "Final documentation for merger completion" },
  { id: 56, title: "Income Tax Assessment Hearing", location: "Income Tax Office, Churchgate", time: "11:00 AM", type: "hearing", date: new Date(2026, 2, 4), client: "Mr. Sandeep Kapoor", caseNumber: "ITO/2023/445", duration: "2 hours", description: "Assessment proceedings for AY 2023-24" },
  { id: 57, title: "Legal Tech Demo", location: "Office - Virtual Meeting", time: "4:00 PM", type: "meeting", date: new Date(2026, 2, 4), duration: "1 hour", description: "AI-powered legal research tool demonstration" },
  
  { id: 58, title: "Cheque Bounce Case - Evidence", location: "Magistrate Court, Andheri", time: "10:30 AM", type: "hearing", date: new Date(2026, 2, 5), client: "ABC Trading Company", caseNumber: "CC/2024/6789", duration: "1.5 hours", description: "Dishonour of cheque - evidence stage" },
  { id: 59, title: "Annual Bar Dinner", location: "Hotel Grand Hyatt", time: "7:00 PM", type: "meeting", date: new Date(2026, 2, 7), duration: "3 hours", description: "Bar association annual dinner and awards" },
  { id: 60, title: "Property Title Verification", location: "Sub-Registrar Office, Bandra", time: "11:00 AM", type: "meeting", date: new Date(2026, 2, 9), client: "Homebuyers Association", duration: "2 hours", description: "Document verification and due diligence" },
  { id: 61, title: "Cyber Law Consultation - Data Breach", location: "Office - Virtual Meeting", time: "3:00 PM", type: "consultation", date: new Date(2026, 2, 10), client: "E-Commerce Platform", duration: "1.5 hours", description: "Legal advice on data protection compliance" },
  { id: 62, title: "Labour Dispute - Mass Termination", location: "Industrial Tribunal, Parel", time: "10:00 AM", type: "hearing", date: new Date(2026, 2, 11), client: "Workers Union", caseNumber: "ID/2025/334", duration: "3 hours", description: "Illegal retrenchment case hearing" },
  
  { id: 63, title: "GST Audit Review", location: "Client Office, Thane", time: "2:00 PM", type: "meeting", date: new Date(2026, 2, 11), client: "Manufacturing Company", duration: "2.5 hours", description: "GST audit findings and response strategy" },
  { id: 64, title: "Divorce Settlement Negotiation", location: "Mediation Center, Bandra", time: "11:00 AM", type: "consultation", date: new Date(2026, 2, 12), client: "Confidential Client", duration: "2 hours", description: "Financial settlement and custody mediation" },
  { id: 65, title: "Senior Counsel Consultation", location: "Chamber of Senior Advocate", time: "4:30 PM", type: "meeting", date: new Date(2026, 2, 12), client: "Complex Litigation Matter", duration: "1 hour", description: "Opinion from senior counsel on strategy" },
  { id: 66, title: "Environmental Clearance Petition", location: "National Green Tribunal", time: "10:00 AM", type: "hearing", date: new Date(2026, 2, 14), client: "Infrastructure Developer", caseNumber: "NGT/2025/789", duration: "3 hours", description: "Environmental clearance challenge" },
  { id: 67, title: "Compliance Training Session", location: "Office, Conference Room A", time: "3:00 PM", type: "meeting", date: new Date(2026, 2, 16), duration: "2 hours", description: "POSH and workplace compliance training" },
  
  { id: 68, title: "RERA Complaint Hearing", location: "RERA Authority, BKC", time: "11:00 AM", type: "hearing", date: new Date(2026, 2, 17), client: "Flat Purchasers Group", caseNumber: "RERA/2024/445", duration: "2 hours", description: "Builder delay and deficiency complaint" },
  { id: 69, title: "Trademark Infringement Trial", location: "District Court, Fort", time: "2:30 PM", type: "hearing", date: new Date(2026, 2, 18), client: "Brand Owner Company", caseNumber: "CS/2024/890", duration: "3 hours", description: "Trademark passing off suit trial" },
  { id: 70, title: "Estate Planning Workshop", location: "Office - Virtual Webinar", time: "5:00 PM", type: "meeting", date: new Date(2026, 2, 18), duration: "1.5 hours", description: "Wills, trusts, and succession planning" },
  { id: 71, title: "Anti-Dumping Investigation", location: "DGTR Office, New Delhi", time: "10:00 AM", type: "hearing", date: new Date(2026, 2, 20), client: "Domestic Industry Association", caseNumber: "AD/2025/123", duration: "4 hours", description: "Anti-dumping duty investigation hearing" },
  { id: 72, title: "Client Appreciation Event", location: "Yacht Club, Gateway of India", time: "7:00 PM", type: "meeting", date: new Date(2026, 2, 21), duration: "3 hours", description: "Quarterly client networking event" },
  
  { id: 73, title: "Consumer Protection Act Workshop", location: "Consumer Forum Hall", time: "9:00 AM", type: "meeting", date: new Date(2026, 2, 23), duration: "5 hours", description: "Recent amendments and case laws" },
  { id: 74, title: "Arbitration Award Challenge", location: "High Court, Court Room 9", time: "11:00 AM", type: "hearing", date: new Date(2026, 2, 24), client: "Construction Company", caseNumber: "ARB APP/2025/567", duration: "2 hours", description: "Section 34 petition against arbitral award" },
  { id: 75, title: "Immigration Law Consultation", location: "Office - Virtual Meeting", time: "3:00 PM", type: "consultation", date: new Date(2026, 2, 24), client: "Tech Professional", duration: "1 hour", description: "Work visa and residence permit advice" },
  { id: 76, title: "Sexual Harassment Inquiry", location: "Company Premises, Powai", time: "10:00 AM", type: "meeting", date: new Date(2026, 2, 25), client: "Corporate Client - ICC", duration: "3 hours", description: "Internal complaints committee inquiry" },
  { id: 77, title: "Financial Year-End Tax Filing", location: "CA Office", time: "2:00 PM", type: "deadline", date: new Date(2026, 2, 27), caseNumber: "TAX/2026/FY25-26", description: "Last date for advance tax payment" },
  
  { id: 78, title: "Court-Annexed Mediation", location: "Mediation Center, High Court", time: "10:30 AM", type: "consultation", date: new Date(2026, 2, 26), client: "Commercial Dispute Parties", duration: "4 hours", description: "Court-referred commercial dispute mediation" },
  { id: 79, title: "Partnership Deed Drafting", location: "Office, Conference Room B", time: "4:00 PM", type: "meeting", date: new Date(2026, 2, 26), client: "New Business Partners", duration: "2 hours", description: "Partnership agreement finalization" },
  { id: 80, title: "Month-End Case Review", location: "Office", time: "6:00 PM", type: "meeting", date: new Date(2026, 2, 28), duration: "1.5 hours", description: "March case status and April planning" },
  { id: 81, title: "Corporate Governance Audit", location: "Client Office, Powai", time: "11:00 AM", type: "meeting", date: new Date(2026, 2, 30), client: "Listed Company", duration: "3 hours", description: "Annual corporate governance compliance review" },
  { id: 82, title: "Pro Bono Legal Aid Camp", location: "Community Center, Dharavi", time: "9:00 AM", type: "meeting", date: new Date(2026, 2, 31), duration: "6 hours", description: "Free legal advice camp for underprivileged" },
];

const Calendar = () => {
  const { t } = useLanguage();
  const [view, setView] = useState<"day" | "week" | "month" | "3-month">("week");
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 6));
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: "",
    location: "",
    time: "",
    type: "meeting",
    description: "",
    client: "",
    duration: "",
  });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = Array.from({ length: 12 }, (_, i) => i + 8);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "hearing": return "bg-red-500/20 border-red-500/40 text-red-600";
      case "meeting": return "bg-blue-500/20 border-blue-500/40 text-blue-600";
      case "consultation": return "bg-emerald-500/20 border-emerald-500/40 text-emerald-600";
      case "deadline": return "bg-amber-500/20 border-amber-500/40 text-amber-600";
      default: return "bg-primary/20 border-primary/40 text-primary";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hearing": return <Gavel className="w-3 h-3" />;
      case "meeting": return <UsersIcon className="w-3 h-3" />;
      case "consultation": return <Video className="w-3 h-3" />;
      case "deadline": return <FileIcon className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const getWeekDates = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates();

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const getEventForTimeSlot = (date: Date, hour: number) => {
    const dateEvents = getEventsForDate(date);
    return dateEvents.find(event => {
      const eventHour = parseInt(event.time.split(':')[0]);
      const isPM = event.time.includes('PM');
      const adjustedHour = isPM && eventHour !== 12 ? eventHour + 12 : eventHour;
      return adjustedHour === hour;
    });
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.time) return;
    
    const event: CalendarEvent = {
      id: Math.max(...events.map(e => e.id)) + 1,
      title: newEvent.title,
      location: newEvent.location || "",
      time: newEvent.time,
      type: newEvent.type as any,
      date: currentDate,
      description: newEvent.description,
      client: newEvent.client,
      duration: newEvent.duration,
    };
    
    setEvents([...events, event]);
    setShowAddDialog(false);
    setNewEvent({ title: "", location: "", time: "", type: "meeting", description: "", client: "", duration: "" });
  };

  const handleEditEvent = () => {
    if (!selectedEvent) return;
    
    setEvents(events.map(e => e.id === selectedEvent.id ? selectedEvent : e));
    setShowEditDialog(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
    setShowEditDialog(false);
    setSelectedEvent(null);
  };

  const navigateWeek = (direction: number) => {
    const newDate = new Date(currentDate);
    if (view === '3-month') {
      newDate.setMonth(currentDate.getMonth() + (direction * 3));
    } else {
      newDate.setDate(currentDate.getDate() + (direction * 7));
    }
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const generateMonthDays = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDay = getFirstDayOfMonth(date);
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const getMonthEvents = (monthOffset: number) => {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, 1);
    return events.filter(event => 
      event.date.getMonth() === targetDate.getMonth() &&
      event.date.getFullYear() === targetDate.getFullYear()
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigateWeek(-1)}
                className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <h1 className="text-2xl font-bold text-foreground min-w-[200px] text-center">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h1>
              <button 
                onClick={() => navigateWeek(1)}
                className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex bg-card rounded-lg border border-border/50 p-1">
              {["day", "week", "month", "3-month"].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v as typeof view)}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-all capitalize
                    ${view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {v}
                </button>
              ))}
            </div>
            <Button onClick={() => setShowAddDialog(true)} className="yugality-button-gold gap-2">
              <Plus className="w-4 h-4" /> {t("Add")} Event
            </Button>
          </div>
        </motion.div>

        {/* Calendar Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="yugality-card overflow-hidden"
        >
          {view === '3-month' ? (
            /* 3-Month View */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
              {[0, 1, 2].map((monthOffset) => {
                const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, 1);
                const monthDays = generateMonthDays(monthDate);
                const monthEvents = getMonthEvents(monthOffset);
                
                return (
                  <div key={monthOffset} className="border border-border/50 rounded-lg overflow-hidden">
                    {/* Month Header */}
                    <div className="bg-muted/30 p-3 border-b border-border/50">
                      <h3 className="text-lg font-semibold text-center text-foreground">
                        {monthNames[monthDate.getMonth()]} {monthDate.getFullYear()}
                      </h3>
                      <p className="text-xs text-center text-muted-foreground mt-1">
                        {monthEvents.length} event{monthEvents.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    
                    {/* Days Header */}
                    <div className="grid grid-cols-7 bg-muted/20">
                      {weekDays.map((day) => (
                        <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground border-r border-b border-border/30 last:border-r-0">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    {/* Days Grid */}
                    <div className="grid grid-cols-7">
                      {monthDays.map((day, index) => {
                        if (day === null) {
                          return <div key={`empty-${index}`} className="aspect-square border-r border-b border-border/30 last:border-r-0" />;
                        }
                        
                        const dayDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
                        const dayEvents = events.filter(event => 
                          event.date.getDate() === day &&
                          event.date.getMonth() === monthDate.getMonth() &&
                          event.date.getFullYear() === monthDate.getFullYear()
                        );
                        
                        const isToday = dayDate.getDate() === new Date().getDate() && 
                                       dayDate.getMonth() === new Date().getMonth() &&
                                       dayDate.getFullYear() === new Date().getFullYear();
                        
                        return (
                          <div
                            key={index}
                            className="aspect-square border-r border-b border-border/30 last:border-r-0 p-1 hover:bg-muted/20 transition-colors cursor-pointer group relative"
                            onClick={() => {
                              setCurrentDate(dayDate);
                              setShowAddDialog(true);
                            }}
                          >
                            <div className={`text-sm font-medium ${
                              isToday ? 'bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center' : 'text-foreground'
                            }`}>
                              {day}
                            </div>
                            <div className="flex flex-wrap gap-0.5 mt-1">
                              {dayEvents.slice(0, 3).map((event) => (
                                <div
                                  key={event.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedEvent(event);
                                    setShowEditDialog(true);
                                  }}
                                  className={`w-1 h-1 rounded-full ${
                                    event.type === 'hearing' ? 'bg-red-500' :
                                    event.type === 'meeting' ? 'bg-blue-500' :
                                    event.type === 'consultation' ? 'bg-emerald-500' :
                                    'bg-amber-500'
                                  }`}
                                  title={event.title}
                                />
                              ))}
                              {dayEvents.length > 3 && (
                                <span className="text-[8px] text-muted-foreground">+{dayEvents.length - 3}</span>
                              )}
                            </div>
                            {/* Hover tooltip */}
                            {dayEvents.length > 0 && (
                              <div className="absolute left-0 top-full mt-1 z-10 hidden group-hover:block bg-popover border border-border rounded-lg shadow-lg p-2 min-w-[200px]">
                                <div className="space-y-1">
                                  {dayEvents.map((event) => (
                                    <div key={event.id} className="text-xs">
                                      <div className="flex items-center gap-1">
                                        {getTypeIcon(event.type)}
                                        <span className="font-medium">{event.title}</span>
                                      </div>
                                      <span className="text-muted-foreground">{event.time}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Week View */
            <>
              {/* Week Header */}
              <div className="grid grid-cols-8 border-b border-border/50">
                <div className="p-4 border-r border-border/50" />
                {weekDates.map((date, i) => (
                  <div key={i} className="p-4 text-center border-r border-border/50 last:border-0">
                    <p className="text-xs text-muted-foreground uppercase">{weekDays[date.getDay()]}</p>
                    <p className={`text-lg font-semibold mt-1 ${
                      date.getDate() === new Date().getDate() && 
                      date.getMonth() === new Date().getMonth() 
                        ? "text-primary" 
                        : "text-foreground"
                    }`}>
                      {date.getDate()}
                    </p>
                    <div className="flex gap-1 justify-center mt-1">
                      {getEventsForDate(date).slice(0, 3).map(e => (
                        <div key={e.id} className={`w-1.5 h-1.5 rounded-full ${
                          e.type === 'hearing' ? 'bg-red-500' :
                          e.type === 'meeting' ? 'bg-blue-500' :
                          e.type === 'consultation' ? 'bg-emerald-500' :
                          'bg-amber-500'
                        }`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Grid */}
              <div className="max-h-[600px] overflow-y-auto scrollbar-dark">
                {hours.map((hour) => (
                  <div key={hour} className="grid grid-cols-8 border-b border-border/30">
                    <div className="p-2 text-xs text-muted-foreground text-right pr-4 border-r border-border/50">
                      {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                    </div>
                    {weekDates.map((date, dayIndex) => {
                      const event = getEventForTimeSlot(date, hour);
                      return (
                        <div
                          key={dayIndex}
                          onClick={() => !event && setShowAddDialog(true)}
                          className={`min-h-[60px] border-r border-border/30 last:border-0 hover:bg-muted/20 transition-colors relative ${
                            !event ? 'cursor-pointer' : ''
                          }`}
                        >
                          {event && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              onClick={() => {
                                setSelectedEvent(event);
                                setShowEditDialog(true);
                              }}
                              className={`absolute inset-x-1 top-1 border rounded p-1.5 cursor-pointer hover:shadow-md transition-shadow ${
                                getTypeColor(event.type)
                              }`}
                            >
                              <div className="flex items-center gap-1 mb-0.5">
                                {getTypeIcon(event.type)}
                                <p className="text-xs font-medium truncate flex-1">{event.title}</p>
                              </div>
                              <p className="text-[10px] opacity-80">{event.time}</p>
                              {event.client && (
                                <p className="text-[10px] opacity-70 truncate">{event.client}</p>
                              )}
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Today's Events Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                This Week's Schedule ({events.filter(e => weekDates.some(d => 
                  e.date.getDate() === d.getDate() && 
                  e.date.getMonth() === d.getMonth()
                )).length} events)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-dark">
                {events
                  .filter(e => weekDates.some(d => 
                    e.date.getDate() === d.getDate() && 
                    e.date.getMonth() === d.getMonth()
                  ))
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowEditDialog(true);
                    }}
                    className={`p-4 rounded-lg border-l-2 hover:bg-muted/30 transition-colors cursor-pointer ${
                      event.type === "hearing" ? "border-red-500 bg-red-500/5" :
                      event.type === "meeting" ? "border-blue-500 bg-blue-500/5" :
                      event.type === "consultation" ? "border-emerald-500 bg-emerald-500/5" :
                      "border-amber-500 bg-amber-500/5"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getTypeIcon(event.type)}
                          <p className="font-medium text-foreground text-sm">{event.title}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {event.time}
                            </span>
                          </div>
                          {event.client && (
                            <p className="text-xs text-muted-foreground">Client: {event.client}</p>
                          )}
                          {event.description && (
                            <p className="text-xs text-muted-foreground line-clamp-1">{event.description}</p>
                          )}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="e.g., Court Hearing - Singh Case"
              />
            </div>
            <div>
              <Label htmlFor="type">Event Type *</Label>
              <Select value={newEvent.type} onValueChange={(v) => setNewEvent({ ...newEvent, type: v as any })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hearing">Court Hearing</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                placeholder="e.g., 10:30 AM"
              />
            </div>
            <div>
              <Label htmlFor="client">Client Name</Label>
              <Input
                id="client"
                value={newEvent.client}
                onChange={(e) => setNewEvent({ ...newEvent, client: e.target.value })}
                placeholder="e.g., Mr. Rajesh Singh"
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={newEvent.duration}
                onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })}
                placeholder="e.g., 2 hours"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="e.g., Bombay High Court, Court Room 3"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="description">Description / Notes</Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Add any additional notes or details..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="edit-title">Event Title</Label>
                <Input
                  id="edit-title"
                  value={selectedEvent.title}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-type">Event Type</Label>
                <Select value={selectedEvent.type} onValueChange={(v) => setSelectedEvent({ ...selectedEvent, type: v as any })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hearing">Court Hearing</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-time">Time</Label>
                <Input
                  id="edit-time"
                  value={selectedEvent.time}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, time: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-client">Client Name</Label>
                <Input
                  id="edit-client"
                  value={selectedEvent.client || ""}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, client: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-duration">Duration</Label>
                <Input
                  id="edit-duration"
                  value={selectedEvent.duration || ""}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, duration: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={selectedEvent.location}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="edit-description">Description / Notes</Label>
                <Textarea
                  id="edit-description"
                  value={selectedEvent.description || ""}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                  rows={3}
                />
              </div>
              {selectedEvent.caseNumber && (
                <div className="col-span-2">
                  <Label>Case Number</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedEvent.caseNumber}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="flex justify-between">
            <Button 
              variant="destructive" 
              onClick={() => selectedEvent && handleDeleteEvent(selectedEvent.id)}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
              <Button onClick={handleEditEvent}>Save Changes</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Calendar;
