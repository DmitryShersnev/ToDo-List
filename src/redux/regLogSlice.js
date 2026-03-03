import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {};

const apiUrl = import.meta.env.VITE_API_URL;

export const login = createAsyncThunk(
  "tasks/login",
  async (loginData, thunkAPI) => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
      } else {
        return thunkAPI.rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const registration = createAsyncThunk(
  "tasks/registration",
  async (regData, thunkAPI) => {
    try {
      const response = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(regData),
      });
      const data = await response.json();
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      } else {
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const regLogSlice = createSlice({
  name: "regLog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {})
      .addCase(login.rejected, (state, action) => {
        alert(action.payload);
      });
    builder
      .addCase(registration.fulfilled, (state, action) => {
        alert("Вы успешно зарегистрировались. Теперь нужно залогиниться");
      })
      .addCase(registration.rejected, (state, action) => {
        alert(action.payload);
      });
  },
});

export default regLogSlice.reducer;
