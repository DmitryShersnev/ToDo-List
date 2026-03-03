import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  tasks: [],
  loading: false,
};

const apiUrl = import.meta.env.VITE_API_URL;

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (state, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiUrl}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiUrl}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: task }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiUrl}/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const changeCheckbox = createAsyncThunk(
  "tasks/changeCheckbox",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiUrl}/todos/${id}/isCompleted`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const [data] = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const deleteDoneTasks = createAsyncThunk(
  "tasks/deleteDoneTasks",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const state = thunkAPI.getState();
      const completedTasks = state.tasks.tasks.filter(
        (item) => item.isCompleted,
      );
      await Promise.all(
        completedTasks.map((item) =>
          fetch(`${apiUrl}/todos/${item.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ),
      );
      const data = completedTasks.map((item) => item.id);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ([id, newTitle], thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiUrl}/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })

      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.loading = false;
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (item) => item.id !== action.payload.id,
        );
        state.loading = false;
      })
      .addCase(changeCheckbox.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((item) =>
          item.id === action.payload.id
            ? { ...item, isCompleted: !item.isCompleted }
            : item,
        );
        state.loading = false;
      })
      .addCase(deleteDoneTasks.fulfilled, (state, action) => {
        const deletedIds = action.payload;
        state.tasks = state.tasks.filter(
          (item) => !deletedIds.includes(item.id),
        );
        state.loading = false;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        console.log(action.payload);

        state.tasks = state.tasks.map((item) =>
          item.id === action.payload.id
            ? { ...item, title: action.payload.title }
            : item,
        );
        state.loading = false;
      });
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.loading = true;
      },
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state) => {
        state.loading = false;
        // state.error = action.payload || action.error.message;
      },
    );
  },
});

export default tasksSlice.reducer;
