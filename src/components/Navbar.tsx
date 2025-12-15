import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  Shell, 
  Map, 
  GraduationCap, 
  Waves, 
  LayoutDashboard,
  Menu,
  X,
  LogIn,
  LogOut,
  Heart,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const publicNavLinks = [
  { href: '/', label: 'Home', icon: Shell },
  { href: '/track', label: 'Track Turtles', icon: Map },
  { href: '/turtles', label: 'Turtle Profiles', icon: Shell },
  { href: '/beaches', label: 'Nesting Beaches', icon: Waves },
  { href: '/education', label: 'Learn', icon: GraduationCap },
];

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, isVolunteer, logout } = useAuth();

  // Build nav links based on auth state
  const navLinks = [
    ...publicNavLinks,
    ...(isAdmin ? [{ href: '/admin', label: 'Admin', icon: LayoutDashboard }] : []),
    ...(isVolunteer ? [{ href: '/volunteer', label: 'My Dashboard', icon: Heart }] : []),
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="glass-card mx-4 mt-4 rounded-2xl px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl ocean-gradient flex items-center justify-center">
                <Shell className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-lg font-semibold text-foreground">TurtleTrack</h1>
              <p className="text-xs text-muted-foreground -mt-1">Protecting Marine Life</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Auth Buttons */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border/50">
              {user ? (
                <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <>
                  <Link to="/admin/login">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Shield className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                  <Link to="/volunteer/login">
                    <Button size="sm">
                      <Heart className="w-4 h-4 mr-2" />
                      Volunteer
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 border-t border-border/50 mt-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  );
                })}

                {/* Mobile Auth Links */}
                <div className="border-t border-border/50 mt-2 pt-2">
                  {user ? (
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground w-full"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout ({user.username})
                    </button>
                  ) : (
                    <>
                      <Link
                        to="/admin/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      >
                        <Shield className="w-5 h-5" />
                        Admin Login
                      </Link>
                      <Link
                        to="/volunteer/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-primary bg-primary/10"
                      >
                        <Heart className="w-5 h-5" />
                        Volunteer Login
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
