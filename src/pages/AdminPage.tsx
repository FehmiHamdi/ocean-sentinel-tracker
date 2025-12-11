import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shell, 
  Map, 
  Users, 
  AlertTriangle,
  TrendingUp,
  Plus,
  Search,
  Edit,
  Trash2,
  Bell,
  BarChart3,
  Activity
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StatCard } from '@/components/StatCard';
import { turtles, beaches, alerts, stats } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { cn } from '@/lib/utils';

const COLORS = ['#0891b2', '#0d9488', '#f59e0b', '#ef4444', '#8b5cf6'];

const alertTypeColors = {
  danger: 'bg-red-500/20 text-red-700 border-red-500/30',
  warning: 'bg-amber-500/20 text-amber-700 border-amber-500/30',
  info: 'bg-blue-500/20 text-blue-700 border-blue-500/30',
};

const statusColors: Record<string, string> = {
  active: 'bg-green-500',
  nesting: 'bg-amber-500',
  migrating: 'bg-blue-500',
  resting: 'bg-gray-500',
};

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTurtles = turtles.filter((turtle) =>
    turtle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    turtle.species.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-28 pb-8 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage turtle tracking data, beaches, and monitor conservation efforts.
              </p>
            </div>
            <Button className="shrink-0">
              <Plus className="w-4 h-4 mr-2" />
              Add New Turtle
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              label="Total Turtles" 
              value={stats.totalTurtles} 
              icon={Shell}
              variant="primary"
            />
            <StatCard 
              label="Active Trackers" 
              value={stats.activeTurtles} 
              icon={Activity}
              trend={{ value: 8, positive: true }}
            />
            <StatCard 
              label="Nesting Beaches" 
              value={stats.nestingBeaches} 
              icon={Map}
            />
            <StatCard 
              label="Alerts Today" 
              value={stats.alertsToday} 
              icon={Bell}
              variant="secondary"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container">
          <Tabs defaultValue="turtles" className="space-y-6">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="turtles">Turtles</TabsTrigger>
              <TabsTrigger value="beaches">Beaches</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Turtles Tab */}
            <TabsContent value="turtles" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search turtles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="glass-card rounded-2xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Species</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Health</TableHead>
                      <TableHead>Last Seen</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTurtles.map((turtle) => (
                      <TableRow key={turtle.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img 
                              src={turtle.image} 
                              alt={turtle.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <span className="font-medium">{turtle.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{turtle.species}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={cn("w-2 h-2 rounded-full", statusColors[turtle.status])} />
                            <span className="capitalize">{turtle.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="capitalize">{turtle.healthStatus}</span>
                        </TableCell>
                        <TableCell>
                          {new Date(turtle.lastSeen).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Beaches Tab */}
            <TabsContent value="beaches" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Nesting Beaches</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Beach
                </Button>
              </div>

              <div className="glass-card rounded-2xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Beach Name</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Nests</TableHead>
                      <TableHead>Volunteers</TableHead>
                      <TableHead>Threat Level</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {beaches.map((beach) => (
                      <TableRow key={beach.id}>
                        <TableCell className="font-medium">{beach.name}</TableCell>
                        <TableCell>{beach.country}</TableCell>
                        <TableCell>{beach.nestCount}</TableCell>
                        <TableCell>{beach.volunteers}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn(
                            "capitalize border",
                            beach.threatLevel === 'high' && 'bg-red-500/20 text-red-700 border-red-500/30',
                            beach.threatLevel === 'medium' && 'bg-amber-500/20 text-amber-700 border-amber-500/30',
                            beach.threatLevel === 'low' && 'bg-green-500/20 text-green-700 border-green-500/30',
                          )}>
                            {beach.threatLevel}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Alerts Tab */}
            <TabsContent value="alerts" className="space-y-6">
              <h2 className="text-xl font-semibold">Recent Alerts</h2>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-xl p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                        alert.type === 'danger' && 'bg-red-500/20',
                        alert.type === 'warning' && 'bg-amber-500/20',
                        alert.type === 'info' && 'bg-blue-500/20',
                      )}>
                        <AlertTriangle className={cn(
                          "w-5 h-5",
                          alert.type === 'danger' && 'text-red-600',
                          alert.type === 'warning' && 'text-amber-600',
                          alert.type === 'info' && 'text-blue-600',
                        )} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{alert.title}</h3>
                          <Badge variant="outline" className={cn("border", alertTypeColors[alert.type])}>
                            {alert.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Monthly Nests Chart */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Monthly Nests
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stats.monthlyNests}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="count" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Species Distribution */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Shell className="w-5 h-5 text-secondary" />
                    Species Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={stats.turtlesBySpecies}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ species, percent }) => `${species.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                      >
                        {stats.turtlesBySpecies.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Top Migrators */}
                <div className="glass-card rounded-2xl p-6 lg:col-span-2">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    Top Migrators by Distance
                  </h3>
                  <div className="space-y-4">
                    {stats.migrationDistances.map((item, index) => (
                      <div key={item.turtleId} className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {item.distance.toLocaleString()} km
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full ocean-gradient rounded-full"
                              style={{ 
                                width: `${(item.distance / stats.migrationDistances[0].distance) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
