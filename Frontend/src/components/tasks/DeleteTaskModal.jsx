import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';


export default function DeleteTaskModal({ isOpen, onClose, onConfirm, isLoading }) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      {/*
        The className on AlertDialogContent (bg-white border-border)
        is already set up by the Shadcn UI component, but leaving it
        if you need to override the default.
      */}
      <AlertDialogContent className="bg-white border-border">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <AlertDialogHeader>
            {/* Replaced 'mb-2' on the div with 'space-x-3' to better control gap. 
              Also removed redundant 'bg-white' from the inner div if it's already on the content. 
            */}
            <div className="flex items-center space-x-3 mb-2">
              {/*
                The inner div: The W-12 H-12 bg-white rounded-full flex items-center justify-center 
                is standard Tailwind. Keeping it as is.
              */}
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              {/* AlertDialogTitle and Description are using standard Tailwind/Shadcn classes. 
                Keeping them as is.
              */}
              <AlertDialogTitle className="text-xl font-bold">
                Delete Task?
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-muted-foreground">
              This action cannot be undone. This will permanently delete the task and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <AlertDialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            {/*
              The className on the destructive button (bg-destructive text-destructive-foreground hover:bg-destructive/90) 
              is redundant because the variant="destructive" prop on the Shadcn Button component 
              already applies those styles. Removing it for cleaner code.
            */}
            <Button
              className='bg-red-500  hover:bg-red-600'
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete Task'}
            </Button>
          </AlertDialogFooter>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  );
}