import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BeachCard } from '@/components/BeachCard';
import { TurtleMap } from '@/components/TurtleMap';
import { beaches, turtles } from '@/data/mockData';

export default function BeachesPage() {
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
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">Conservation Sites</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
              Nesting Beaches
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the critical nesting sites where sea turtles return to lay their eggs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="py-8">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <TurtleMap
              turtles={[]}
              beaches={beaches}
              showTrails={false}
              center={[10, -30]}
              zoom={2}
              className="h-[400px] shadow-ocean rounded-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Beaches Grid */}
      <section className="py-12">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beaches.map((beach) => (
              <BeachCard key={beach.id} beach={beach} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
