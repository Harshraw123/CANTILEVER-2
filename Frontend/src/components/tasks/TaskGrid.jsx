import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList } from 'lucide-react';
import TaskCard from './TaskCard';
import { Button } from '@/components/ui/button';

export default function TaskGrid({ tasks, onEdit, onDelete, onView, onNewTask }) {
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] text-center px-4"
      >
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-primary rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-glow">
          <ClipboardList className="w-12 h-12 sm:w-16 sm:h-16 text-primary-foreground" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">No Tasks Found</h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-md px-4">
          You don't have any tasks yet. Create your first task to get started with organizing your work.
        </p>
        <Button 
          onClick={onNewTask}
          className="bg-gradient-primary text-primary-foreground hover:opacity-90 rounded-full shadow-md text-sm sm:text-base px-6 py-2 sm:px-8 sm:py-3"
        >
          Create Your First Task
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 xs:gap-3.5 sm:gap-4 md:gap-5 lg:gap-6 auto-rows-fr">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}