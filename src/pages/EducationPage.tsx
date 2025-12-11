import { motion } from 'framer-motion';
import { 
  Shell, 
  Heart, 
  Waves, 
  Sun, 
  Moon, 
  Compass,
  AlertTriangle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { speciesInfo } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const lifeCycleStages = [
  {
    stage: 'Egg',
    duration: '45-70 days',
    description: 'Female turtles lay 100-200 eggs in nests dug on sandy beaches.',
    icon: Sun,
  },
  {
    stage: 'Hatchling',
    duration: '0-1 year',
    description: 'Baby turtles emerge at night and race to the ocean, guided by moonlight.',
    icon: Moon,
  },
  {
    stage: 'Juvenile',
    duration: '1-10 years',
    description: 'Young turtles spend years in the open ocean, growing and developing.',
    icon: Waves,
  },
  {
    stage: 'Adult',
    duration: '10-50+ years',
    description: 'Mature turtles migrate vast distances to feed and return to nest.',
    icon: Compass,
  },
];

const helpActions = [
  {
    title: 'Reduce Plastic Use',
    description: 'Sea turtles often mistake plastic bags for jellyfish, their favorite food.',
    icon: '🛍️',
  },
  {
    title: 'Support Conservation',
    description: 'Donate to or volunteer with sea turtle conservation organizations.',
    icon: '💚',
  },
  {
    title: 'Choose Sustainable Seafood',
    description: 'Support fisheries that use turtle-safe practices.',
    icon: '🐟',
  },
  {
    title: 'Reduce Beach Lighting',
    description: 'Artificial lights disorient hatchlings trying to reach the ocean.',
    icon: '💡',
  },
  {
    title: 'Report Sightings',
    description: 'Help scientists by reporting turtle sightings and nesting activity.',
    icon: '📍',
  },
  {
    title: 'Spread Awareness',
    description: 'Share knowledge about sea turtle conservation with others.',
    icon: '📢',
  },
];

const statusColors: Record<string, string> = {
  'Critically Endangered': 'bg-red-500/20 text-red-700 border-red-500/30',
  'Endangered': 'bg-orange-500/20 text-orange-700 border-orange-500/30',
  'Vulnerable': 'bg-amber-500/20 text-amber-700 border-amber-500/30',
};

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-28 pb-16 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">Learn & Discover</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
              Understanding Sea Turtles
            </h1>
            <p className="text-muted-foreground text-lg">
              Sea turtles have graced our oceans for over 100 million years. Learn about these 
              incredible creatures and how you can help protect them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Species Section */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Sea Turtle Species</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              There are seven species of sea turtles in the world. All are considered threatened or endangered.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {speciesInfo.map((species, index) => (
              <motion.div
                key={species.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={species.image} 
                    alt={species.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className={cn("border", statusColors[species.status])}>
                      {species.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-display text-xl font-semibold text-white">{species.name}</h3>
                    <p className="text-sm text-white/70 italic">{species.scientific}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{species.description}</p>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Diet:</span> {species.diet}</p>
                    <p><span className="font-medium">Size:</span> {species.size}</p>
                    <p><span className="font-medium">Lifespan:</span> {species.lifespan}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Life Cycle */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">The Life Cycle</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sea turtles have a remarkable life cycle that spans decades and thousands of miles.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lifeCycleStages.map((stage, index) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {index < lifeCycleStages.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border z-0">
                    <ArrowRight className="absolute right-0 -top-2 w-4 h-4 text-muted-foreground" />
                  </div>
                )}
                <div className="glass-card rounded-2xl p-6 text-center relative z-10">
                  <div className="w-16 h-16 rounded-2xl ocean-gradient flex items-center justify-center mx-auto mb-4">
                    <stage.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{stage.stage}</h3>
                  <p className="text-sm text-secondary font-medium mb-3">{stage.duration}</p>
                  <p className="text-sm text-muted-foreground">{stage.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Endangered */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-coral font-medium text-sm uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Critical Situation
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-6">
                Why Are Sea Turtles Endangered?
              </h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Despite surviving the dinosaurs, sea turtles now face their greatest challenge: humans. 
                  Six of the seven species are classified as threatened or endangered.
                </p>
                <ul className="space-y-3">
                  {[
                    'Habitat destruction from coastal development',
                    'Plastic pollution and marine debris ingestion',
                    'Entanglement in fishing gear (bycatch)',
                    'Poaching of eggs and adults',
                    'Climate change affecting nesting beaches',
                    'Light pollution disorienting hatchlings',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-coral mt-2 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800"
                alt="Sea turtle swimming"
                className="rounded-3xl shadow-ocean"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Tracking Helps */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800"
                alt="Sea turtle with tracking tag"
                className="rounded-3xl shadow-ocean"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="text-secondary font-medium text-sm uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4" />
                Science in Action
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-6">
                How Tracking Helps Conservation
              </h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Satellite tracking technology has revolutionized sea turtle conservation, 
                  providing crucial data that helps protect these ancient mariners.
                </p>
                <ul className="space-y-3">
                  {[
                    'Identifies critical habitats and migration corridors',
                    'Reveals threats in specific ocean regions',
                    'Helps establish marine protected areas',
                    'Monitors population health and behavior',
                    'Engages the public in conservation efforts',
                    'Informs policy decisions and fishing regulations',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/track">
                  <Button className="mt-4">
                    Track Turtles Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How You Can Help */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider flex items-center justify-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Take Action
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
              How You Can Help
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every action counts. Here's how you can make a difference in sea turtle conservation.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center hover:shadow-ocean transition-all"
              >
                <span className="text-4xl mb-4 block">{action.icon}</span>
                <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
