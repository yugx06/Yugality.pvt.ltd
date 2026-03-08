import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Users as UsersIcon, UserCheck, Shield, Mail, Phone, Calendar, MapPin, Briefcase, Star, Search, Filter, Download, TrendingUp, Activity, Eye, MoreVertical, Edit, Trash2, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const lawyers = [
  { 
    id: 1, 
    name: "Adv. Rajesh Kumar", 
    email: "rajesh@law.com", 
    phone: "+91 98765 43210", 
    cases: 24, 
    clients: 32, 
    experience: "12 years", 
    specialization: "Corporate Law", 
    location: "Mumbai", 
    rating: 4.8, 
    status: "active",
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face",
    revenue: "₹4.8L"
  },
  { 
    id: 2, 
    name: "Adv. Priya Sharma", 
    email: "priya@law.com", 
    phone: "+91 98765 43211", 
    cases: 18, 
    clients: 25, 
    experience: "8 years", 
    specialization: "Family Law", 
    location: "Delhi", 
    rating: 4.6, 
    status: "active",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    revenue: "₹3.5L"
  },
  { 
    id: 3, 
    name: "Adv. Neha Verma", 
    email: "neha@law.com", 
    phone: "+91 98765 43212", 
    cases: 15, 
    clients: 20, 
    experience: "6 years", 
    specialization: "Criminal Law", 
    location: "Bangalore", 
    rating: 4.7, 
    status: "active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    revenue: "₹2.9L"
  },
];

const clients = [
  { 
    id: 1, 
    name: "Priya Sharma", 
    email: "priya.client@gmail.com", 
    phone: "+91 98765 54321", 
    cases: 3, 
    lawyer: "Adv. Rajesh Kumar", 
    joined: "Jan 2024", 
    location: "Mumbai", 
    status: "active",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    lastActive: "2 hours ago"
  },
  { 
    id: 2, 
    name: "Amit Singh", 
    email: "amit.s@gmail.com", 
    phone: "+91 98765 54322", 
    cases: 2, 
    lawyer: "Adv. Neha Verma", 
    joined: "Dec 2023", 
    location: "Delhi", 
    status: "active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    lastActive: "1 day ago"
  },
  { 
    id: 3, 
    name: "Ravi Verma", 
    email: "ravi.v@gmail.com", 
    phone: "+91 98765 54323", 
    cases: 4, 
    lawyer: "Adv. Rajesh Kumar", 
    joined: "Nov 2023", 
    location: "Mumbai", 
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    lastActive: "5 hours ago"
  },
  { 
    id: 4, 
    name: "Anjali Kumar", 
    email: "anjali.k@gmail.com", 
    phone: "+91 98765 54324", 
    cases: 1, 
    lawyer: "Adv. Priya Sharma", 
    joined: "Feb 2024", 
    location: "Bangalore", 
    status: "active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    lastActive: "30 min ago"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Users = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"all" | "lawyers" | "clients" | "stats">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Determine tab from URL hash
  useState(() => {
    const hash = location.hash.substring(1);
    if (hash === "lawyers") setActiveTab("lawyers");
    else if (hash === "clients") setActiveTab("clients");
    else if (hash === "stats") setActiveTab("stats");
    else setActiveTab("all");
  });

  const filteredLawyers = lawyers.filter(lawyer => 
    lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lawyer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lawyer.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.lawyer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              User Management
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Manage and monitor all platform users</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Export
            </Button>
            <Button className="bg-gradient-to-r from-gray-900 to-black hover:opacity-90 gap-2">
              <UserPlus className="w-4 h-4" /> Add User
            </Button>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name, email, or specialization..."
              className="pl-10 bg-card border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="border-border bg-gradient-to-br from-gray-900/5 to-black/5 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Total Lawyers</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{lawyers.length}</p>
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +2 this month
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="border-border bg-gradient-to-br from-blue-500/5 to-cyan-500/5 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Total Clients</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{clients.length}</p>
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +5 this month
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <UsersIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="border-border bg-gradient-to-br from-green-500/5 to-emerald-500/5 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Active Now</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{lawyers.length + clients.length}</p>
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <Activity className="w-3 h-3" /> All systems operational
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="border-border bg-gradient-to-br from-amber-500/5 to-orange-500/5 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Total Cases</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{lawyers.reduce((sum, l) => sum + l.cases, 0)}</p>
                    <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                      <Briefcase className="w-3 h-3" /> Active cases
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="flex gap-2 border-b border-border">
          <Button
            variant={activeTab === "all" ? "default" : "ghost"}
            onClick={() => setActiveTab("all")}
            className={`rounded-b-none border-b-2 ${activeTab === "all" ? "border-gray-900 bg-gradient-to-r from-gray-900 to-black" : "border-transparent hover:border-gray-300"}`}
          >
            All Users
          </Button>
          <Button
            variant={activeTab === "lawyers" ? "default" : "ghost"}
            onClick={() => setActiveTab("lawyers")}
            className={`rounded-b-none border-b-2 ${activeTab === "lawyers" ? "border-gray-900 bg-gradient-to-r from-gray-900 to-black" : "border-transparent hover:border-gray-300"}`}
          >
            <Shield className="w-4 h-4 mr-2" />
            Lawyers ({lawyers.length})
          </Button>
          <Button
            variant={activeTab === "clients" ? "default" : "ghost"}
            onClick={() => setActiveTab("clients")}
            className={`rounded-b-none border-b-2 ${activeTab === "clients" ? "border-gray-900 bg-gradient-to-r from-gray-900 to-black" : "border-transparent hover:border-gray-300"}`}
          >
            <UsersIcon className="w-4 h-4 mr-2" />
            Clients ({clients.length})
          </Button>
          <Button
            variant={activeTab === "stats" ? "default" : "ghost"}
            onClick={() => setActiveTab("stats")}
            className={`rounded-b-none border-b-2 ${activeTab === "stats" ? "border-gray-900 bg-gradient-to-r from-gray-900 to-black" : "border-transparent hover:border-gray-300"}`}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </motion.div>

        {/* Lawyers Table */}
        {(activeTab === "all" || activeTab === "lawyers") && (
          <motion.div variants={itemVariants}>
            <Card className="border-border shadow-lg">
              <CardHeader className="border-b border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    Lawyers Directory
                    <Badge variant="secondary" className="ml-2">{filteredLawyers.length} total</Badge>
                  </CardTitle>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Eye className="w-4 h-4" /> View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/40 border-b border-border">
                      <tr>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Lawyer</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Contact</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Performance</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cases</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell">Revenue</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Rating</th>
                        <th className="text-right px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredLawyers.map((lawyer, index) => (
                        <motion.tr 
                          key={lawyer.id} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-muted/30 transition-colors group"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-12 h-12 border-2 border-border shadow-sm">
                                <AvatarImage src={lawyer.avatar} alt={lawyer.name} className="object-cover" />
                                <AvatarFallback>
                                  <img src={lawyer.avatar} alt={lawyer.name} className="w-full h-full object-cover" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-foreground group-hover:text-gray-900 transition-colors">{lawyer.name}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">{lawyer.specialization}</Badge>
                                  <span className="text-xs text-muted-foreground">• {lawyer.experience}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <div className="text-sm space-y-1">
                              <p className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="w-3 h-3" /> {lawyer.email}
                              </p>
                              <p className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="w-3 h-3" /> {lawyer.phone}
                              </p>
                              <p className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="w-3 h-3" /> {lawyer.location}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden lg:table-cell">
                            <div className="space-y-2">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs text-muted-foreground">Case Success</span>
                                  <span className="text-xs font-medium">85%</span>
                                </div>
                                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '85%' }}></div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <p className="font-semibold text-foreground">{lawyer.cases} active</p>
                              <p className="text-muted-foreground">{lawyer.clients} clients</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden xl:table-cell">
                            <p className="font-semibold text-green-600">{lawyer.revenue}</p>
                            <p className="text-xs text-muted-foreground">This month</p>
                          </td>
                          <td className="px-6 py-4 hidden sm:table-cell">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                              <span className="text-sm font-semibold text-foreground">{lawyer.rating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button size="icon" variant="ghost" className="h-8 w-8">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Clients Table */}
        {(activeTab === "all" || activeTab === "clients") && (
          <motion.div variants={itemVariants}>
            <Card className="border-border shadow-lg">
              <CardHeader className="border-b border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <UsersIcon className="w-4 h-4 text-white" />
                    </div>
                    Clients Directory
                    <Badge variant="secondary" className="ml-2">{filteredClients.length} total</Badge>
                  </CardTitle>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Eye className="w-4 h-4" /> View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/40 border-b border-border">
                      <tr>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Contact</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Assigned Lawyer</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cases</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Activity</th>
                        <th className="text-right px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredClients.map((client, index) => (
                        <motion.tr 
                          key={client.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-muted/30 transition-colors group"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-12 h-12 border-2 border-border shadow-sm">
                                <AvatarImage src={client.avatar} alt={client.name} className="object-cover" />
                                <AvatarFallback>
                                  <img src={client.avatar} alt={client.name} className="w-full h-full object-cover" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-foreground group-hover:text-blue-600 transition-colors">{client.name}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">{client.location}</Badge>
                                  <span className="text-xs text-muted-foreground">• Joined {client.joined}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <div className="text-sm space-y-1">
                              <p className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="w-3 h-3" /> {client.email}
                              </p>
                              <p className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="w-3 h-3" /> {client.phone}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden lg:table-cell">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                                <Shield className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">{client.lawyer}</p>
                                <p className="text-xs text-muted-foreground">Primary Advocate</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-semibold text-foreground">{client.cases} active</p>
                              <p className="text-xs text-muted-foreground">Legal matters</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden sm:table-cell">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span className="text-sm text-muted-foreground">{client.lastActive}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button size="icon" variant="ghost" className="h-8 w-8">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Stats View */}
        {activeTab === "stats" && (
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Lawyer Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lawyers.map((lawyer) => (
                  <div key={lawyer.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{lawyer.name}</p>
                      <p className="text-xs text-muted-foreground">{lawyer.cases} cases • {lawyer.clients} clients</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-medium">{lawyer.rating}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-purple-600">{lawyers.length + clients.length}</p>
                  <p className="text-xs text-muted-foreground mt-2">+12% from last month</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm text-muted-foreground">Active Cases</p>
                  <p className="text-3xl font-bold text-blue-600">{lawyers.reduce((sum, l) => sum + l.cases, 0)}</p>
                  <p className="text-xs text-muted-foreground mt-2">Across all lawyers</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default Users;
