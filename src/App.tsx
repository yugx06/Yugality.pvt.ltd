import { useState, useEffect } from 'react'
import { 
  Scale, 
  ShieldCheck, 
  Zap, 
  Users, 
  BarChart3, 
  FileText, 
  Calendar, 
  Clock,
  ArrowRight,
  ChevronRight,
  Search,
  LayoutDashboard,
  Settings,
  Bell
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1100 },
];

function App() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen font-sans selection:bg-primary/30 selection:text-primary-foreground">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 bg-slate-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse-subtle" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-tech-blue/5 rounded-full blur-3xl" />
      </div>

      {/* Sidebar - Desktop Only for now */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r bg-white/50 backdrop-blur-xl z-50 hidden lg:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <Scale className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">YUGALITY</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'matters', icon: FileText, label: 'Legal Matters' },
            { id: 'calendar', icon: Calendar, label: 'Scheduling' },
            { id: 'clients', icon: Users, label: 'Clients' },
            { id: 'analytics', icon: BarChart3, label: 'Insights' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id 
                  ? 'bg-primary/10 text-primary shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span className="font-medium">{item.label}</span>
              {activeTab === item.id && (
                <motion.div layoutId="activePill" className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-slate-900 rounded-2xl p-4 text-white hover:shadow-2xl hover:shadow-primary/20 transition-all cursor-pointer group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gold-light/20 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-gold-light" />
              </div>
              <span className="text-xs font-semibold tracking-wider text-slate-400">RIET SHIELD</span>
            </div>
            <p className="text-sm font-medium mb-2">Compliance Active</p>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gold-light w-4/5 animate-shimmer" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 min-h-screen">
        {/* Header */}
        <header className="h-20 border-b bg-white/50 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search across modules..." 
              className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-800">Advocate Aayush</p>
                <p className="text-xs text-slate-500">Legal Brain Console</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300" />
            </div>
          </div>
        </header>

        {/* Dash Page */}
        <div className="p-8">
          <div className="mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-slate-900 mb-2"
            >
              Portfolio Insights
            </motion.h1>
            <p className="text-slate-500">Welcome back to the Yugality legal management cockpit.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: 'Pending Audits', value: '24', icon: ShieldCheck, color: 'text-gold' },
              { label: 'Active Matters', value: '156', icon: FileText, color: 'text-primary' },
              { label: 'Billed Hours', value: '1,240', icon: Clock, color: 'text-tech-blue' },
              { label: 'Success Rate', value: '98.2%', icon: Zap, color: 'text-emerald-500' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl bg-slate-50 group-hover:bg-slate-100 transition-colors`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <BarChart3 className="w-4 h-4 text-slate-200" />
                </div>
                <h3 className="text-sm font-medium text-slate-500 mb-1">{stat.label}</h3>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts & Tasks */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Case Volume Trends</h2>
                  <p className="text-sm text-slate-500">Tracking practice growth over the last 6 months</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button className="px-3 py-1 text-xs font-semibold bg-white shadow-sm rounded-md">Growth</button>
                  <button className="px-3 py-1 text-xs font-semibold text-slate-500">Revenue</button>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              <h2 className="text-xl font-bold mb-6">Autonomous Agents</h2>
              
              <div className="space-y-6">
                {[
                  { name: 'The Clerk', status: 'Indexing Files', prog: 85 },
                  { name: 'Forensic Auditor', status: 'Validating RIET', prog: 40 },
                  { name: 'The Legal Brain', status: 'Generating Digest', prog: 15 },
                ].map((agent, i) => (
                  <div key={i} className="group/agent cursor-pointer">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold">{agent.name}</span>
                      <span className="text-xs text-slate-400">{agent.prog}%</span>
                    </div>
                    <div className="text-xs text-slate-500 mb-3">{agent.status}</div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${agent.prog}%` }}
                        transition={{ delay: i * 0.2 + 0.5, duration: 1 }}
                        className="h-full bg-primary" 
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-10 py-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center gap-2 transition-all font-semibold">
                View All Activity <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
