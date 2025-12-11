import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: 'default' | 'primary' | 'secondary';
  delay?: number;
}

const variants = {
  default: 'bg-card',
  primary: 'ocean-gradient text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
};

export function StatCard({ label, value, icon: Icon, trend, variant = 'default', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={cn(
        "rounded-2xl p-6 shadow-ocean transition-all hover:scale-105",
        variants[variant]
      )}>
        <div className="flex items-start justify-between">
          <div>
            <p className={cn(
              "text-sm mb-1",
              variant === 'default' ? 'text-muted-foreground' : 'opacity-80'
            )}>
              {label}
            </p>
            <p className="text-3xl font-bold">{value.toLocaleString()}</p>
            {trend && (
              <p className={cn(
                "text-sm mt-1 flex items-center gap-1",
                trend.positive ? 'text-green-500' : 'text-red-500'
              )}>
                {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </p>
            )}
          </div>
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            variant === 'default' ? 'bg-primary/10' : 'bg-white/20'
          )}>
            <Icon className={cn(
              "w-6 h-6",
              variant === 'default' ? 'text-primary' : 'text-inherit'
            )} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
