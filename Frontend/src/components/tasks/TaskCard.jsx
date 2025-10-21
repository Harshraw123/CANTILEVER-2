import { motion } from 'framer-motion';
import { Calendar, Edit2, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const priorityConfig = {
  High: { color: 'bg-red-500 text-white', label: 'High Priority' },
  Medium: { color: 'bg-yellow-500 text-white', label: 'Medium Priority' },
  Low: { color: 'bg-green-500 text-white', label: 'Low Priority' },
};

export default function TaskCard({ task, onEdit, onDelete, onView }) {
  const priorityStyle = priorityConfig[task.priority];
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="w-full h-full"
    >
      <Card className="p-3 xs:p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white hover:bg-gray-50 group h-full flex flex-col">
        <div className="flex flex-col h-full">
          {/* Header - Fixed Height Section */}
          <div className="flex items-start justify-between gap-2 xs:gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900 break-words transition-colors leading-tight line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                {task.title}
              </h3>
              <p className="text-xs xs:text-sm sm:text-base text-gray-600 line-clamp-2 mt-1 sm:mt-1.5 break-words leading-relaxed min-h-[2.5rem] sm:min-h-[3rem]">
                {task.description}
              </p>
            </div>
            <Badge className={`${priorityStyle.color} text-[10px] xs:text-xs sm:text-sm px-1.5 py-0.5 xs:px-2 xs:py-1 sm:px-2.5 sm:py-1 whitespace-nowrap shrink-0 h-fit`}>
              {task.priority}
            </Badge>
          </div>

          {/* Spacer to push content to bottom */}
          <div className="flex-grow"></div>

          {/* Metadata - Fixed at Bottom */}
          <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3 sm:gap-4 text-xs xs:text-sm text-gray-600 mb-3 sm:mb-4">
            <div className="flex items-center gap-1.5 xs:gap-2">
              <Calendar className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-gray-500 shrink-0" />
              <span className="whitespace-nowrap">{format(new Date(task.dueDate), 'dd MMM, yyyy')}</span>
            </div>
            <Badge 
              variant={task.completed ? 'default' : 'secondary'} 
              className="text-[10px] xs:text-xs sm:text-sm w-fit px-2 py-0.5 xs:px-2.5 xs:py-1"
            >
              {task.completed ? '✓ Completed' : '○ Pending'}
            </Badge>
          </div>

          {/* Actions - Fixed at Bottom */}
          <div className="grid grid-cols-3 gap-1 xs:gap-1.5 sm:gap-2 md:gap-3 pt-2 sm:pt-3 border-t border-gray-200 mt-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView(task)}
              className="hover:bg-blue-50 hover:text-amber-500 text-[10px] xs:text-xs sm:text-sm h-7 xs:h-8 sm:h-9 md:h-10 px-1 xs:px-2 sm:px-3 flex items-center justify-center gap-1 xs:gap-1.5"
            >
              <Eye className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="hidden xs:inline truncate">View</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="hover:bg-blue-50 hover:text-blue-600 text-[10px] xs:text-xs sm:text-sm h-7 xs:h-8 sm:h-9 md:h-10 px-1 xs:px-2 sm:px-3 flex items-center justify-center gap-1 xs:gap-1.5"
            >
              <Edit2 className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="hidden xs:inline truncate">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task._id)}
              className="hover:bg-red-50 hover:text-red-600 text-[10px] xs:text-xs sm:text-sm h-7 xs:h-8 sm:h-9 md:h-10 px-1 xs:px-2 sm:px-3 flex items-center justify-center gap-1 xs:gap-1.5"
            >
              <Trash2 className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="hidden xs:inline truncate">Delete</span>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}