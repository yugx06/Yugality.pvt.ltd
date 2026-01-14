import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Navigation, Clock, Phone, User, X, MessageSquare, FileText, CheckCircle, Filter, MapPin, Zap, Video, Mail, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useAlertPanel } from "@/components/layout/DashboardLayout";

// Fix for default marker icons in Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom urgent marker icon
const urgentIcon = L.divIcon({
  className: "custom-urgent-marker",
  html: `<div style="position: relative; width: 40px; height: 40px;">
    <div style="position: absolute; top: 0; left: 0; width: 40px; height: 40px; background: #ef4444; border-radius: 50%; animation: pulse-ring 2s infinite;"></div>
    <div style="position: absolute; top: 8px; left: 8px; width: 24px; height: 24px; background: #dc2626; border-radius: 50%; border: 3px solid white;"></div>
  </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

interface UrgentAlert {
  id: string;
  name: string;
  issue: string;
  location: [number, number];
  distance: number;
  time: string;
  priority: "critical" | "high" | "medium";
  contact: string;
  caseType: string;
  status: "new" | "contacted" | "resolved";
  clientPhoto?: string;
  email?: string;
  caseNumber?: string;
  courtDate?: string;
}

// Mock urgent alerts data - replace with real data from your backend
const mockAlerts: UrgentAlert[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    issue: "🚨 Emergency bail hearing in 2 hours - Client arrested for financial fraud, needs immediate legal representation at Sessions Court",
    location: [28.6139, 77.2090], // Delhi coordinates
    distance: 2.3,
    time: "5 mins ago",
    priority: "critical",
    contact: "+91 98765 43210",
    caseType: "Criminal",
    status: "new",
  },
  {
    id: "2",
    name: "Vikram Malhotra",
    issue: "⚠️ Police custody - Wrongful arrest case, family requesting immediate habeas corpus petition filing",
    location: [28.6100, 77.2050],
    distance: 1.5,
    time: "8 mins ago",
    priority: "critical",
    contact: "+91 98765 54321",
    caseType: "Criminal",
    status: "new",
  },
  {
    id: "3",
    name: "Priya Sharma",
    issue: "Child custody emergency - Ex-spouse attempting to take child out of country, need urgent injunction",
    location: [28.6200, 77.2150],
    distance: 3.1,
    time: "12 mins ago",
    priority: "high",
    contact: "+91 98765 43211",
    caseType: "Family",
    status: "contacted",
  },
  {
    id: "4",
    name: "Anil Desai",
    issue: "Property demolition notice - BMC issued demolition order, need stay order immediately before 5 PM today",
    location: [28.6180, 77.2080],
    distance: 2.8,
    time: "15 mins ago",
    priority: "critical",
    contact: "+91 98765 11111",
    caseType: "Property",
    status: "new",
  },
  {
    id: "5",
    name: "Amit Patel",
    issue: "Court appearance in 3 hours - Summons for commercial dispute, client needs lawyer representation urgently",
    location: [28.6080, 77.2030],
    distance: 1.8,
    time: "18 mins ago",
    priority: "high",
    contact: "+91 98765 43212",
    caseType: "Civil",
    status: "new",
  },
  {
    id: "6",
    name: "Meera Iyer",
    issue: "Domestic violence protection order - Immediate intervention required, victim safety at risk",
    location: [28.6220, 77.2180],
    distance: 3.5,
    time: "22 mins ago",
    priority: "critical",
    contact: "+91 98765 22222",
    caseType: "Family",
    status: "contacted",
  },
  {
    id: "7",
    name: "Suresh Gupta",
    issue: "Business partner fraud - Discovered embezzlement, need immediate injunction and asset freezing order",
    location: [28.6150, 77.2100],
    distance: 2.1,
    time: "25 mins ago",
    priority: "high",
    contact: "+91 98765 33333",
    caseType: "Corporate",
    status: "new",
  },
  {
    id: "8",
    name: "Kavita Nair",
    issue: "Wrongful termination - Employer threatening to defame, need urgent legal notice and injunction",
    location: [28.6170, 77.2120],
    distance: 2.6,
    time: "30 mins ago",
    priority: "high",
    contact: "+91 98765 44444",
    caseType: "Labour",
    status: "new",
  },
  {
    id: "9",
    name: "Rohit Khanna",
    issue: "Cheque bounce case - Criminal complaint filed, need anticipatory bail application today",
    location: [28.6090, 77.2040],
    distance: 1.9,
    time: "35 mins ago",
    priority: "high",
    contact: "+91 98765 55555",
    caseType: "Criminal",
    status: "contacted",
  },
  {
    id: "10",
    name: "Sunita Reddy",
    issue: "Property dispute - Illegal occupation of ancestral property, need urgent eviction order",
    location: [28.6250, 77.2200],
    distance: 4.5,
    time: "40 mins ago",
    priority: "medium",
    contact: "+91 98765 43213",
    caseType: "Property",
    status: "new",
  },
  {
    id: "11",
    name: "Deepak Singh",
    issue: "Consumer complaint - Medical negligence case, patient condition critical, need immediate legal action",
    location: [28.6130, 77.2070],
    distance: 2.2,
    time: "45 mins ago",
    priority: "high",
    contact: "+91 98765 66666",
    caseType: "Civil",
    status: "new",
  },
  {
    id: "12",
    name: "Anjali Mehta",
    issue: "Cyber crime victim - Identity theft and financial fraud, need urgent police complaint and court order",
    location: [28.6190, 77.2140],
    distance: 3.0,
    time: "50 mins ago",
    priority: "high",
    contact: "+91 98765 77777",
    caseType: "Cyber Law",
    status: "new",
  },
  {
    id: "13",
    name: "Prakash Joshi",
    issue: "Bail application hearing today - Client in judicial custody, hearing at 2 PM",
    location: [28.6110, 77.2060],
    distance: 1.7,
    time: "55 mins ago",
    priority: "critical",
    contact: "+91 98765 88888",
    caseType: "Criminal",
    status: "contacted",
  },
  {
    id: "14",
    name: "Neha Kapoor",
    issue: "Divorce settlement dispute - Ex-spouse threatening to harm, need immediate protection order",
    location: [28.6160, 77.2110],
    distance: 2.5,
    time: "1 hour ago",
    priority: "high",
    contact: "+91 98765 99999",
    caseType: "Family",
    status: "new",
  },
  {
    id: "15",
    name: "Ramesh Kulkarni",
    issue: "Tax evasion notice - Income Tax raid conducted, need urgent legal representation",
    location: [28.6210, 77.2170],
    distance: 3.3,
    time: "1 hour ago",
    priority: "high",
    contact: "+91 98765 00000",
    caseType: "Tax",
    status: "new",
  },
  {
    id: "16",
    name: "Sanjay Rao",
    issue: "Accident compensation - Hit and run case, victim needs immediate legal aid for insurance claim",
    location: [28.6070, 77.2020],
    distance: 1.6,
    time: "1.5 hours ago",
    priority: "medium",
    contact: "+91 98765 12121",
    caseType: "Civil",
    status: "resolved",
  },
  {
    id: "17",
    name: "Pooja Verma",
    issue: "Land acquisition dispute - Government forcing sale below market rate, need urgent intervention",
    location: [28.6240, 77.2190],
    distance: 4.0,
    time: "2 hours ago",
    priority: "medium",
    contact: "+91 98765 23232",
    caseType: "Property",
    status: "contacted",
  },
  {
    id: "18",
    name: "Arjun Pillai",
    issue: "Partnership dissolution - Partner absconding with company funds, need urgent court order",
    location: [28.6120, 77.2090],
    distance: 2.0,
    time: "2.5 hours ago",
    priority: "high",
    contact: "+91 98765 34343",
    caseType: "Corporate",
    status: "new",
  },
  {
    id: "19",
    name: "Seema Agarwal",
    issue: "Will dispute - Relatives contesting will validity, need immediate injunction against property transfer",
    location: [28.6230, 77.2160],
    distance: 3.7,
    time: "3 hours ago",
    priority: "medium",
    contact: "+91 98765 45454",
    caseType: "Property",
    status: "contacted",
  },
  {
    id: "20",
    name: "Manish Bhatia",
    issue: "Defamation case - False allegations on social media, need urgent legal notice and takedown",
    location: [28.6140, 77.2100],
    distance: 2.4,
    time: "3.5 hours ago",
    priority: "medium",
    contact: "+91 98765 56565",
    caseType: "Civil",
    status: "resolved",
  },
];

export const UrgentAlertMap = () => {
  const [alerts, setAlerts] = useState<UrgentAlert[]>(mockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<UrgentAlert | null>(null);
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { showAlertPanel, setShowAlertPanel } = useAlertPanel();

  // Center of map (Delhi as default - replace with user's location)
  const center: [number, number] = [28.6139, 77.2090];
  
  // Filter alerts based on tab and search
  const filteredAlerts = alerts.filter((alert) => {
    const matchesTab = 
      activeTab === "all" ? true :
      activeTab === "new" ? alert.status === "new" :
      activeTab === "contacted" ? alert.status === "contacted" :
      alert.status === "resolved";
    
    const matchesPriority = filterPriority === "all" || alert.priority === filterPriority;
    const matchesSearch = alert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.issue.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesPriority && matchesSearch;
  });
  
  const criticalAlerts = alerts.filter((a) => a.priority === "critical" && a.status !== "resolved").length;
  const highAlerts = alerts.filter((a) => a.priority === "high" && a.status !== "resolved").length;
  const newAlerts = alerts.filter((a) => a.status === "new").length;

  const markAsContacted = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, status: "contacted" as const } : alert
    ));
  };

  const markAsResolved = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, status: "resolved" as const } : alert
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      default:
        return "bg-yellow-500";
    }
  };

  const getPriorityTextColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-500";
      case "high":
        return "text-orange-500";
      default:
        return "text-yellow-500";
    }
  };

  return (
    <>
      {/* Main Alert Panel with Map */}
      <AnimatePresence>
        {showAlertPanel && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-20 right-6 z-40 w-[500px] max-h-[calc(100vh-120px)] overflow-hidden"
          >
            <Card className="border-2 border-red-500 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-red-600 via-orange-600 to-red-600 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <Bell className="w-5 h-5 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-white text-lg">
                      Urgent Legal Assistance
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowAlertPanel(false)}
                    className="text-white hover:bg-red-700 h-8 w-8"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-red-800 text-white gap-1 text-xs">
                    <Zap className="w-3 h-3" />
                    {criticalAlerts} Critical
                  </Badge>
                  <Badge className="bg-orange-600 text-white gap-1 text-xs">
                    <AlertTriangle className="w-3 h-3" />
                    {highAlerts} High Priority
                  </Badge>
                  <Badge className="bg-white text-red-600 gap-1 text-xs">
                    <Bell className="w-3 h-3" />
                    {newAlerts} New Requests
                  </Badge>
                  <Badge className="bg-blue-600 text-white gap-1 text-xs">
                    <Phone className="w-3 h-3" />
                    {alerts.filter(a => a.status === "contacted").length} Active
                  </Badge>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="p-3 bg-muted/50 border-b space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search by name or issue..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 h-9"
                  />
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="all">All Priority</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                  </select>
                </div>
              </div>

              {/* Tabs for status */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-4 h-auto p-1 bg-muted">
                  <TabsTrigger value="all" className="text-xs">
                    All ({alerts.length})
                  </TabsTrigger>
                  <TabsTrigger value="new" className="text-xs">
                    New ({alerts.filter(a => a.status === "new").length})
                  </TabsTrigger>
                  <TabsTrigger value="contacted" className="text-xs">
                    Active ({alerts.filter(a => a.status === "contacted").length})
                  </TabsTrigger>
                  <TabsTrigger value="resolved" className="text-xs">
                    Done ({alerts.filter(a => a.status === "resolved").length})
                  </TabsTrigger>
                </TabsList>

              {/* Map Section */}
              <TabsContent value={activeTab} className="m-0">
                <div className="h-[250px] relative border-b">
                  <MapContainer
                    center={center}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    className="z-0"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {/* User location circle */}
                    <Circle
                      center={center}
                      radius={500}
                      pathOptions={{
                        color: "#3b82f6",
                        fillColor: "#3b82f6",
                        fillOpacity: 0.2,
                      }}
                    />
                    
                    {/* Alert markers - only show filtered alerts */}
                    {filteredAlerts.map((alert) => (
                      <Marker
                        key={alert.id}
                        position={alert.location}
                        icon={alert.priority === "critical" ? urgentIcon : DefaultIcon}
                        eventHandlers={{
                          click: () => setSelectedAlert(alert),
                        }}
                      >
                        <Popup>
                          <div className="p-2">
                            <p className="font-semibold">{alert.name}</p>
                            <p className="text-sm text-muted-foreground">{alert.issue}</p>
                            <Badge className="mt-1 text-xs">{alert.caseType}</Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {alert.distance} km away • {alert.time}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>

                {/* Alerts List */}
                <div className="max-h-[280px] overflow-y-auto p-3 space-y-2">
                  {filteredAlerts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertTriangle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No alerts match your filters</p>
                    </div>
                  ) : (
                    filteredAlerts.map((alert) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.01 }}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all relative ${
                          alert.priority === "critical"
                            ? "border-red-500 bg-red-50 dark:bg-red-950"
                            : alert.priority === "high"
                            ? "border-orange-500 bg-orange-50 dark:bg-orange-950"
                            : "border-yellow-500 bg-yellow-50 dark:bg-yellow-950"
                        } ${selectedAlert?.id === alert.id ? "ring-2 ring-offset-2 ring-primary" : ""} ${
                          alert.status === "resolved" ? "opacity-60" : ""
                        }`}
                        onClick={() => setSelectedAlert(alert)}
                      >
                        {/* Status Badge */}
                        {alert.status === "contacted" && (
                          <div className="absolute -top-1 -right-1">
                            <Badge className="bg-blue-600 text-white text-[10px] px-1.5 py-0">
                              Active
                            </Badge>
                          </div>
                        )}
                        {alert.status === "resolved" && (
                          <div className="absolute -top-1 -right-1">
                            <Badge className="bg-green-600 text-white text-[10px] px-1.5 py-0 gap-0.5">
                              <CheckCircle className="w-2.5 h-2.5" />
                              Done
                            </Badge>
                          </div>
                        )}
                        
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <User className="w-3.5 h-3.5 shrink-0" />
                              <p className="font-semibold text-sm truncate">{alert.name}</p>
                              <Badge
                                variant="outline"
                                className={`${getPriorityColor(alert.priority)} text-white text-[10px] px-1.5 py-0`}
                              >
                                {alert.priority.toUpperCase()}
                              </Badge>
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                {alert.caseType}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                              {alert.issue}
                            </p>
                            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{alert.distance} km</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{alert.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="flex gap-1.5 mt-2.5 pt-2.5 border-t border-border/50">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `tel:${alert.contact}`;
                              markAsContacted(alert.id);
                            }}
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `https://wa.me/${alert.contact.replace(/\s+/g, '')}`;
                              markAsContacted(alert.id);
                            }}
                          >
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Chat
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `mailto:${alert.email || 'client@example.com'}`;
                            }}
                          >
                            <Mail className="w-3 h-3 mr-1" />
                            Email
                          </Button>
                          {alert.status !== "resolved" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs bg-green-50 hover:bg-green-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsResolved(alert.id);
                              }}
                            >
                              <CheckCircle className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>

              {/* Action Footer */}
              <div className="p-3 bg-gradient-to-r from-muted to-muted/50 border-t flex gap-2">
                <Button 
                  className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white h-9"
                  onClick={() => window.location.href = '/cases'}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View All Cases
                </Button>
                <Button 
                  variant="outline" 
                  className="h-9 px-3"
                  onClick={() => {
                    // Refresh alerts
                    setAlerts([...mockAlerts]);
                  }}
                >
                  <Navigation className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add CSS for pulse animation */}
      <style>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
          100% {
            transform: scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};
