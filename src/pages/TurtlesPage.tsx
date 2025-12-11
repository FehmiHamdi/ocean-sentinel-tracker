import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TurtleCard } from '@/components/TurtleCard';
import { turtles } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const speciesOptions = ['all', 'Green Sea Turtle', 'Loggerhead', 'Hawksbill', 'Leatherback', 'Olive Ridley'];
const statusOptions = ['all', 'active', 'nesting', 'migrating', 'resting'];

export default function TurtlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTurtles = turtles.filter((turtle) => {
    const matchesSearch = turtle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      turtle.species.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecies = speciesFilter === 'all' || turtle.species === speciesFilter;
    const matchesStatus = statusFilter === 'all' || turtle.status === statusFilter;
    return matchesSearch && matchesSpecies && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-28 pb-12 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">Our Turtles</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
              Turtle Profiles
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get to know the individual sea turtles we track. Each has a unique story and journey.
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
                placeholder="Search by name or species..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-72"
              />
            </div>
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
          </motion.div>
        </div>
      </section>

      {/* Turtles Grid */}
      <section className="py-12">
        <div className="container">
          {filteredTurtles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTurtles.map((turtle) => (
                <TurtleCard key={turtle.id} turtle={turtle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No turtles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
