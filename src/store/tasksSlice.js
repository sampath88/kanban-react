import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    setTasks: (state, action) => {
      const { tasks } = action.payload;
      state.tasks = tasks;
    },
    updateTaskStatus: (state, action) => {
      const { updatedTask } = action.payload;
      const tasks = state.tasks.filter((task) => task.id !== updatedTask.id);
      state.tasks = [...tasks, updatedTask];
    },
    updateTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { setTasks, updateTaskStatus, updateTasks } = tasksSlice.actions;

const tasksReducer = tasksSlice.reducer;
export default tasksReducer;
