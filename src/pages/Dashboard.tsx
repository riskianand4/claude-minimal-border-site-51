import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Users, Library, Plus, TrendingUp, Activity, AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { EnhancedSkeleton, SkeletonCard } from "@/components/ui/enhanced-skeleton"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { dashboardStats, activityLog } from "@/data/mockData"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { toast } from "@/hooks/use-toast"
import { useGlobalShortcuts } from "@/hooks/useKeyboardShortcuts"

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [realTimeData, setRealTimeData] = useState(dashboardStats)
  
  useGlobalShortcuts()
  
  // Simulate loading and real-time updates
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3) - 1,
        systemHealth: Math.max(95, Math.min(100, prev.systemHealth + (Math.random() - 0.5) * 2))
      }))
    }, 10000)
    
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  const stats = [
    { 
      title: "Total Users", 
      value: realTimeData.totalUsers, 
      icon: Users, 
      color: "text-blue-600", 
      change: "+12%", 
      trend: "up",
      description: "Active users in the system"
    },
    { 
      title: "Library Items", 
      value: realTimeData.totalLibraryItems, 
      icon: Library, 
      color: "text-green-600", 
      change: "+8%", 
      trend: "up",
      description: "Documents and media files"
    },
    { 
      title: "Total Assets", 
      value: realTimeData.totalAssets, 
      icon: Plus, 
      color: "text-purple-600", 
      change: "+23%", 
      trend: "up",
      description: "Managed assets and equipment"
    },
    { 
      title: "System Health", 
      value: `${realTimeData.systemHealth.toFixed(1)}%`, 
      icon: realTimeData.systemHealth > 98 ? CheckCircle2 : AlertCircle, 
      color: realTimeData.systemHealth > 98 ? "text-green-600" : "text-yellow-600", 
      change: "+0.2%", 
      trend: "up",
      description: "Overall system performance"
    },
  ]

  const areaData = [
    { month: "Jan", users: 400, items: 240 },
    { month: "Feb", users: 300, items: 139 },
    { month: "Mar", users: 200, items: 980 },
    { month: "Apr", users: 278, items: 390 },
    { month: "May", users: 189, items: 480 },
    { month: "Jun", users: 239, items: 380 },
  ]

  const barData = [
    { name: "Documents", value: 234 },
    { name: "Images", value: 156 },
    { name: "Videos", value: 45 },
    { name: "Audio", value: 78 },
  ]

  const pieData = [
    { name: "Active Users", value: 65, fill: "#3b82f6" },
    { name: "Inactive Users", value: 35, fill: "#e5e7eb" },
  ]

  const lineData = [
    { week: "W1", downloads: 120, uploads: 80 },
    { week: "W2", downloads: 190, uploads: 120 },
    { week: "W3", downloads: 300, uploads: 200 },
    { week: "W4", downloads: 250, uploads: 180 },
  ]

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <EnhancedSkeleton variant="text" className="h-8 w-48" />
          <EnhancedSkeleton variant="text" className="h-4 w-96" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-text-secondary mt-2">Welcome back! Here's what's happening with your system.</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live updates enabled
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <Card className="border-border hover-lift smooth-transition">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-text-secondary">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-${stat.color.replace('text-', '')}/10`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-2">
                  <AnimatedCounter 
                    from={0} 
                    to={typeof stat.value === 'string' ? parseInt(stat.value.replace(/[^\d]/g, '')) || 0 : stat.value}
                    suffix={typeof stat.value === 'string' && stat.value.includes('%') ? '%' : ''}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {stat.change} from last month
                  </Badge>
                  <TrendingUp className="h-3 w-3 text-green-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">User Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ users: { label: "Users", color: "#3b82f6" }, items: { label: "Items", color: "#10b981" } }} className="h-[200px]">
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="users" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="items" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">File Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ value: { label: "Count", color: "#8b5cf6" } }} className="h-[200px]">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ active: { label: "Active", color: "#3b82f6" }, inactive: { label: "Inactive", color: "#e5e7eb" } }} className="h-[200px]">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ downloads: { label: "Downloads", color: "#f59e0b" }, uploads: { label: "Uploads", color: "#ef4444" } }} className="h-[200px]">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="downloads" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="uploads" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border hover-lift">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toast({ title: "Activity refreshed", description: "Latest activities loaded" })}
              >
                <Clock className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {activityLog.slice(0, 6).map((activity, index) => (
                  <motion.div 
                    key={activity.id} 
                    className="flex items-start space-x-3 border-l-2 border-border pl-4 hover:bg-muted/50 rounded-r-lg p-2 -ml-4 smooth-transition"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'upload' ? 'bg-blue-500' :
                      activity.type === 'user' ? 'bg-green-500' :
                      activity.type === 'maintenance' ? 'bg-orange-500' :
                      activity.type === 'update' ? 'bg-purple-500' :
                      'bg-gray-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity.user}</span>{' '}
                        {activity.action}{' '}
                        <span className="font-medium">{activity.item}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-border hover-lift">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
              <p className="text-sm text-muted-foreground">Commonly used shortcuts</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Add User", href: "/people", icon: Users, shortcut: "Ctrl+N" },
                  { label: "Upload Asset", href: "/add-assets", icon: Plus, shortcut: "Ctrl+U" },
                  { label: "View Library", href: "/library", icon: Library, shortcut: "Ctrl+L" },
                  { label: "Settings", href: "/settings", icon: TrendingUp, shortcut: "Ctrl+," }
                ].map((action, index) => (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center gap-2 hover-lift smooth-transition w-full"
                      onClick={() => window.location.href = action.href}
                    >
                      <action.icon className="h-6 w-6" />
                      <span className="font-medium">{action.label}</span>
                      <Badge variant="secondary" className="text-xs">
                        {action.shortcut}
                      </Badge>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Dashboard