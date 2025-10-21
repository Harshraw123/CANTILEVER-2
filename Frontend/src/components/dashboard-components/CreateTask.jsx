import React from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateTask = ({ searchQuery, onSearchChange, onNewTask }) => {
  return (
    <div className="flex sm:hidden flex-col sm:flex-row items-center justify-between gap-3 w-full p-8 mt-3 sm:mt-5">
      {/* Search Input */}
      <div className="relative flex-1 w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9 sm:h-10 bg-background text-sm sm:text-base focus-visible:ring-1 focus-visible:ring-ring transition-smooth w-full"
        />
      </div>

      {/* New Task Button */}
      <Button
        onClick={onNewTask}
        size="sm"
        className="bg-[linear-gradient(60deg,#29323c_0%,#485563_100%)] text-white hover:opacity-90 rounded-full shadow-md h-9 sm:h-10 px-4 sm:px-5 w-full sm:w-auto flex items-center justify-center transition-all mt-2 sm:mt-0"

      >
        <Plus className="w-4 h-4 sm:mr-2" />
        <span className="">New Task</span>
      </Button>
    </div>
  );
};

export default CreateTask;
