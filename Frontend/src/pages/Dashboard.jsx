import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { motion } from 'framer-motion';
import { CheckSquare, Clock, AlertCircle } from 'lucide-react';
import Sidebar from '../components/dashboard-components/sideBar';
import DashboardNav from '../components/dashboard-components/DashboardNav';
import Navbar from '../components/home-components/Navbar';
import StatsCard from '../components/dashboard-components/StatsCard';
import PriorityChart from  '../components/dashboard-components/PriorityChart'
import RecentActivity from '../components/dashboard-components/RecentActivity'
import CompletionProgress from '../components/dashboard-components/CompletionProgress'
import AddTaskModal from '../components/tasks/AddTaskModal';
import EditTaskModal from '../components/tasks/EditTaskModel';
import ViewTaskModal from '../components/tasks/ViewTaskModal';
import DeleteTaskModal from '../components/tasks/DeleteTaskModal';

// TODO: Uncomment and implement your API service
// import { taskApi } from '../services/api';
import TaskGrid from '../components/tasks/TaskGrid';
import CreateTask from '../components/dashboard-components/CreateTask';

import axiosInstance from '../../utils/axiosInstance'

import { API_PATHS } from '../../utils/apiPath';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(API_PATHS.TASK.GETALL);
      console.log("API Response:", res.data);
      
      // Backend returns { success: true, tasks: [...] }
      const result = res.data.tasks || [];
      setTasks(Array.isArray(result) ? result : []);
      console.log("Tasks loaded:", result);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      console.error("Error response:", error.response?.data);
      toast.error("Failed to load tasks");
      setTasks([]);  // Set to empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks based on active tab and search query
  useEffect(() => {
    let filtered = tasks;

    // Filter by tab
    if (activeTab === 'completed') {
      filtered = filtered.filter((task) => task.completed);
    } else if (activeTab === 'pending') {
      filtered = filtered.filter((task) => !task.completed);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, activeTab, searchQuery]);

  // Create task
  const handleCreateTask = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post(API_PATHS.TASK.CREATE, data);
      
      if (response.data) {
        toast.success('Task created successfully!');
        setIsAddModalOpen(false);
        await fetchTasks(); // Wait for tasks to refresh
      }
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error(error.response?.data?.message || 'Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update task
  const handleUpdateTask = async (taskId, data) => {
    try {
      setIsSubmitting(true);
      console.log('Updating task:', taskId, data);
      const response = await axiosInstance.put(API_PATHS.TASK.UPDATE(taskId), data);
      console.log('Update response:', response.data);
      
      if (response.data) {
        toast.success('Task updated successfully!');
        setIsEditModalOpen(false);
        setSelectedTask(null);
        await fetchTasks(); // Wait for tasks to refresh
      }
    } catch (error) {
      console.error('Error updating task:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to update task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete task
  const handleDeleteTask = async () => {
    if (!taskToDelete) return;

    try {
      setIsSubmitting(true);
      console.log('Deleting task:', taskToDelete);
      const response = await axiosInstance.delete(API_PATHS.TASK.DELETE(taskToDelete));
      console.log('Delete response:', response.data);
      
      if (response.data) {
        toast.success('Task deleted successfully!');
        setIsDeleteModalOpen(false);
        setTaskToDelete(null);
        await fetchTasks(); // Wait for tasks to refresh
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to delete task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleView = (task) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  const handleDelete = (id) => {
    setTaskToDelete(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="flex min-h-screen p-5  w-full bg-background">
       <Toaster/>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex flex-col min-h-screen ">
        <DashboardNav
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNewTask={() => setIsAddModalOpen(true)}
        />

        <main className="flex-1 p-3 sm:p-4  lg:p-6 xl:p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 sm:mb-6 lg:mb-8"
          >
           {activeTab === 'dashboard' ? (
 

  <CreateTask/>

) : (
  <h1 className="text-xl mt-7 md:mt-[-10px]  sm:text-2xl  lg:text-3xl xl:text-4xl font-bold text-foreground mb-1">
    {activeTab === 'all'
      ? 'All Tasks'
      : activeTab === 'completed'
      ? 'Completed Tasks'
      : activeTab === 'pending'
      ? 'Pending Tasks'
  :''}
  </h1>
)}

            <p className="text-xs sm:text-sm text-muted-foreground">
              {activeTab === 'dashboard'
                ? ''
                : activeTab === 'all'
                ? 'Manage and organize all your tasks'
                : activeTab === 'completed'
                ? 'View all completed tasks'
                : activeTab === 'pending'
                ? 'Tasks that need your attention'
                : ''}
            </p>
          </motion.div>

          {activeTab === 'settings' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card p-8 rounded-2xl shadow-card"
            >
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p className="text-muted-foreground">Settings panel coming soon...</p>
            </motion.div>
          ) : isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Stats Cards - Show on Dashboard and All Tasks */}
              {(activeTab === 'dashboard' || activeTab === 'all') && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 xl:gap-6 mb-4 sm:mb-6 lg:mb-8">
                  <StatsCard
                    title="Total Tasks"
                    value={tasks.length}
                    subtitle="All tasks in system"
                    icon={CheckSquare}
                    gradient="bg-gray-700"
                    trend={{ value: '12%', isPositive: true }}
                    index={0}
                  />
                  <StatsCard
                    title="Completed"
                    value={tasks.filter(t => t.completed).length}
                    subtitle="Successfully finished"
                    icon={CheckSquare}
                    gradient="bg-emerald-400"
                    trend={{ value: '8%', isPositive: true }}
                    index={1}
                  />
                  <StatsCard
                    title="Pending"
                    value={tasks.filter(t => !t.completed).length}
                    subtitle="Awaiting completion"
                    icon={Clock}
                    gradient="bg-amber-300"
                    trend={{ value: '3%', isPositive: false }}
                    index={2}
                  />
                  <StatsCard
                    title="High Priority"
                    value={tasks.filter(t => t.priority === 'High').length}
                    subtitle="Urgent tasks"
                    icon={AlertCircle}
                    gradient="bg-rose-400"
                    trend={{ value: '5%', isPositive: false }}
                    index={3}
                  />
                </div>
              )}

              {/* Dashboard View - Show Charts and Analytics */}
              {activeTab === "dashboard" && (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-10">
    {/* Completion Progress */}
    <div className="flex flex-col h-full">
      <CompletionProgress tasks={tasks} />
    </div>

    {/* Priority Distribution */}
    <div className="flex flex-col h-full">
      <PriorityChart tasks={tasks} />
    </div>

    {/* Recent Activity */}
    <div className="flex flex-col h-full">
      <RecentActivity tasks={tasks} />
    </div>
  </div>
)}


              {/* Tasks Section */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 lg:mb-6 gap-2 sm:gap-0">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                    {activeTab === 'dashboard' ? 'Recent Tasks' : 'Tasks'}
                  </h2>
                  {filteredTasks.length > 0 && (
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                      Showing {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
                
                <TaskGrid
                  tasks={activeTab === 'dashboard' ? filteredTasks.slice(0, 6) : filteredTasks}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onView={handleView}
                  onNewTask={() => setIsAddModalOpen(true)}
                />
              </div>
            </>
          )}
        </main>
      </div>

      {/* Modals */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(data)=>handleCreateTask(data)}
        isLoading={isSubmitting}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        task={selectedTask}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
        }}
        onSubmit={(taskId,data)=>handleUpdateTask(taskId,data)}
        isLoading={isSubmitting}
      />

      <ViewTaskModal
        isOpen={isViewModalOpen}
        task={selectedTask}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedTask(null);
        }}
      />

      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleDeleteTask}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default Index;
