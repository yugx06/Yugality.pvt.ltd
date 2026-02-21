import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Search, Filter, ChevronDown, Database, BookMarked, Sparkles, TrendingUp, Lightbulb, FileText, Clock, Star, BookOpen, Brain } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchResult {
  id: string;
  title: string;
  court: string;
  year: string;
  citations: number;
  category: string;
  relevance: "High" | "Medium" | "Low";
  summary: string;
}

const recentSearches = [
  "Property law precedents",
  "Criminal defense strategies",
  "Contract breach remedies",
  "Employment discrimination cases",
];

const searchResults: SearchResult[] = [
  {
    id: "1",
    title: "Smith v. Johnson Property Dispute",
    court: "Supreme Court of India",
    year: "2023",
    citations: 45,
    category: "Case Law",
    relevance: "High",
    summary: "Landmark case establishing new precedents for property boundary disputes in urban areas."
  },
  {
    id: "2",
    title: "Kumar v. State Criminal Appeal",
    court: "Delhi High Court",
    year: "2024",
    citations: 32,
    category: "Case Law",
    relevance: "High",
    summary: "Important ruling on evidence admissibility in criminal proceedings."
  },
  {
    id: "3",
    title: "Patel Industries v. Revenue Department",
    court: "Bombay High Court",
    year: "2024",
    citations: 28,
    category: "Tax Law",
    relevance: "High",
    summary: "Significant judgment on GST input tax credit eligibility for service-based industries."
  },
  {
    id: "4",
    title: "State v. Sharma - Section 420 IPC",
    court: "Supreme Court of India",
    year: "2023",
    citations: 67,
    category: "Criminal Law",
    relevance: "High",
    summary: "Landmark ruling on proving mens rea in cheating cases under Section 420 IPC."
  },
  {
    id: "5",
    title: "ABC Corporation v. XYZ Limited",
    court: "Delhi High Court",
    year: "2024",
    citations: 19,
    category: "Contract Law",
    relevance: "Medium",
    summary: "Important case on force majeure clauses in commercial contracts post-pandemic."
  },
  {
    id: "6",
    title: "Sharma v. Municipal Corporation",
    court: "Karnataka High Court",
    year: "2023",
    citations: 15,
    category: "Administrative Law",
    relevance: "Medium",
    summary: "Judicial review of administrative decisions regarding building permits and urban planning."
  }
];

const legalDatabases = [
  {
    id: "db1",
    name: "Supreme Court Judgments Database",
    icon: "⚖️",
    description: "Complete repository of Supreme Court judgments from 1950 onwards",
    cases: "234,567",
    lastUpdated: "2 hours ago",
    access: "Full Access"
  },
  {
    id: "db2",
    name: "High Courts Repository",
    icon: "🏛️",
    description: "Comprehensive collection of all 25 High Courts judgments",
    cases: "1,456,890",
    lastUpdated: "1 day ago",
    access: "Full Access"
  },
  {
    id: "db3",
    name: "Indian Penal Code & CrPC",
    icon: "📕",
    description: "Complete IPC sections with amendments and case law references",
    cases: "45,678",
    lastUpdated: "3 days ago",
    access: "Full Access"
  },
  {
    id: "db4",
    name: "Civil Procedure Code Database",
    icon: "📘",
    description: "CPC sections, rules, and procedural case laws",
    cases: "32,456",
    lastUpdated: "1 week ago",
    access: "Full Access"
  },
  {
    id: "db5",
    name: "Corporate & Company Law",
    icon: "🏢",
    description: "Companies Act, SEBI regulations, and corporate case laws",
    cases: "67,890",
    lastUpdated: "4 days ago",
    access: "Premium"
  },
  {
    id: "db6",
    name: "Tax Law Repository",
    icon: "💰",
    description: "Income Tax, GST, and customs law judgments and circulars",
    cases: "89,234",
    lastUpdated: "2 days ago",
    access: "Premium"
  }
];

const savedResearch = [
  {
    id: "sr1",
    title: "Property Rights Analysis - Delhi NCR",
    category: "Property Law",
    savedDate: "2024-01-08",
    cases: 12,
    notes: "Research for upcoming case involving boundary disputes",
    tags: ["Property", "Boundary", "Urban"]
  },
  {
    id: "sr2",
    title: "Criminal Appeal Strategy Research",
    category: "Criminal Law",
    savedDate: "2024-01-05",
    cases: 8,
    notes: "Section 302 IPC precedents and defense strategies",
    tags: ["Criminal", "Murder", "Appeal"]
  },
  {
    id: "sr3",
    title: "GST Input Credit Cases",
    category: "Tax Law",
    savedDate: "2024-01-03",
    cases: 15,
    notes: "Recent Supreme Court rulings on input tax credit availability",
    tags: ["GST", "Tax", "Input Credit"]
  },
  {
    id: "sr4",
    title: "Matrimonial Dispute Precedents",
    category: "Family Law",
    savedDate: "2023-12-28",
    cases: 10,
    notes: "Divorce and custody case laws from Delhi High Court",
    tags: ["Family", "Divorce", "Custody"]
  },
  {
    id: "sr5",
    title: "Contract Breach Remedies",
    category: "Contract Law",
    savedDate: "2023-12-25",
    cases: 18,
    notes: "Specific performance vs. damages in commercial contracts",
    tags: ["Contract", "Breach", "Remedies"]
  }
];

const aiSuggestedTopics = [
  {
    id: "topic1",
    title: "Recent Trends in Data Privacy Law",
    icon: "🔒",
    relevance: "High",
    description: "Emerging case laws on digital privacy and data protection",
    relatedCases: 23,
    trending: true
  },
  {
    id: "topic2",
    title: "Environmental Law Developments",
    icon: "🌱",
    relevance: "High",
    description: "Latest NGT orders and environmental clearance disputes",
    relatedCases: 34,
    trending: true
  },
  {
    id: "topic3",
    title: "E-Commerce Regulations",
    icon: "🛒",
    relevance: "Medium",
    description: "Consumer protection in online marketplace transactions",
    relatedCases: 18,
    trending: false
  },
  {
    id: "topic4",
    title: "Cryptocurrency Legal Framework",
    icon: "₿",
    relevance: "High",
    description: "Regulatory landscape and case laws on digital currencies",
    relatedCases: 12,
    trending: true
  },
  {
    id: "topic5",
    title: "Arbitration vs. Litigation Trends",
    icon: "⚖️",
    relevance: "Medium",
    description: "Commercial dispute resolution preferences in 2024",
    relatedCases: 45,
    trending: false
  }
];

const aiInsights = [
  {
    id: "insight1",
    title: "Property Law Pattern Analysis",
    type: "Pattern",
    description: "Supreme Court shows 78% tendency to favor registered deed holders in boundary disputes",
    impact: "High",
    casesAnalyzed: 156
  },
  {
    id: "insight2",
    title: "Criminal Appeals Success Rate",
    type: "Statistics",
    description: "High Courts grant bail in 62% of cases involving first-time economic offenders",
    impact: "High",
    casesAnalyzed: 234
  },
  {
    id: "insight3",
    title: "Tax Litigation Trends",
    type: "Trend",
    description: "45% increase in favorable rulings for taxpayers in GST credit disputes this quarter",
    impact: "Medium",
    casesAnalyzed: 89
  },
  {
    id: "insight4",
    title: "Contract Enforcement Timeline",
    type: "Statistics",
    description: "Average time for specific performance decree reduced to 18 months in metro cities",
    impact: "Medium",
    casesAnalyzed: 127
  }
];

const recommendedResearch = [
  {
    id: "rec1",
    title: "Related to your recent Property Law searches",
    cases: [
      "Mahesh v. State - Adverse Possession (2024)",
      "Kumar Properties v. Sharma - Title Dispute (2023)",
      "Delhi Development Authority v. Citizens - Land Acquisition (2024)"
    ]
  },
  {
    id: "rec2",
    title: "Based on your practice areas",
    cases: [
      "State v. Multiple Accused - NDPS Act (2024)",
      "Reserve Bank v. NBFC - Banking Regulations (2024)",
      "Consumer Forum v. E-commerce - Consumer Rights (2023)"
    ]
  }
];

const Research = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("results");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground">{t("Legal Research")}</h1>
          <p className="text-muted-foreground mt-2">{t("Search through extensive legal databases and case law")}</p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Search className="w-6 h-6 text-muted-foreground" />
              <h2 className="text-xl font-semibold">{t("AI Research Assistant")}</h2>
            </div>

            {/* Main Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search cases, statutes, regulations, or legal concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] h-10 border-none">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="cases">Case Law</SelectItem>
                    <SelectItem value="statutes">Statutes</SelectItem>
                    <SelectItem value="regulations">Regulations</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-black hover:bg-gray-900 h-10">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Jurisdiction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jurisdictions</SelectItem>
                  <SelectItem value="supreme">Supreme Court</SelectItem>
                  <SelectItem value="high">High Courts</SelectItem>
                  <SelectItem value="district">District Courts</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Year Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2020-2024">2020-2024</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>

            {/* Recent Searches */}
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-3">Recent Searches:</p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setSearchQuery(search)}
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          {/* Results Section */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="results">Search Results</TabsTrigger>
              <TabsTrigger value="databases">Databases</TabsTrigger>
              <TabsTrigger value="saved">Saved Research</TabsTrigger>
              <TabsTrigger value="assistant">Latest Legal News</TabsTrigger>
            </TabsList>

            <TabsContent value="results" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Found 1,247 results in 0.3 seconds
                </p>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sort by Relevance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Sort by Relevance</SelectItem>
                    <SelectItem value="date">Sort by Date</SelectItem>
                    <SelectItem value="citations">Sort by Citations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Results */}
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <Card key={result.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-black hover:underline mb-2">
                          {result.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                          <span>{result.court}</span>
                          <span>•</span>
                          <span>{result.year}</span>
                          <span>•</span>
                          <span>{result.citations} citations</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={result.relevance === "High" ? "bg-black" : "bg-gray-600"}>
                          {result.relevance} Relevance
                        </Badge>
                        <Badge variant="outline">{result.category}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-foreground">{result.summary}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="databases">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Button className="h-24 text-white text-base font-medium bg-black hover:bg-gray-900">
                  Browse Curated Topics
                </Button>
                <Button className="h-24 text-white text-base font-medium bg-black hover:bg-gray-900">
                  Browse Law Reports
                </Button>
                <Button className="h-24 text-white text-base font-medium bg-black hover:bg-gray-900">
                  Browse Judgments by Court / Tribunals
                </Button>
                <Button className="h-24 text-white text-base font-medium bg-black hover:bg-gray-900">
                  Browse Legislation
                </Button>
                <Button className="h-24 text-white text-base font-medium bg-black hover:bg-gray-900">
                  Browse Articles & Short Pieces
                </Button>
                <Button className="h-24 text-white text-base font-medium bg-black hover:bg-gray-900">
                  Browse Secondary Material
                </Button>
                <Button className="h-24 text-white text-base font-medium bg-black hover:bg-gray-900">
                  Browse Treaties, Conventions, and Instruments
                </Button>
                <Button className="h-24 text-white text-base font-medium bg-black hover:bg-gray-900">
                  Browse Legal / Business News
                </Button>
                <Button className="h-24 text-white text-base font-medium bg-black hover:bg-gray-900">
                  Moot Court Resources
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="saved">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">
                    {savedResearch.length} saved research collections
                  </p>
                  <Button variant="outline" size="sm">
                    <BookMarked className="w-4 h-4 mr-2" />
                    New Collection
                  </Button>
                </div>
                {savedResearch.map((research) => (
                  <Card key={research.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h3 className="text-lg font-semibold">{research.title}</h3>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                          <Badge variant="outline">{research.category}</Badge>
                          <span>•</span>
                          <span>{research.cases} cases</span>
                          <span>•</span>
                          <span>Saved on {research.savedDate}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-foreground mb-3">{research.notes}</p>
                    <div className="flex flex-wrap gap-2">
                      {research.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="assistant" className="space-y-8 mt-6">
              {/* Today's Top Stories */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Today's Top Stories</h2>
                <div className="w-16 h-0.5 bg-[#8B1A4A] mb-6" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Featured Story */}
                  <div className="lg:col-span-1 cursor-pointer group">
                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-3 bg-gray-200">
                      <img
                        src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=600&q=80"
                        alt="CJI Surya Kant"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-base font-bold text-foreground group-hover:text-[#8B1A4A] transition-colors leading-snug mb-2">
                      Cyber crimes cause financial and emotional damage: CJI Surya Kant
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The CJI underlined that cybercrimes should not be viewed as a niche technological issue, because it represents a barrier to justice at the most fundamental level.
                    </p>
                  </div>

                  {/* Middle Column */}
                  <div className="flex flex-col gap-5">
                    {[
                      {
                        img: "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?w=200&q=80",
                        title: "Jharkhand High Court drops contempt case against lawyer who told judge not to cross limits",
                      },
                      {
                        img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&q=80",
                        title: "Karnataka High Court quashes cheating case against Winzo over alleged PAN card misuse",
                      },
                      {
                        img: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=200&q=80",
                        title: "Orissa High Court acquits man jailed for entering married woman's house to have consensual sex",
                      },
                    ].map((story, i) => (
                      <div key={i} className="flex gap-3 cursor-pointer group">
                        <div className="w-24 h-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-200">
                          <img
                            src={story.img}
                            alt={story.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <p className="text-sm font-semibold text-foreground group-hover:text-[#8B1A4A] transition-colors leading-snug">
                          {story.title}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-5">
                    {[
                      {
                        img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80",
                        title: "Here is why US Supreme Court struck down Trump tariffs",
                      },
                      {
                        img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&q=80",
                        title: "Reliance withdraws suit filed before Madras HC over piracy of its film Dhurandhar",
                      },
                      {
                        img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&q=80",
                        title: "Plea before Bombay High Court against State's decision to scrap 5% Muslim quota",
                      },
                    ].map((story, i) => (
                      <div key={i} className="flex gap-3 cursor-pointer group">
                        <div className="w-24 h-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-200">
                          <img
                            src={story.img}
                            alt={story.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <p className="text-sm font-semibold text-foreground group-hover:text-[#8B1A4A] transition-colors leading-snug">
                          {story.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Load more */}
                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    className="px-10 py-2 rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors text-sm"
                  >
                    Load more
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Research;
