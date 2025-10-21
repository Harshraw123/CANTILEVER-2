import Task from "../models/TaskModel.js";

// ✅ Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;

    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      completed: completed === 'Yes' || completed === true,
      owner: req.user.id,
    });

    const saved = await task.save();
    res.status(201).json({ success: true, task: saved });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Get All Tasks
export const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Single Task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
    try {
      // Spread body into data object
      const data = { ...req.body };
  
      // Completed field ko normalize kar rahe hain (Yes/true → boolean true)
      data.completed = data.completed === 'yes' || data.completed === true;
  
      // Find and update task
      const updated = await Task.findOneAndUpdate(
        { _id: req.params.id, owner: req.user.id }, // filter
        data,                                       // update data
        { new: true, runValidators: true }          // options kyoki by default old document return hota toh mongodb ko hum kah rhe new document do and validator run krake

      );
  
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
  
      res.json({ success: true, task: updated });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

  //delete task

// Delete task
export const deleteTask = async (req, res) => {
    try {
      const deleted = await Task.findOneAndDelete({
        _id: req.params.id,
        owner: req.user.id,
      });
  
      if (!deleted) {
        return res
          .status(404)
          .json({ success: false, message: "Task not found or already deleted" });
      }
  
      res.json({ success: true, message: "Task deleted successfully", task: deleted });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  