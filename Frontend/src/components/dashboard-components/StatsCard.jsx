import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

export default function StatsCard({ title, value, subtitle, icon: Icon, gradient, trend, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="relative mt-4  p-4 overflow-hidden  border-0 shadow-md   hover:shadow-card-hover transition-all duration-300 group">
        <div className={`absolute inset-0 opacity-5 ${gradient}`} />
        
        <div className="relative p-3 sm:p-4 lg:p-6">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            {/*  Corrected: use Icon (capitalized) */}
            <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />}
            </div>

            {trend && (
              <div
                className={`text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                  trend.isPositive
                    ? 'bg-success/10 text-success'
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                {trend.isPositive ? '↗' : '↘'} {trend.value}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 truncate">{title}</p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1">{value}</p>
            <p className="text-xs text-muted-foreground line-clamp-2">{subtitle}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
