import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";

function CompletionProgress({ tasks = [] }) {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length || 1;
  const progress = (completed / total) * 100;
  const circumference = 2 * Math.PI * 68;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <Card className="p-6 bg-white/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-700/60">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Overall Progress</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Task completion</p>
        </div>
      </div>

      <div className="flex flex-col items-center py-4">
        <div className="relative w-36 h-36 mb-6">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="68"
              className="stroke-slate-200 dark:stroke-slate-700"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="72"
              cy="72"
              r="68"
              stroke="url(#lightGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="lightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#c4b5fd" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-semibold text-slate-900 dark:text-slate-100"
            >
              {Math.round(progress)}%
            </motion.span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 w-full max-w-xs">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Completed</p>
            <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{completed}</p>
          </div>
          
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Circle className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Remaining</p>
            <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{total - completed}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CompletionProgress;