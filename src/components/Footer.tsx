import { Link } from 'react-router-dom';
import { Shell, Twitter, Instagram, Facebook, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Wave decoration */}
      <div className="absolute top-0 left-0 right-0 h-20 -translate-y-full">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-full">
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="hsl(var(--primary))"
          />
        </svg>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <Shell className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold">TurtleTrack</h3>
                <p className="text-sm text-primary-foreground/70">Protecting Marine Life</p>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Dedicated to the conservation and protection of sea turtles worldwide through 
              advanced tracking technology and community engagement.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/20">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/20">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/20">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/20">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Track Turtles', 'Turtle Profiles', 'Nesting Beaches', 'Education', 'Get Involved'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  123 Ocean Drive<br />
                  Marine City, FL 33140
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span className="text-sm text-primary-foreground/80">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span className="text-sm text-primary-foreground/80">info@turtletrack.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Stay Updated</h4>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Subscribe to our newsletter for the latest updates on turtle conservation.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Your email" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button variant="secondary" className="shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © 2024 TurtleTrack. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
