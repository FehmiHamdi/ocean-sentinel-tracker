import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Users, Shell, AlertTriangle, ArrowRight } from 'lucide-react';
import { Beach } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BeachCardProps {
  beach: Beach;
}

const threatColors = {
  low: 'bg-green-500/20 text-green-700 border-green-500/30',
  medium: 'bg-amber-500/20 text-amber-700 border-amber-500/30',
  high: 'bg-red-500/20 text-red-700 border-red-500/30',
};

export function BeachCard({ beach }: BeachCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/beaches/${beach.id}`}>
        <div className="glass-card rounded-2xl overflow-hidden group cursor-pointer h-full">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={beach.image} 
              alt={beach.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Threat badge */}
            <div className="absolute top-4 right-4">
              <Badge variant="outline" className={cn("capitalize border", threatColors[beach.threatLevel])}>
                <AlertTriangle className="w-3 h-3 mr-1" />
                {beach.threatLevel} threat
              </Badge>
            </div>

            {/* Location overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="font-display text-xl font-semibold text-white">{beach.name}</h3>
              <p className="text-sm text-white/80 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {beach.country}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{beach.nestCount}</p>
                  <p className="text-xs text-muted-foreground">Active Nests</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{beach.volunteers}</p>
                  <p className="text-xs text-muted-foreground">Volunteers</p>
                </div>
              </div>
            </div>

            {/* Threats */}
            <div className="space-y-2 mb-4">
              <p className="text-xs text-muted-foreground">Main Threats:</p>
              <div className="flex flex-wrap gap-1">
                {beach.threats.slice(0, 3).map((threat) => (
                  <span key={threat} className="text-xs bg-muted px-2 py-1 rounded-full">
                    {threat}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Latest Activity:</p>
              <p className="text-sm line-clamp-1">{beach.recentActivity[0]?.event}</p>
              <span className="text-sm font-medium text-primary flex items-center gap-1 mt-2 group-hover:gap-2 transition-all">
                View Details <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
