import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Shell, Activity } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TurtleMap } from '@/components/TurtleMap';
import { turtles, beaches } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const statusOptions = ['all', 'active', 'nesting', 'migrating', 'resting'];
const speciesOptions = ['all', 'Green Sea Turtle', 'Loggerhead', 'Hawksbill', 'Leatherback', 'Olive Ridley'];

const statusColors: Record<string, string> = {
  active: 'bg-green-500',
  nesting: 'bg-amber-500',
  migrating: 'bg-blue-500',
  resting: 'bg-gray-500',
};

export default function TrackPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [speciesFilter, setSpeciesFilter] = useState('all');
  const [selectedTurtle, setSelectedTurtle] = useState<string | null>(null);

  const filteredTurtles = turtles.filter((turtle) => {
    const matchesSearch = turtle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      turtle.species.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || turtle.status === statusFilter;
    const matchesSpecies = speciesFilter === 'all' || turtle.species === speciesFilter;
    return matchesSearch && matchesStatus && matchesSpecies;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-28 pb-8 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Track Sea Turtles
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow the real-time movements of our tagged sea turtles across the world's oceans.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-4 items-center justify-center"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search turtles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Species" />
              </SelectTrigger>
              <SelectContent>
                {speciesOptions.map((species) => (
                  <SelectItem key={species} value={species}>
                    {species === 'all' ? 'All Species' : species}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        </div>
      </section>

      {/* Map and List */}
      <section className="py-8">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_360px] gap-6">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <TurtleMap
                turtles={filteredTurtles}
                beaches={beaches}
                selectedTurtle={selectedTurtle}
                className="h-[500px] lg:h-[700px] shadow-ocean rounded-2xl"
              />
            </motion.div>

            {/* Turtle List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="order-1 lg:order-2"
            >
              <div className="glass-card rounded-2xl p-4 h-[500px] lg:h-[700px] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Shell className="w-5 h-5 text-primary" />
                    Active Turtles
                  </h2>
                  <Badge variant="secondary">{filteredTurtles.length}</Badge>
                </div>

                <div className="overflow-y-auto flex-1 space-y-3 pr-2">
                  {filteredTurtles.map((turtle) => (
                    <button
                      key={turtle.id}
                      onClick={() => setSelectedTurtle(selectedTurtle === turtle.id ? null : turtle.id)}
                      className={cn(
                        "w-full text-left p-3 rounded-xl transition-all",
                        selectedTurtle === turtle.id
                          ? "bg-primary/10 ring-2 ring-primary"
                          : "bg-muted/50 hover:bg-muted"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={turtle.image}
                          alt={turtle.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold truncate">{turtle.name}</h3>
                            <div className={cn("w-2 h-2 rounded-full", statusColors[turtle.status])} />
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{turtle.species}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Activity className="w-3 h-3" />
                            {turtle.speed} km/h
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
