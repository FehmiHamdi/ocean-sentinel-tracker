import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Activity, Thermometer, ArrowRight } from 'lucide-react';
import { Turtle } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TurtleCardProps {
  turtle: Turtle;
  featured?: boolean;
}

const statusColors = {
  active: 'bg-green-500/20 text-green-700 border-green-500/30',
  nesting: 'bg-amber-500/20 text-amber-700 border-amber-500/30',
  migrating: 'bg-blue-500/20 text-blue-700 border-blue-500/30',
  resting: 'bg-gray-500/20 text-gray-700 border-gray-500/30',
};

const threatColors = {
  low: 'bg-green-500',
  medium: 'bg-amber-500',
  high: 'bg-red-500',
};

export function TurtleCard({ turtle, featured = false }: TurtleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/turtles/${turtle.id}`}>
        <div className={cn(
          "glass-card rounded-2xl overflow-hidden group cursor-pointer",
          featured && "lg:flex"
        )}>
          {/* Image */}
          <div className={cn(
            "relative overflow-hidden",
            featured ? "lg:w-1/2 h-64 lg:h-auto" : "h-48"
          )}>
            <img 
              src={turtle.image} 
              alt={turtle.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Status badge */}
            <div className="absolute top-4 left-4">
              <Badge variant="outline" className={cn("capitalize border", statusColors[turtle.status])}>
                {turtle.status}
              </Badge>
            </div>

            {/* Threat indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="text-xs text-white/80">Threat</span>
              <div className={cn("w-3 h-3 rounded-full", threatColors[turtle.threatLevel])} />
            </div>

            {/* Name overlay */}
            <div className="absolute bottom-4 left-4">
              <h3 className="font-display text-2xl font-semibold text-white">{turtle.name}</h3>
              <p className="text-sm text-white/80">{turtle.species}</p>
            </div>
          </div>

          {/* Content */}
          <div className={cn("p-5", featured && "lg:w-1/2 lg:p-8")}>
            {featured && (
              <p className="text-muted-foreground mb-4 line-clamp-2">{turtle.description}</p>
            )}
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs">Location</span>
                </div>
                <p className="text-sm font-medium truncate">
                  {turtle.location.lat.toFixed(2)}°, {turtle.location.lng.toFixed(2)}°
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Thermometer className="w-4 h-4" />
                  <span className="text-xs">Temp</span>
                </div>
                <p className="text-sm font-medium">{turtle.temperature}°C</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Activity className="w-4 h-4" />
                  <span className="text-xs">Speed</span>
                </div>
                <p className="text-sm font-medium">{turtle.speed} km/h</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Last seen: {new Date(turtle.lastSeen).toLocaleDateString()}
              </span>
              <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                View Profile <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
