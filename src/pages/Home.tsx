import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Shell, 
  Users, 
  AlertTriangle, 
  ArrowRight,
  Waves,
  Anchor,
  Fish,
  Trash2,
  Ship
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TurtleCard } from '@/components/TurtleCard';
import { StatCard } from '@/components/StatCard';
import { turtles, stats } from '@/data/mockData';

const threats = [
  {
    icon: Trash2,
    title: 'Plastic Pollution',
    description: 'Over 100 million marine animals are killed annually by plastic debris.',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  {
    icon: Fish,
    title: 'Fishing Nets',
    description: 'Ghost nets and bycatch claim thousands of sea turtles each year.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: Ship,
    title: 'Boat Strikes',
    description: 'Vessel collisions cause severe injuries and deaths to sea turtles.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Waves,
    title: 'Climate Change',
    description: 'Rising temperatures affect nest success and sex ratios.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
];

export default function Home() {
  const featuredTurtles = turtles.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 hero-gradient" />
        
        {/* Animated bubbles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white/10 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                bottom: '-20px',
              }}
              animate={{
                y: [0, -800],
                opacity: [0, 0.6, 0],
                scale: [1, 1.5, 0.5],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Wave pattern */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 320" fill="none" className="w-full">
            <path
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>

        <div className="container relative z-10 pt-32 pb-48 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
              <Shell className="w-4 h-4" />
              Protecting Sea Turtles Worldwide
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
          >
            Track & Protect
            <br />
            <span className="text-seafoam">Sea Turtles</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
          >
            Join our mission to monitor and protect endangered sea turtles through 
            advanced satellite tracking and community-driven conservation efforts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/track">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                <MapPin className="w-5 h-5 mr-2" />
                Track Turtles
              </Button>
            </Link>
            <Link to="/education">
              <Button size="lg" variant="ghost" className="text-lg px-8 py-6 text-white border-white/30 hover:bg-white/10">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 -mt-20 relative z-10">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <StatCard 
              label="Turtles Tracked" 
              value={stats.totalTurtles} 
              icon={Shell}
              variant="primary"
              delay={0}
            />
            <StatCard 
              label="Active Now" 
              value={stats.activeTurtles} 
              icon={MapPin}
              trend={{ value: 12, positive: true }}
              delay={0.1}
            />
            <StatCard 
              label="Nesting Beaches" 
              value={stats.nestingBeaches} 
              icon={Anchor}
              delay={0.2}
            />
            <StatCard 
              label="Volunteers" 
              value={stats.volunteersActive} 
              icon={Users}
              variant="secondary"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Featured Turtles */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">Meet Our Turtles</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">Featured Travelers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow the journeys of our tagged sea turtles as they navigate the world's oceans.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTurtles.map((turtle, index) => (
              <TurtleCard key={turtle.id} turtle={turtle} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/turtles">
              <Button variant="outline" size="lg">
                View All Turtles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Threats Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-coral font-medium text-sm uppercase tracking-wider flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Why We Act
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">Threats They Face</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sea turtles have survived for over 100 million years, but today they face unprecedented challenges.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {threats.map((threat, index) => (
              <motion.div
                key={threat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center group hover:shadow-ocean transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl ${threat.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <threat.icon className={`w-8 h-8 ${threat.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{threat.title}</h3>
                <p className="text-sm text-muted-foreground">{threat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="ocean-gradient rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <Shell className="w-12 h-12 mx-auto mb-6 animate-float" />
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                Join the Conservation Effort
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                Every action counts. Help us protect these ancient mariners for future generations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/track">
                  <Button size="lg" variant="secondary" className="text-lg">
                    Start Tracking
                  </Button>
                </Link>
                <Link to="/education">
                  <Button size="lg" variant="ghost" className="text-lg text-white border-white/30 hover:bg-white/10">
                    Get Involved
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
