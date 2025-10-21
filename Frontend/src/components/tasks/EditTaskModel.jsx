import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export default function EditTaskModal({
  isOpen,
  task,
  onClose,
  onSubmit,
  isLoading,
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    completed: false,
  });

  // ✅ Load task data into form when opened
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'Medium',
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split('T')[0]
          : '',
        completed: task.completed || false,
      });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      onSubmit(task._id, formData);
    }
  };

  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800 text-center sm:text-left">
            ✏️ Edit Task
          </DialogTitle>
        </DialogHeader>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-5 mt-4"
        >
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="edit-title" className="text-sm font-medium text-gray-700">
              Task Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-title"
              placeholder="Enter task title..."
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="bg-gray-50 focus-visible:ring-blue-300"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="edit-description" className="text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="edit-description"
              placeholder="Enter task description..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              required
              className="bg-gray-50 resize-none focus-visible:ring-blue-300"
            />
          </div>

          {/* Priority + Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-priority" className="text-sm font-medium text-gray-700">
                Priority
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger id="edit-priority" className="bg-gray-50">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-dueDate" className="text-sm font-medium text-gray-700">
                Due Date
              </Label>
              <Input
                id="edit-dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                required
                className="bg-gray-50 focus-visible:ring-blue-300"
              />
            </div>
          </div>

          {/* Completed Switch */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
            <div className="space-y-0.5">
              <Label
                htmlFor="edit-completed"
                className="text-sm font-medium text-gray-800"
              >
                Mark as Completed
              </Label>
              <p className="text-xs text-gray-500">
                Toggle to mark task status.
              </p>
            </div>
            <Switch
              id="edit-completed"
              checked={formData.completed}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, completed: checked })
              }
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 hover:bg-gray-100"
              disabled={isLoading}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Task'}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}
