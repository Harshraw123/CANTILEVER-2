import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, Flag, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const priorityConfig = {
  High: { color: 'bg-destructive text-destructive-foreground', icon: Flag },
  Medium: { color: 'bg-warning text-warning-foreground', icon: Flag },
  Low: { color: 'bg-success text-success-foreground', icon: Flag },
};

export default function ViewTaskModal({ isOpen, task, onClose }) {
  if (!task) return null;

  const priorityStyle = priorityConfig[task.priority];
  const PriorityIcon = priorityStyle.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white border-border p-6 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Task Details
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 mt-4"
        >
          {/* Title and Badges */}
          <div>
            <h3 className="text-2xl font-bold text-card-foreground mb-2">
              {task.title}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={priorityStyle.color}>
                <PriorityIcon className="w-3 h-3 mr-1" />
                {task.priority} Priority
              </Badge>
              <Badge variant={task.completed ? 'default' : 'secondary'}>
                {task.completed ? (
                  <>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </>
                ) : (
                  <>
                    <XCircle className="w-3 h-3 mr-1" />
                    Pending
                  </>
                )}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
    Description
  </h4>
  <p className="text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
    {task.description}
  </p>
</div>


          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">Due Date</span>
              </div>
              <p className="text-card-foreground font-medium">
                {format(new Date(task.dueDate), 'MMMM dd, yyyy')}
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className=" shadow-sm rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <CheckCircle className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="font-medium text-card-foreground mb-1">Task ID</p>
                <p className="text-sm text-muted-foreground font-mono truncate">{task._id}</p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={onClose}
              className="bg-amber-400 hover:bg-amber-500 text-white hover:opacity-90 rounded-full px-6 py-2 transition-opacity"
            >
              Close
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
