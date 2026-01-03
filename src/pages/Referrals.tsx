import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Share2, Star, MapPin, Phone, Mail, ExternalLink, Plus, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const lawyers = [
  { id: 1, name: "Adv. Priya Mehta", specialty: "Corporate Law", location: "Mumbai", rating: 4.9, cases: 145, verified: true },
  { id: 2, name: "Adv. Rajesh Kumar", specialty: "Criminal Law", location: "Delhi", rating: 4.8, cases: 230, verified: true },
  { id: 3, name: "Adv. Sanjay Patel", specialty: "Tax Law", location: "Ahmedabad", rating: 4.7, cases: 98, verified: true },
  { id: 4, name: "Adv. Anita Sharma", specialty: "Family Law", location: "Bangalore", rating: 4.9, cases: 180, verified: true },
  { id: 5, name: "Adv. Vikram Singh", specialty: "IP Law", location: "Hyderabad", rating: 4.6, cases: 75, verified: false },
];

const Referrals = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground">Professional Referrals</h1>
            <p className="text-muted-foreground text-sm mt-1">Connect with verified legal professionals</p>
          </div>
          <Button className="yugality-button-gold gap-2">
            <Plus className="w-4 h-4" /> Add Referral
          </Button>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="yugality-card p-6"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search by name, specialty, or location..."
              className="flex-1 bg-muted/30 border-border/50"
            />
            <div className="flex gap-2 flex-wrap">
              {["All", "Corporate", "Criminal", "Tax", "Family", "IP"].map((filter) => (
                <button
                  key={filter}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors
                    ${filter === "All" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Referrals Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {lawyers.map((lawyer, index) => (
            <motion.div
              key={lawyer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="yugality-card p-6 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {lawyer.name.split(' ').slice(1).map(n => n[0]).join('')}
                </div>
                {lawyer.verified && (
                  <div className="flex items-center gap-1 text-tech text-xs">
                    <Award className="w-4 h-4" />
                    Verified
                  </div>
                )}
              </div>

              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {lawyer.name}
              </h4>
              <p className="text-sm text-primary mt-1">{lawyer.specialty}</p>

              <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {lawyer.location}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-primary fill-primary" /> {lawyer.rating}
                </span>
              </div>

              <p className="text-xs text-muted-foreground mt-2">
                {lawyer.cases} cases handled
              </p>

              <div className="flex gap-2 mt-4 pt-4 border-t border-border/30">
                <Button size="sm" variant="outline" className="flex-1 border-border/50 text-muted-foreground hover:text-foreground">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-border/50 text-muted-foreground hover:text-foreground">
                  <Mail className="w-4 h-4" />
                </Button>
                <Button size="sm" className="flex-1 bg-primary/10 text-primary hover:bg-primary/20">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Referrals;
