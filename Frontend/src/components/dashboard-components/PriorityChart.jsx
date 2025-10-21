import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

 function PriorityChart({ tasks = [] }) {
  const priorityCounts = {
    High: tasks.filter((t) => t.priority === "High").length,
    Medium: tasks.filter((t) => t.priority === "Medium").length,
    Low: tasks.filter((t) => t.priority === "Low").length,
  };

  const total = tasks.length || 1;
  const percentages = {
    High: (priorityCounts.High / total) * 100,
    Medium: (priorityCounts.Medium / total) * 100,
    Low: (priorityCounts.Low / total) * 100,
  };

  const priorityData = [
    {
      label: "High Priority",
      count: priorityCounts.High,
      percentage: percentages.High,
      color: "bg-red-500",
      lightColor: "bg-red-500/15",
    },
    {
      label: "Medium Priority",
      count: priorityCounts.Medium,
      percentage: percentages.Medium,
      color: "bg-amber-400",
      lightColor: "bg-amber-400/15",
    },
    {
      label: "Low Priority",
      count: priorityCounts.Low,
      percentage: percentages.Low,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-500/15",
    },
  ];

  return (
    <Card className="p-4 sm:p-6 shadow-md border-0 bg-background/80 backdrop-blur-md transition-smooth h-full flex flex-col">
      {/* Title - Fixed Height */}
      <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-foreground mb-4 sm:mb-6 flex-shrink-0">
        Priority Distribution
      </h3>

      {/* Bars - Flexible Middle */}
      <div className="space-y-3 sm:space-y-4 flex-grow">
        {priorityData.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <span className="text-xs sm:text-sm font-medium text-foreground truncate">
                {item.label}
              </span>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-xs sm:text-sm font-semibold text-foreground">
                  {item.count}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({item.percentage.toFixed(0)}%)
                </span>
              </div>
            </div>

            <div
              className={`h-2 sm:h-3 rounded-full overflow-hidden ${item.lightColor}`}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                className={`h-full ${item.color} rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer - Fixed at Bottom */}
      <div className="mt-5 sm:mt-6 pt-4 sm:pt-6 border-t border-border/50 flex-shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium text-muted-foreground">
            Total Tasks
          </span>
          <span className="text-lg sm:text-xl lg:text-2xl font-extrabold bg-gradient-primary bg-clip-text text-transparent">
            {total}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default PriorityChart