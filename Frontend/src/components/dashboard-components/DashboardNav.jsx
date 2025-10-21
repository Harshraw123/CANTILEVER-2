import { Search, Plus, Bell, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '../../hooks/useAuth';

function DashboardNav({ searchQuery, onSearchChange, onNewTask }) {
  const { logout } = useAuth();

  return (
    <header className="h-14 sm:h-16 w-full max-w-full hidden md:flex items-center justify-between px-3 sm:px-4 lg:px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      {/* Search Section */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-xl">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 sm:pl-10 h-8 sm:h-10 bg-background focus:ring-black text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
        {/* New Task Button */}
        <Button
          onClick={onNewTask}
          size="sm"
          className="bg-[linear-gradient(60deg,#29323c_0%,#485563_100%)] text-white text-center hover:opacity-90 rounded-full shadow-md h-8 sm:h-10 sm:ml-2 px-2 sm:px-4"
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">New Task</span>
        </Button>

       

        {/* User Dropdown with only Logout */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full h-8 w-8 sm:h-10 sm:w-10 p-0">
              <Avatar className="h-7 w-7 sm:h-9 sm:w-9">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs sm:text-sm">
                  <User className="w-3 h-3 sm:w-5 sm:h-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-36 sm:w-40 bg-white">
            <DropdownMenuItem
              onClick={logout}
              className="text-xs sm:text-sm text-destructive font-medium cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default DashboardNav;
