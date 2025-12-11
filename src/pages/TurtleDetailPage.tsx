import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Thermometer, 
  Activity, 
  Anchor,
  Calendar,
  Heart,
  AlertTriangle,
  Ruler,
  Scale
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TurtleMap } from '@/components/TurtleMap';
import { turtles } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const statusColors = {
  active: 'bg-green-500/20 text-green-700 border-green-500/30',
  nesting: 'bg-amber-500/20 text-amber-700 border-amber-500/30',
  migrating: 'bg-blue-500/20 text-blue-700 border-blue-500/30',
  resting: 'bg-gray-500/20 text-gray-700 border-gray-500/30',
};

const healthColors = {
  excellent: { color: 'text-green-600', progress: 100 },
  good: { color: 'text-blue-600', progress: 75 },
  fair: { color: 'text-amber-600', progress: 50 },
  poor: { color: 'text-red-600', progress: 25 },
};

const threatColors = {
  low: { color: 'text-green-600', bg: 'bg-green-500' },
  medium: { color: 'text-amber-600', bg: 'bg-amber-500' },
  high: { color: 'text-red-600', bg: 'bg-red-500' },
};

// Mock movement data
const generateMovementData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    distance: Math.floor(Math.random() * 50) + 10,
    depth: Math.floor(Math.random() * 30) + 5,
  }));
};

export default function TurtleDetailPage() {
  const { id } = useParams();
  const turtle = turtles.find(t => t.id === id);
  const movementData = generateMovementData();

  if (!turtle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Turtle not found</h1>
          <Link to="/turtles">
            <Button>Back to Turtles</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 pb-8">
        <div className="container">
          <Link to="/turtles">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Turtles
            </Button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Image and Basic Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative rounded-3xl overflow-hidden">
                <img 
                  src={turtle.image} 
                  alt={turtle.name}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge variant="outline" className={cn("mb-3 capitalize border", statusColors[turtle.status])}>
                    {turtle.status}
                  </Badge>
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                    {turtle.name}
                  </h1>
                  <p className="text-white/80 text-lg">{turtle.species}</p>
                  <p className="text-white/60 text-sm italic">{turtle.speciesScientific}</p>
                </div>
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <p className="text-muted-foreground text-lg leading-relaxed">
                {turtle.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-semibold">{turtle.age} years</p>
                    </div>
                  </div>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Scale className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="font-semibold">{turtle.weight} kg</p>
                    </div>
                  </div>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Ruler className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Length</p>
                      <p className="font-semibold">{turtle.length} cm</p>
                    </div>
                  </div>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-seaweed/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-seaweed" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Distance</p>
                      <p className="font-semibold">{turtle.totalDistance.toLocaleString()} km</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Health Status */}
              <div className="glass-card rounded-xl p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-coral" />
                  Health Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Overall Health</span>
                    <span className={cn("font-medium capitalize", healthColors[turtle.healthStatus].color)}>
                      {turtle.healthStatus}
                    </span>
                  </div>
                  <Progress value={healthColors[turtle.healthStatus].progress} className="h-2" />
                </div>
              </div>

              {/* Threat Level */}
              <div className="glass-card rounded-xl p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Threat Level
                </h3>
                <div className="flex items-center gap-3">
                  <div className={cn("w-4 h-4 rounded-full", threatColors[turtle.threatLevel].bg)} />
                  <span className={cn("font-medium capitalize", threatColors[turtle.threatLevel].color)}>
                    {turtle.threatLevel} Risk
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Data */}
      <section className="py-8">
        <div className="container">
          <h2 className="font-display text-2xl font-bold mb-6">Live Tracking Data</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Current Location</span>
              </div>
              <p className="font-semibold text-lg">
                {turtle.location.lat.toFixed(4)}°, {turtle.location.lng.toFixed(4)}°
              </p>
            </div>
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <Thermometer className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Water Temperature</span>
              </div>
              <p className="font-semibold text-lg">{turtle.temperature}°C</p>
            </div>
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Current Speed</span>
              </div>
              <p className="font-semibold text-lg">{turtle.speed} km/h</p>
            </div>
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <Anchor className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Dive Depth</span>
              </div>
              <p className="font-semibold text-lg">{turtle.depth}m</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-8">
        <div className="container">
          <h2 className="font-display text-2xl font-bold mb-6">Migration Trail</h2>
          <TurtleMap
            turtles={[turtle]}
            selectedTurtle={turtle.id}
            center={[turtle.location.lat, turtle.location.lng]}
            zoom={4}
            className="h-[400px] shadow-ocean rounded-2xl"
          />
        </div>
      </section>

      {/* Movement Chart */}
      <section className="py-8">
        <div className="container">
          <h2 className="font-display text-2xl font-bold mb-6">Weekly Movement</h2>
          <div className="glass-card rounded-2xl p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={movementData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="distance" 
                  name="Distance (km)"
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="depth" 
                  name="Avg Depth (m)"
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--secondary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
