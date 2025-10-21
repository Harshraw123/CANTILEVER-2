import { motion } from "framer-motion";
import { format } from "date-fns";
import { CheckCircle, Clock, Plus, Edit } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function RecentActivity({ tasks = [] }) {
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  const getActivityIcon = (task) => {
    if (task.completed) return CheckCircle;
    const createdDate = new Date(task.createdAt);
    const updatedDate = new Date(task.updatedAt);
    return Math.abs(createdDate - updatedDate) < 1000 ? Plus : Edit;
  };

  const getActivityColor = (task) => {
    if (task.completed) return "text-emerald-500 bg-emerald-500/15";
    const createdDate = new Date(task.createdAt);
    const updatedDate = new Date(task.updatedAt);
    return Math.abs(createdDate - updatedDate) < 1000
      ? "text-indigo-500 bg-indigo-500/15"
      : "text-amber-400 bg-amber-400/15";
  };

  const getActivityText = (task) => {
    if (task.completed) return "Completed";
    const createdDate = new Date(task.createdAt);
    const updatedDate = new Date(task.updatedAt);
    return Math.abs(createdDate - updatedDate) < 1000 ? "Created" : "Updated";
  };

  return (
    <Card className="p-4 sm:p-6 lg:p-8 border-0 shadow-md bg-background/80 backdrop-blur-md transition-smooth h-full flex flex-col">
      {/* Header - Fixed Height */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 flex-shrink-0">
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-foreground">
          Recent Activity
        </h3>
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
      </div>

      {/* Activity List - Flexible Middle with Fixed Height Container */}
      <div className="space-y-3 sm:space-y-4 flex-grow overflow-y-auto">
        {recentTasks.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-muted-foreground text-xs sm:text-sm flex items-center justify-center h-full">
            No recent activity
          </div>
        ) : (
          recentTasks.map((task, index) => {
            const ActivityIcon = getActivityIcon(task);
            const colorClass = getActivityColor(task);
            const activityText = getActivityText(task);

            return (
              <motion.div
                key={task._id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 sm:gap-3 group"
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${colorClass} flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}
                >
                  <ActivityIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1 sm:gap-2 mb-1">
                    <p className="text-xs sm:text-sm font-semibold text-foreground line-clamp-1 transition-colors group-hover:text-indigo-500">
                      {task.title}
                    </p>
                    <Badge
                      className="text-xs flex-shrink-0 text-white bg-[#3f3f46] px-1.5 py-0.5"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-xs text-muted-foreground">
                    <span>{activityText}</span>
                    <span>•</span>
                   
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </Card>
  );
}

export default RecentActivity